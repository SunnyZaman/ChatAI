<script setup lang="ts">
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import router from "../router";
import { toast, type ToastOptions } from 'vue3-toastify';

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then(() => {
      router.push("/");
    })
    .catch((error) => {
      console.error(error);
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      } as ToastOptions);
    })
}
</script>

<template>
  <div class="mt-6">
    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-gray-300"></div>
      </div>
      <div class="relative flex justify-center text-sm">
        <span class="px-2 bg-gray-100 text-gray-500">
          Or continue with
        </span>
      </div>
    </div>

    <div class="mt-6 flex flex-wrap justify-center items-center">
      <div>
        <a href="#" @click="signInWithGoogle"
          class="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
          <img class="h-6 w-6" src="https://www.svgrepo.com/show/506498/google.svg" alt="">
        </a>
      </div>
    </div>
  </div>
</template>
