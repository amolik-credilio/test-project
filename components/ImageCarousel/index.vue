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

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator'

@Component
export default class ImageCarousel extends Vue {
  @Prop({ type: Array, required: true }) imageUrls!: string[]

  currentIndex: number = 1

  get currentImage(): string {
    return this.imageUrls[this.currentIndex]
  }

  prevImage() {
    this.currentIndex =
      (this.currentIndex - 1 + this.imageUrls.length) % this.imageUrls.length
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.imageUrls.length
  }
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
