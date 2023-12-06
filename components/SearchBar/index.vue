<template>
  <v-text-field
    v-model="searchQuery"
    hide-details
    prepend-icon="mdi-magnify"
    single-line
    label="Search"
    type="input"
    hint="Search products by name"
    class="pr-16"
  ></v-text-field>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const searchQuery = ref<string>()
</script>

<style></style>
