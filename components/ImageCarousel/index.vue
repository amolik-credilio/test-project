<template>
  <v-carousel hide-delimiters show-arrows-on-hover cycle>
    <v-carousel-item
      v-for="(url, i) in imageUrls"
      :key="i"
      :src="url"
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
