<template>
  <div class="d-flex flex-column justify-space-between">
    <!-- Category Filter -->
    <div v-if="categories.length" class="d-flex flex-wrap px-4">
      <CategoryFilter
        v-for="category in categories"
        :key="category.id"
        :category="category"
        :selected="selectedCategory.id === category.id"
        @selectCategory="handleCategoryClick(category)"
      />

      <v-btn
        color="red"
        elevation="0"
        rounded
        outlined
        class="ma-2 white--text text-caption"
        @click="clearCategory()"
        >Clear selection
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
        v-for="product in products"
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

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { assignIds } from '~/utils/helper'
import { Product } from '~/types/product.type'
import { Category } from '~/types/category.type'
@Component
export default class ProductPage extends Vue {
  products: Product[] = []
  fetchingProducts: boolean = false
  categories: Category[] = []
  fetchingCategories: boolean = false
  selectedCategory: Category = {
    id: null,
    value: null,
  }

  currentPage: number = 1

  mounted() {
    this.getCategories()
    this.getPaginationParams()
  }

  async getProducts() {
    this.fetchingProducts = true
    const res = await this.$axios.$get(
      `https://dummyjson.com/products?limit=10&skip=${
        (this.currentPage - 1) * 10
      }`
    )
    this.products = res.products as Product[]
    this.fetchingProducts = false
  }

  async getCategories() {
    this.fetchingCategories = true
    const res = await this.$axios.$get(
      'https://dummyjson.com/products/categories'
    )
    this.categories = assignIds(res)
    this.fetchingCategories = false
  }

  async getProductsByCategory() {
    this.fetchingProducts = true
    const res = await this.$axios.$get(
      `https://dummyjson.com/products/category/${this.selectedCategory.value}?limit=0`
    )
    this.products = res.products as Product[]
    this.fetchingProducts = false
  }

  handleCategoryClick(category: Category) {
    this.selectedCategory = category
    this.getProductsByCategory()
  }

  clearCategory() {
    this.selectedCategory = { id: null, value: null }
    this.getProducts()
  }

  // Handling pagination
  handlePagination(page: number) {
    this.currentPage = page
    this.$router.push({
      path: '/',
      query: { page: page.toString() },
    })
    this.getProducts()
  }

  // On load - checking params
  getPaginationParams() {
    const page = this.$route.query.page
    this.currentPage = page ? Number(this.$route.query.page) : 1
    this.handlePagination(this.currentPage)
    this.getProducts()
  }
}
</script>
