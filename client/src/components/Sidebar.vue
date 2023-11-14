<script setup lang="ts">
import { PlusIcon } from "@heroicons/vue/24/solid";
import { ArrowLeftOnRectangleIcon } from "@heroicons/vue/24/solid";
import { getAuth, signOut } from "firebase/auth";
import router from "../router";

// import { ref } from 'vue';

const auth = getAuth();
console.log("Aut", auth);
// const currentUser = ref(auth.currentUser);
const handleSignOut =()=>{
    signOut(auth).then(()=>{
        router.push("/sign-in");
    })
}
</script>

<template>
    <div class="flex flex-col h-screen p-2">
        <div class="flex-1">
        <div>
            <!-- New Chat -->
            <div class="border-gray-700 border chat-row">
                    <PlusIcon class="h-4 w-4" />
                    <p>New Chat</p>
                </div>
            </div>
            <div class="border-white border chat-row h-[calc(100vh-140px)] overflow-y-auto mt-4">

            </div>
        </div>
        <!-- <button class="text-white relative ">{{ currentUser?.displayName ? currentUser?.displayName : currentUser?.email }}Joooj</button>
            <div class="absolute w-48 mt-2 right-0 bg-white rounded-md shadow-xl z-20">
                <p>Hello</p>
            </div> -->
        <div class="border-gray-700 border chat-row mb-2"
        @click="handleSignOut">
            <ArrowLeftOnRectangleIcon class="h-4 w-4" />
            <p>Sign out</p>
        </div>
    </div>
</template>

<style scoped></style>
