<template>
  <v-card
    flat
    elevation="0"
    class="px-4 py-4 mr-12 d-flex flex-column justify-space-between"
    height="240"
    max-width="520"
  >
    <div class="d-flex align-center">
      <v-img
        src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
        max-width="30"
        max-height="30"
        class="rounded-circle"
      ></v-img>
    </div>
    <div class="d-flex flex-column pt-4">
      <h3>{{ title }}</h3>
      <p class="grey--text text--darken-2">{{ body }}</p>
    </div>
    <div class="d-flex justify-space-between">
      <span>{{ authorId }}</span>
      <div class="d-flex align-center">
        <v-icon color="grey darken-1" small> mdi-clock-outline </v-icon>
        <span class="grey--text text--darken-1 mx-2">5 min read</span>
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  body: string
  authorId: number
}>()
</script>

<style lang="scss" scoped>
.v-card {
  border-bottom: 1px solid #d8d8d8 !important;
  border-radius: 0px;
}
</style>
