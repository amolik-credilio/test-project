<template>
  <div class="d-flex align-center">
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

    <v-btn elevation="0" :disabled="!searchQuery" @click="handleInput">
      Search
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const searchQuery = ref<string>()

const $emits = defineEmits(['search'])

const handleInput = () => {
  if (searchQuery.value) $emits('search', searchQuery.value)
}
</script>
