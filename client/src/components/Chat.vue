<script setup lang="ts">
import { PaperAirplaneIcon } from "@heroicons/vue/24/solid";
import { onMounted, reactive, ref, watch } from "vue";
import {getDocs, collection, addDoc, serverTimestamp } from "firebase/firestore"
import { getDatabase } from "../firebase";
import { getAuth } from "firebase/auth";
import { useRoute } from 'vue-router'
type Types = 'new' | 'edit'
interface IModeProps {
  type: Types;
}

const auth = getAuth();
const route = useRoute()
const prompt = ref("");
const mode:IModeProps = reactive({ type: 'new' }) 
onMounted(async()=>{
    // const add = await addDoc(collection(getDatabase(), "chats"),{
    //     userId: auth.currentUser?.email,
    //     createdAt: serverTimestamp()
    // })
    // console.log("doc: ", add);
    checkChat(route.params.chatId);
    const doc = await getDocs(collection(getDatabase(), "chats"))
    console.log("doc: ", doc);
    
})
console.log("route chat id: ", route.params.chatId)

watch(() =>route.params.chatId,
       newId => {
        checkChat(newId);
});

const checkChat = (id: string | string[]) => {
    id ? mode.type ="edit" : mode.type = "new"
    
}

const fetchChat = async () => {
    try{
        
    }catch(error){
    }
    
}

// const fetchResponse = async()=>{
//     // try{
//     //     const res = await fetch("http://localhost:8000",{
//     //         method: "POST",
//     //         headers:{
//     //             "Content-Type": "application/json"
//     //         },
//     //         body: JSON.stringify({
//     //             prompt: prompt.value
//     //         })
//     //     })
//     //     console.log(res);
        
//     // }catch(error){

//     // }

// }
</script>

<template>
    <div class="bg-[#343541] flex-1 px-8">
        <div class="flex flex-col h-screen">
            <!-- <div class="py-5">

         
            <div class="flex space-x-5 px-10 max-w-2xl mx-auto"> -->
            <div v-if="mode.type === 'new'" class="flex flex-1 px-2 w-full  items-center  justify-center">
                <Form class=" flex flex-col space-y-6 w-full max-w-2xl ">
            <label class="block text-sm font-medium text-white ">Please enter a chat name:</label>
            <input 
              class="appearance-none rounded-md relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm
              "/>
            <!-- <ErrorMessage class="mt-2 text-pink-600 text-sm" /> -->
          <button type="submit"
            class="w-[150px] group py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 self-end">

            Create
          </button>
        </Form>
            </div>
            <!-- <div class="flex flex-1 items-center justify-center px-2">
                <h1 class="text-5xl text-white text-opacity-40 font-bold mb-20">ChatAI</h1>

            </div>
            <div class="my-4">
                <div class="bg-[#40414f] text-gray-400 rounded-lg text-lg">
                    <form class="flex space-x-5 p-5" @submit.prevent="fetchResponse">
                        <input v-model="prompt"
                            class="bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
                            type="text" placeholder="Send a message" />
                        <button type="submit"
                            class="bg-[#11A97F] hover:opacity-50 text-white font-bold px-4 py-4 rounded disabled:cursor-not-allowed disabled:text-gray-300">
                            <PaperAirplaneIcon class="h-4 w-4 -rotate-45" />
                        </button>
                    </form>
                </div>
            </div> -->
        </div>
    <!-- </div>
        </div> -->
    </div>
</template>

<style scoped></style>
