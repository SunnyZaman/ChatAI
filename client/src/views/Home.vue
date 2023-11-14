<script setup lang="ts">
import { getAuth } from "firebase/auth";
import {  onMounted } from 'vue'
import Chat from "../components/Chat.vue";
import Sidebar from "../components/Sidebar.vue";

const auth = getAuth();

onMounted(() => {
  console.log(auth);
  
})
</script>

<template>
  <div class="flex">
    <!-- Sidebar -->
    <div class="bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[20rem]">
      <Sidebar/>
    </div>
    <!-- Chat -->
    <Chat />
  </div>
</template>

<style scoped>
</style>
