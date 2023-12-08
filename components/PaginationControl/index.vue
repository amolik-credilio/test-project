<template>
  <div class="d-flex mx-2 align-center justify-center w-100">
    <v-btn
      class="mr-4"
      fab
      small
      elevation="1"
      @click="prev"
      :disabled="currentPage === 1"
    >
      <v-icon> mdi-chevron-left </v-icon>
    </v-btn>
    <v-btn
      v-for="page in pages"
      :key="page"
      elevation="0"
      width="20"
      :color="currentPage === page ? 'primary' : ''"
      class="mx-4 pa-5"
      fab
      small
      @click="handlePageClick(page)"
      >{{ page }}</v-btn
    >

    <v-btn
      class="ml-4"
      fab
      small
      elevation="1"
      @click="next"
      :disabled="currentPage === pages"
    >
      <v-icon> mdi-chevron-right </v-icon>
    </v-btn>
  </div>
</template>

<script setup lang="ts">
const $props = defineProps<{
  pages: number
  total?: number
  currentPage: number
}>()

const $emits = defineEmits(['updatePage'])

function handlePageClick(val: number) {
  $emits('updatePage', val)
}

function prev() {
  if ($props.currentPage === 1) return
  handlePageClick($props.currentPage - 1)
}

function next() {
  if ($props.currentPage === $props.pages) return
  handlePageClick($props.currentPage + 1)
}
</script>
