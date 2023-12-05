<template>
  <div class="d-flex mx-2 align-center justify-center">
    <v-btn
      v-for="page in pages"
      :key="page"
      elevation="0"
      width="20"
      :color="currentPage === page ? 'primary' : ''"
      class="mx-4"
      @click="handlePageClick(page)"
      >{{ page }}</v-btn
    >
  </div>
</template>

<script setup lang="ts">
defineProps<{
  pages: number
  total: number
  currentPage: number
}>()

const $emits = defineEmits(['updatePage'])

function handlePageClick(val: number) {
  $emits('updatePage', val)
}
</script>

<style></style>
