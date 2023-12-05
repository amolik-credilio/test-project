<template>
  <div class="d-flex flex-column">
    <PaginationControl
      :pages="10"
      :total="100"
      :current-page="page"
      @updatePage="updatePage"
    />
    <div v-if="fetching" class="d-flex flex-wrap mt-8">
      <v-skeleton-loader
        v-for="i in 10"
        :key="i"
        class="px-4 pb-2 pt-4 mr-12"
        width="500"
        type="article"
      ></v-skeleton-loader>
    </div>
    <div v-else class="d-flex flex-wrap mt-8">
      <BlogCard
        v-for="blog in response"
        :key="blog.id"
        :title="blog.title"
        :body="blog.body"
        class="my-4"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from '@nuxtjs/composition-api'
import { fetchData } from '~/composables/fetchData'

import { Post } from '~/types/post.type'

const posts = ref<Post[]>([])
const page = ref<number>(1)

const url = computed(() => {
  return `https://jsonplaceholder.typicode.com/posts?_page=${page.value}&_limit=10`
})

const { response, fetching } = fetchData(url)

posts.value = response.value as Post[]

const updatePage = (val: number) => {
  page.value = val
}
</script>

<style lang="scss"></style>
