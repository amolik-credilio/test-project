<template>
  <div v-if="productData" class="product-page-container">
    <nuxt-link to="/" class="unset-property">
      <div class="back">
        <v-icon class="blue--text text--darken-2" large
          >mdi-chevron-left</v-icon
        >
        <p class="blue--text text--darken-2 text-h6">Back home</p>
      </div>
    </nuxt-link>

    <v-divider></v-divider>
    <ImageCarousel :image-urls="productData.images" />

    <h1 class="mt-2">{{ productData.title }}</h1>
    <div class="brand">
      <v-icon>mdi-layers</v-icon>
      <p>{{ productData.brand }}</p>
    </div>

    <div class="brand">
      <v-icon>mdi-note-outline</v-icon>
      <p class="text-body-1">{{ productData.description }}</p>
    </div>

    <div class="d-flex align-center font-weight-bold text-h4 mt-4">
      <p class="strikethrough">&dollar;{{ productData.price }}</p>
      <p class="red--text text--darken-2 ml-2">&dollar;{{ discountedPrice }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import useFetchData from '~/composables/useFetchData'
import useRoute from '~/composables/useRoute'
import { Product } from '~/types/product.type'

const route = useRoute()

const productData = ref<Product>()

onMounted(() => getProduct())

const getProduct = async () => {
  const { response, fetchData } = useFetchData(
    `https://dummyjson.com/product/${route.params.id}`
  )
  await fetchData()
  productData.value = response as unknown as Product
}

const discountedPrice = computed(() => {
  return 123
})
</script>

<style lang="scss" scoped>
.product-page-container {
  display: flex;
  flex-direction: column;
}

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

  p {
    margin-top: 16px;
  }
}

.carousel-control {
  display: flex;

  i {
    cursor: pointer;
  }

  i:hover {
    color: rgb(55, 55, 109);
  }
}
</style>
