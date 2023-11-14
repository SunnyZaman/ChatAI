<script setup lang="ts">
import { PaperAirplaneIcon } from "@heroicons/vue/24/solid";

</script>

<template>
    <div class="bg-[#343541] flex-1 px-8">
        <div class="flex flex-col h-screen">
            <div class="flex flex-1 items-center justify-center px-2">
                <h1 class="text-5xl text-white text-opacity-40 font-bold mb-20">ChatAI</h1>

            </div>
            <div class="my-4">
                <div class="bg-[#40414f] text-gray-400 rounded-lg text-lg">
                    <form class="flex space-x-5 p-5">
                        <input
                            class="bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
                            type="text" placeholder="Send a message" />
                        <button type="submit"
                            class="bg-[#11A97F] hover:opacity-50 text-white font-bold px-4 py-4 rounded disabled:cursor-not-allowed disabled:text-gray-300">
                            <PaperAirplaneIcon class="h-4 w-4 -rotate-45" />
                        </button>
                    </form>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped></style>
