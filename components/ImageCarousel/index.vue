<template>
  <v-carousel hide-delimiters class="mt-6">
    <v-carousel-item
      v-for="(item, i) in imageUrls"
      :key="i"
      :src="item"
      reverse-transition="fade-transition"
      transition="fade-transition"
    ></v-carousel-item>
  </v-carousel>
</template>

<script setup lang="ts">
defineProps<{
  imageUrls: string[]
}>()
</script>

<style lang="scss"></style>
