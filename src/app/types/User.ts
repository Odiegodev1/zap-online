export type User = {
    id: number;
    avatar: string;
    name: string;
    email: string;
    last_accsess: string;
}

export type APIUpdateUser = {
    user : User;
}