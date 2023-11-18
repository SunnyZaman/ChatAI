<script setup lang="ts">
</script>
<template>
    <div class="flex items-center justify-center min-h-screen bg-white">
        <div class="flex flex-col items-center p-4">
            <div class="text-indigo-500 font-bold text-7xl">
                404
            </div>

            <div class="font-bold text-3xl xl:text-7xl lg:text-6xl md:text-5xl mt-5">
                Page Not Found
            </div>
            <router-link to="/"
                class="mt-8 flex items-center space-x-2 bg-gray-700 hover:bg-gray-400 text-gray-100 px-4 py-2 rounded transition duration-150"
                title="Return Home">
                Return Home
            </router-link>
        </div>
    </div>
</template>

<style scoped></style>
