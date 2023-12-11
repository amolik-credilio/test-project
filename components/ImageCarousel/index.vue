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

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator'
@Component
export default class ImageCarousel extends Vue {
  @Prop({ type: Array, required: true }) imageUrls!: string[]
}
</script>
