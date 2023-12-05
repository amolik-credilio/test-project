<template>
  <v-card elevation="0" class="px-4 pb-2 pt-4 mr-12" max-width="520">
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
  </v-card>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  body: string
}>()
</script>

<style lang="scss"></style>
