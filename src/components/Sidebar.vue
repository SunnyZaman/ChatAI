<script setup lang="ts">
import { PlusIcon } from "@heroicons/vue/24/solid";
import { ArrowLeftOnRectangleIcon, ChatBubbleLeftIcon } from "@heroicons/vue/24/solid";
import { getAuth, signOut } from "firebase/auth";
import router from "../router";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useChat } from "../firebase";
interface IData {
    snapshot: any;
}
const { chats } = useChat()

const props = defineProps<IData>();
const route = useRoute();
const data = ref(props.snapshot);
const chat: any = ref([]);
const auth = getAuth();

watch(() => props.snapshot,
    snap => {
        setChats(snap)
    });

const setChats = (snap: any) => {
    let arr: any = [];
    data.value = snap;
    data.value.forEach((doc: any) => { //may need to change this to just props.snapshot
        arr.push({
            id: doc.id,
            title: doc.data().title
        })
    });
    chat.value = arr;
}
const handleSignOut = () => {
    signOut(auth).then(() => {
        router.push("/sign-in");
    })
}
</script>

<template>
    <div class="flex flex-col h-screen p-2">
        <div class="flex-1">
            <router-link to="/" class="border-gray-700 border chat-row">
                <PlusIcon class="h-4 w-4" />
                <p class="hidden md:block">New Chat</p>
            </router-link>
            <div class="h-[calc(100vh-140px)] overflow-y-auto mt-4">
                <router-link v-for="{ id, title } in chats" :key="id" :to="`/${id}`" class="chat-row justify-center"
                    :class="{ 'bg-gray-700/50': route.params.chatId == id }">
                    <ChatBubbleLeftIcon class="h-5 w-5" />
                    <p class="flex-1 truncate">{{ title }}</p>
                </router-link>
            </div>
        </div>
        <div class="border-gray-700 border chat-row mb-2" @click="handleSignOut">
            <ArrowLeftOnRectangleIcon class="h-4 w-4" />
            <p class="hidden md:block">Sign out</p>
        </div>
    </div>
</template>