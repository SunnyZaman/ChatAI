<script setup lang="ts">
import { PaperAirplaneIcon } from "@heroicons/vue/24/solid";
import { onMounted, onUnmounted, reactive, ref, watch } from "vue";
import { getDocs, collection, addDoc, serverTimestamp, orderBy, query } from "firebase/firestore"
import { getDatabase } from "../firebase";
import { getAuth } from "firebase/auth";
import { useRoute } from 'vue-router';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import router from "../router";
import { onSnapshot } from "firebase/firestore";
type Types = 'new' | 'edit'
interface IModeProps {
    type: Types;
}
const auth = getAuth();
const route = useRoute();
const bottom: any = ref(null);
const mode: IModeProps = reactive({ type: 'new' });
const msgs: any = ref([]);
const chatSchema = yup.object({
    title: yup.string().required("This is a required field")
});
const messageSchema = yup.object({
    message: yup.string().required()
});
onMounted(() => {
    checkChat(route.params.chatId);
    getChat(route.params.chatId);
})
watch(() => route.params.chatId,
    newId => {
        checkChat(newId);
        getChat(newId)
    });

    watch(msgs,() => {
        bottom.value?.scrollIntoView({behavior:'smooth'})
    },{
        deep:true
    });

const checkChat = (id: string | string[]) => {
    id ? mode.type = "edit" : mode.type = "new"

}
const getChat = async (chatId: any) => {
    const firestore = getDatabase();
    if (chatId) {
        const q = await query(collection(firestore, "chats", chatId, "messages"), orderBy("createdAt", "asc"));
        const unsubscribe = onSnapshot(q, (querySnapshot: any) => {
            msgs.value = [];
            querySnapshot.forEach((doc: any) => {
                msgs.value.push({ id: doc.id, ...doc.data() });
            });
        });
        onUnmounted(unsubscribe)
    }
}
const handleNewChat = async (data: any) => {
    const doc = await addDoc(collection(getDatabase(), "chats"), {
        title: data.title,
        userId: auth.currentUser?.email,
        createdAt: serverTimestamp()
    })
    router.push(`/${doc.id}`);
}

const saveMessage = async (values: any, { resetForm }: any) => {
    const chatId: any = route?.params?.chatId;
    const user = auth.currentUser;
    const name = user?.displayName || user?.email;
    const msg = {
        text: (values.message).trim(),
        createdAt: serverTimestamp(),
        user: {
            _id: user?.email,
            name: name,
            avatar: user?.photoURL || `https://ui-avatars.com/api/?name=${name}&background=random`
        }

    }
    await addDoc(collection(getDatabase(), "chats", chatId, "messages"), msg)
    resetForm();
}
</script>

<template>
    <div class="bg-[#343541] flex-1">
        <div class="flex flex-col h-screen">
            <div v-if="mode.type === 'new'" class="flex flex-1 px-2 w-full  items-center  justify-center">
                <Form class=" flex flex-col space-y-6 w-full max-w-2xl" @submit="handleNewChat"
                    :validation-schema="chatSchema">
                    <label class="block text-sm font-medium text-white ">Please enter a chat name:</label>
                    <Field id="title" name="title"
                        class="appearance-none rounded-md relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
                    <ErrorMessage name="title" class="mt-2 text-pink-600 text-sm" />
                    <button type="submit"
                        class="w-[150px] group py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 self-end">
                        Create
                    </button>
                </Form>
            </div>
            <div v-if="mode.type === 'edit' && !msgs?.length" class="flex flex-1 items-center justify-center px-2">
                <h1 class="text-5xl text-white text-opacity-40 font-bold mb-20">ChatAI</h1>

            </div>
            <div v-if="mode.type === 'edit' && msgs?.length" class="flex-1 overflow-auto">
                <div v-for="(value, index) in  msgs" :key="value.id" :to="`/${value.id}`" class="py-5 text-white"
                    :class="{ 'bg-[#434654]': index % 2 !== 0 }">
                    <div class=" flex space-x-5 px-10 mx-auto max-w-2xl">
                        <div v-tippy="{ content: `<p>${value.user.name}</p><p>${value.createdAt?.toDate().toDateString()} ${value.createdAt?.toDate().toLocaleTimeString()}</p>` }">
                            <img :src="value.user.avatar" alt="" class="h-10 w-10 cursor-pointer" />
                        </div>
                        <p class="pt-1 flex-1 text-sm">{{ value.text }}</p>
                    </div>
                </div>
                <div ref="bottom" class="mt-4"></div>

            </div>
            <div class="my-4 px-8">
                <div class="bg-[#40414f] text-gray-400 rounded-lg text-lg">
                    <Form class="flex space-x-5 p-5" @submit="saveMessage" :validation-schema="messageSchema">
                        <Field id="message" name="message" autocomplete="off"
                            class="bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
                            type="text" placeholder="Send a message" />
                        <button type="submit"
                            class="bg-[#11A97F] hover:opacity-50 text-white font-bold px-4 py-4 rounded disabled:cursor-not-allowed disabled:text-gray-300">
                            <PaperAirplaneIcon class="h-4 w-4 -rotate-45" />
                        </button>
                    </Form>
                </div>
            </div>
        </div>
    </div>
</template>