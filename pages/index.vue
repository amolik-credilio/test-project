<template>
  <div class="d-flex flex-column justify-space-between">
    <!-- Filters -->
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
        <v-skeleton-loader
          v-for="i in 12"
          :key="i"
          class="mx-auto mt-6"
          width="270"
          height="290"
          type="card"
        ></v-skeleton-loader>
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

    <!-- PaginationControl -->
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

import assignIds from '~/utils/helper'

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
    this.getProducts()
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

  handlePagination(page: number) {
    this.currentPage = page
    this.getProducts()
  }
}
</script>

<style></style>
