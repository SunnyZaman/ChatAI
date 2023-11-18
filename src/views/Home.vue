<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import Chat from "../components/Chat.vue";
import Sidebar from "../components/Sidebar.vue";
import { getDocs, collection } from "firebase/firestore"
import { getDatabase } from "../firebase";
import { query, orderBy } from "firebase/firestore";

interface IData {
  snapshot: any;
}
const data: IData = reactive({ snapshot: [] })
const database = getDatabase();
onMounted(async () => {
  data.snapshot = await getDocs(query(collection(database, "chats"), orderBy("createdAt", "desc")));
})

</script>

<template>
  <div class="flex">
    <div class="bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[20rem]">
      <Sidebar :snapshot="data.snapshot" />
    </div>
    <Chat />
  </div>
</template>
