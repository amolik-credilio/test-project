<template>
  <div class="d-flex mx-2 align-center justify-center">
    <v-btn class="mr-4" fab dark small @click="prev">
      <v-icon dark> mdi-chevron-left </v-icon>
    </v-btn>
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

    <v-btn class="ml-4" fab dark small @click="next">
      <v-icon dark> mdi-chevron-right </v-icon>
    </v-btn>
  </div>
</template>

<script setup lang="ts">
const $props = defineProps<{
  pages: number
  total: number
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

<style></style>
