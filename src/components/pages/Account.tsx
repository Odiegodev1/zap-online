"use client"

import { useState } from "react"
import { updateUser } from "@/lib/requests"
import { updateUserSchema, UpdateUserData} from "@/lib/Schema/userSchema"
import { useAuthStore } from "@/stores/authStore"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import {
    Card,
    CardContent,
   
} from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form"
import { Label } from "../ui/label"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { AvatarImage } from "@radix-ui/react-avatar"



 
export const AccountPage = () => {

    const {user, setUser} = useAuthStore()

    const [loading, setLoading] = useState(false)
    const [avatar, setAvatar] = useState<File | null>(null)
    const [avatarUrl, setAvatarUrl] = useState('')

    const form = useForm<UpdateUserData>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: {
            name: user?.name,
            email: user?.email,
            password: '',
            cofirm_password: ''
        }

    })

        const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0]
            if (file) {
                setAvatar(file)
                setAvatarUrl(URL.createObjectURL(file))
               
                }
                
            }
        
            const onSubmit = async (data: UpdateUserData) => {
                const formData= new FormData()

                formData.append('name', data.name)
                formData.append('email', data.email)
                formData.append('password', data.password)
                formData.append('avatar', avatar || '')

                setLoading(true)
                const response = await updateUser(formData)
                setLoading(false)

                if(response.error){
                    toast.error(response.error.message, { position: "top-center" })
                    return;
                }
                   const user = response.data.user
                   setUser(user)
                   toast.success('Atualizado com sucesso!', { position: "top-center" })

                form.setValue('name', user.name)
                form.setValue('email', user.email)
                form.setValue('password', "")
                form.setValue("cofirm_password", "")
                setAvatar(null)
                setAvatarUrl('')
                 toast.success('Atualizado com sucesso!', { position: "top-center" })

            }

    return (
         <main className="h-[var(--app-height)] flex items-center justify-center overflow-auto px-6">
            <Card className="w-full sm:w-[450px]">
               

                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="pt-5 space-y-8">
                            <div className="space-y-6">
                                {loading ?
                                    <>
                                        {...Array({ length: 7 }).map((_, key) => (
                                            <Skeleton
                                                key={key}
                                                className="h-10 rounded-md"
                                            />
                                        ))}
                                    </>
                                    :
                                    <>
                                    <div className="space-y-3">
                                        <Label htmlFor="avatar">Seu Avatar</Label>

                                        <div className="flex items-center gap-3">
                                            <Avatar className="size-11">
                                            <AvatarImage
                                            src={avatarUrl || user?.avatar}
                                            alt={user?.name}
                                            />
                                            <AvatarFallback>{user?.name.slice(0, 2)}</AvatarFallback>
                                            </Avatar>


                                            <Input
                                            id="avatar"
                                            type="file"
                                            onChange={handleAvatarChange}

                                            />

                                        </div>

                                    </div>
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Seu Nome</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Ex: Jõao da Silva" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Seu Email</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Ex: joao2000@gmail.com" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Sua Senha</FormLabel>
                                                    <FormControl>
                                                        <Input type="password" placeholder="Ex: 123456" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />


                                          <FormField
                                            control={form.control}
                                            name="cofirm_password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Confirme sua senha</FormLabel>
                                                    <FormControl>
                                                        <Input type="password" placeholder="Ex: 123456" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                    </>

                                    
                                }
                            </div>

                            <Button className="w-full "disabled={loading}>Atualizar os dados</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </main>
    )
}