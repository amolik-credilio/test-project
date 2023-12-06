<template>
  <div class="d-flex flex-column justify-space-between">
    <!-- Search -->
    <!-- <SearchBar @search="handleSearch" class="mb-6" /> -->

    <!-- Category Filter -->
    <div v-if="categories.length" class="d-flex flex-wrap px-4">
      <CategoryFilter
        v-for="(category, i) in categories"
        :key="i"
        :category="category"
        :selected="selectedCategory.id === category.id"
        @selectCategory="handleCategoryClick(category)"
      />

      <v-btn
        color="red"
        elevation="0"
        rounded
        outlined
        class="mx-2 my-2 white--text"
        @click="clearCategory()"
      >
        <span class="text-caption"> Clear selection </span>
      </v-btn>
    </div>

    <!-- Loader -->
    <div v-if="fetchingProducts" class="d-flex flex-column mt-6">
      <div class="d-flex flex-wrap px-4">
        <v-skeleton-loader
          v-for="i in 10"
          :key="i"
          type="chip"
          class="mr-4"
        ></v-skeleton-loader>
      </div>
      <div class="d-flex flex-wrap justify-start mt-2">
        <SkeletonLoader v-for="i in 6" :key="i" />
      </div>
    </div>

    <!-- Product card UI -->
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

    <!-- Pagination -->
    <div
      v-if="!selectedCategory.value"
      class="d-flex align-center justify-center mt-12 text-center"
    >
      <PaginationControl
        :current-page="currentPage"
        :pages="10"
        @updatePage="handlePagination"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'

import assignIds from '~/utils/helper'
import { Category } from '~/types/category.type'
import useFetchData from '~/composables/useFetchData'

const products = ref([])
const categories = ref<Category[]>([])
const currentPage = ref<number>(1)
const fetchingProducts = ref<boolean>(true)
const selectedCategory = reactive<Category | { id: null; value: null }>({
  id: null,
  value: null,
})

onMounted(() => {
  getProducts()
  getCategories()
})

// Products
const getProducts = async () => {
  const { response, fetching, fetchData } = useFetchData(
    `https://dummyjson.com/products?limit=10&skip=${
      (currentPage.value - 1) * 10
    }`
  )
  await fetchData()
  products.value = response as any
  fetchingProducts.value = fetching.value
}

// Categories
const getCategories = async () => {
  const { response, fetchData } = useFetchData(
    `https://dummyjson.com/products/categories`
  )
  await fetchData()
  categories.value = assignIds(response.value as any) as any
}

// Filtering by category - API call
const getProductsByCategory = async () => {
  const { response, fetching, fetchData } = useFetchData(
    `https://dummyjson.com/products/category/${selectedCategory.value}?limit=0`
  )
  await fetchData()
  products.value = response as any
  fetchingProducts.value = fetching.value
}

// Category selection
const handleCategoryClick = (cat: Category) => {
  fetchingProducts.value = true
  selectedCategory.id = cat.id
  selectedCategory.value = cat.value
  getProductsByCategory()
}

// Clear category
const clearCategory = () => {
  if (selectedCategory.id) fetchingProducts.value = true
  selectedCategory.id = null
  selectedCategory.value = null
  getProducts()
}

// Pagination
const handlePagination = (val: number) => {
  currentPage.value = val
  getProducts()
}
</script>

<style></style>
