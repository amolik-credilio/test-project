<template>
  <v-btn
    elevation="0"
    rounded
    class="ma-2 text-caption"
    :color="selected ? 'primary' : ''"
    @click="handleClick"
  >
    {{ category.value }}
  </v-btn>
</template>

<script setup lang="ts">
import { Category } from '~/types/category.type'

const $props = defineProps<{
  category: Category
  selected: boolean
}>()

const $emits = defineEmits(['selectCategory'])

const handleClick = () => {
  $emits('selectCategory', $props.category)
}
</script>
