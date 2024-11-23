<template>
  <div class="">
    <slot /><Dialog :is-showed="isShowed" @close="handleShow"> </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Dialog from "./Dialog.vue";

interface ConfirmationProps {
  isStarted: boolean;
}

const props = defineProps<ConfirmationProps>();

const isShowed = ref(false);

const handleShow = () => {
  isShowed.value = !isShowed.value;
};
</script>

<style scoped></style>
