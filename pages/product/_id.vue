<template>
  <div class="d-flex flex-column">
    <v-btn
      depressed
      elevation="0"
      color="white"
      width="130"
      class="mb-2 blue--text text--darken-2"
      to="/"
    >
      <v-icon left large> mdi-chevron-left </v-icon>
      Back home
    </v-btn>

    <p v-if="!productData" class="text-h5">Fetching your product...</p>

    <v-divider></v-divider>

    <div v-if="productData" class="d-flex justify-between mt-6">
      <div class="left-col">
        <ImageCarousel :image-urls="productData.images" />
      </div>

      <div class="right-col d-flex flex-column pa-12">
        <h1>{{ productData.title }}</h1>
        <v-divider class="mt-2"></v-divider>

        <div class="brand mt-4">
          <v-icon>mdi-layers</v-icon>
          <p>{{ productData.brand }}</p>
        </div>

        <div class="brand">
          <v-icon>mdi-note-outline</v-icon>
          <p class="text-body-1">{{ productData.description }}</p>
        </div>

        <div class="d-flex align-center mt-2">
          <v-rating
            v-model="productData.rating"
            color="amber"
            readonly
          ></v-rating>
          <p class="font-weight-bold mt-2 grey--text">
            ({{ productData.rating }})
          </p>
        </div>

        <div class="d-flex mt-2">
          <p>Category:</p>
          <nuxt-link to="/" class="ml-2">{{
            toTitleCase(productData.category)
          }}</nuxt-link>
        </div>

        <v-divider class="mt-4"></v-divider>

        <div class="d-flex flex-column font-weight-bold mt-4 text-h5">
          <p class="red--text text--darken-2">&dollar;{{ discountedPrice }}</p>

          <div class="d-flex align-center text-body-1 mt-1">
            <p class="mr-2">MRP:</p>
            <p class="strikethrough">&dollar;{{ productData.price }}</p>
          </div>
        </div>

        <div class="d-flex align-center mt-4">
          <img
            v-for="(imgUrl, i) in productData.images"
            :key="i"
            :src="imgUrl"
            class="mr-8"
            width="100"
          />
        </div>

        <p
          class="text-body-1 green--text text--darken-2 font-weight-medium mt-4"
        >
          {{ productData.stock }} items in stock.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import useFetchData from '~/composables/useFetchData'
import useRoute from '~/composables/useRoute'
import { Product } from '~/types/product.type'

import { toTitleCase } from '~/utils/helper'

const route = useRoute()

const productData = ref<Product>()
const fetchingProduct = ref<boolean>(false)

onMounted(() => getProduct())

const getProduct = async () => {
  const { response, fetching, fetchData } = useFetchData(
    `https://dummyjson.com/product/${route.params.id}`
  )
  await fetchData()
  productData.value = response.value as Product // Ask for better typescript support
  fetchingProduct.value = fetching.value
}

const discountedPrice = computed(() => {
  return 123
})
</script>

<style lang="scss" scoped>
.back {
  display: flex;
  margin-left: -8px;
  column-gap: 6px;
  p {
    margin-top: 14px;
  }
}

.brand {
  display: flex;
  align-items: center;
  column-gap: 12px;
}

.left-col {
  width: 50%;
}
.right-col {
  width: 50%;
}

.strikethrough {
  text-decoration: line-through;
}
</style>
