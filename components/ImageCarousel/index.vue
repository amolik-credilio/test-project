<template>
  <div class="carousel-container mt-5">
    <v-img
      :src="currentImage"
      alt="carousel"
      width="300"
      height="300"
      contain
    />
    <div class="carousel-control mt-4">
      <button @click="prevImage">
        <v-icon>mdi-chevron-left</v-icon>
      </button>
      <button @click="nextImage">
        <v-icon>mdi-chevron-right</v-icon>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const $props = defineProps<{
  imageUrls: string[]
}>()

const currentIndex = ref<number>(0)

const currentImage = computed(() => {
  return $props.imageUrls[currentIndex.value]
})

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % $props.imageUrls.length
}

const prevImage = () => {
  currentIndex.value =
    (currentIndex.value - 1 + $props.imageUrls.length) % $props.imageUrls.length
}
</script>

<style lang="scss">
.carousel-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: fit-content;
}
.carousel-control {
  display: flex;
  column-gap: 24px;

  btn {
    cursor: pointer;
    border-radius: 100%;
  }
  btn:hover {
    background-color: rgb(216, 216, 216);
  }
}
</style>
