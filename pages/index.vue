<template>
  <div>
    <SearchBar />
    <div
      v-if="fetchingProducts"
      class="d-flex flex-wrap justify-start align-center"
    >
      <SkeletonLoader v-for="i in 18" :key="i" />
    </div>
    <div v-else class="d-flex flex-wrap justify-start align-center">
      <ProductCard
        v-for="product in products.products"
        :id="product.id"
        :key="product.id"
        :thumbnail="product.thumbnail"
        :title="product.title"
        :brand="product.brand"
        :rating="product.rating"
        :price="product.price"
        :discount="product.discountPercentage"
        :description="product.description"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useFetchData from '~/composables/useFetchData'

const products = ref([])
const fetchingProducts = ref<boolean>(true)

const getData = async () => {
  const { response, fetching, fetchData } = useFetchData(
    'https://dummyjson.com/products'
  )
  await fetchData()

  products.value = response as any
  fetchingProducts.value = fetching.value
}

getData()
</script>

<style></style>
