

import { Chat } from "@/app/types/Chat"
import { Message } from "@/app/types/Message"
import { create } from "zustand";

 export type ChateState = {

    showNewChat: boolean,
    chats: Chat[] | null,
    chat: Chat | null,
    chatMessages: Message[] | null,
    showChatsList: boolean,
    loading: boolean,

 }

export type ChatActions = {

    setShowNewChat: (show: boolean) => void;
    setChats: (chats: Chat[] | null) => void;
    setChat: (chat: Chat | null) => void;
    setChatMessages: (messages: Message[] | null) => void;
    setShowChatsList: (show: boolean) => void;
    setLoading: (loading: boolean) => void;

}

export type ChatStore = ChateState & ChatActions;

export const useChatStore = create<ChatStore>((set, get) => ({
    showNewChat: false,
    chats: null,
    chat: null,
    chatMessages: null,
    loading: false,
    showChatsList:  false,

    setShowNewChat: (show) => set({ showNewChat: show }),
    setChats: (chats) => set({ chats }),
    setChat: (chat) => chat?.id != get().chat?.id && set({ chat, chatMessages: null }), 
    setChatMessages: (messages) => set({ chatMessages: messages }),
    setShowChatsList: (show) => set({ showChatsList: show }),
    setLoading: (loading) => set({ loading }),
}))