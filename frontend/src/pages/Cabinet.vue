<template>
  <div class="container p-6 mx-auto">
    <h1 class="mb-6 text-3xl font-bold">User Cabinet</h1>

    <div class="p-6 mb-6 bg-white shadow-md rounded-3xl">
      <h2 class="mb-4 text-2xl font-semibold">User Information</h2>
      <p class="text-gray-700">
        Name: <span class="font-medium">{{ user.name }}</span>
      </p>
      <div class="mt-4">
        <button
          @click="editUser"
          class="px-4 py-2 text-white transition duration-200 bg-blue-500 rounded-full hover:bg-blue-600"
        >
          Edit Profile
        </button>
      </div>
    </div>

    <div class="p-6 bg-white shadow-md rounded-3xl">
      <h2 class="mb-4 text-2xl font-semibold">Purchase History</h2>
      <ul>
        <li v-if="user.story.length === 0" class="text-gray-500">
          No purchase history available.
        </li>
        <li
          v-for="item in user.story"
          :key="item.id"
          class="py-4 border-b border-gray-200"
        >
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <h3 class="font-semibold">{{ item.title }}</h3>
              <p class="text-gray-600">{{ item.description }}</p>
              <p class="text-gray-500">Date: {{ formatDate(item.date) }}</p>
            </div>
            <div class="flex items-center">
              <img
                :src="item.img"
                alt="Product Image"
                class="object-cover w-16 h-16 rounded-3xl"
              />
              <p class="ml-4 text-lg font-bold">${{ item.price.toFixed(2) }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@store/useUserStore";
const userStore = useUserStore();
const user = userStore.user;

// Function to format date
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US").format(date);
};

// Function to handle user profile edit
const editUser = () => {
  alert("Edit user profile functionality is not implemented yet.");
};
</script>

<style scoped>
/* You can add any additional styles here if needed */
</style>
