<template>
  <div class="cursor-default" @click.stop="">
    <div @click.stop="handleShow">
      <slot />
    </div>
    <Dialog :is-showed="isShowed" @close="handleShow"
      ><div class="space-y-4">
        <p class="w-full text-2xl font-bold text-center">{{ props.title }}</p>

        <div class="flex space-x-2">
          <Button
            @click.stop="handleShow"
            variant="danger"
            v-if="props.cancel"
            >{{ props.cancel }}</Button
          >
          <Button @async-click.stop="handleConfirm">{{ props.confirm }}</Button>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Dialog from "./Dialog.vue";
import Button from "./Button.vue";

interface ConfirmationProps {
  title: string;
  cancel: string;
  confirm: string;
}

const props = defineProps<ConfirmationProps>();

const isShowed = ref(false);

const emit = defineEmits<{
  (event: "confirm"): void;
  (event: "cancel"): void;
}>();

const handleConfirm = async () => {
  await emit("confirm");
  handleShow();
};

const handleShow = () => {
  isShowed.value = !isShowed.value;
};
</script>

<style scoped></style>
