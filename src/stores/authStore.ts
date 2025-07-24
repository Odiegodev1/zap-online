// Remova a linha "use server"

import { User } from "@/app/types/User"
import { create } from "zustand";

export type AuthState = {
    user : User | null;
}

export type AuthActions = {
    setUser: (user: User) => void;
    clearUser: () => void;
}

export type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    setUser: (user: User) => set({ user }),
    clearUser: () => set({ user: null})
}))
