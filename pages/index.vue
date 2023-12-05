<template>
  <div>
    <div v-if="fetching">Loading...</div>
    <div v-else class="d-flex flex-wrap">
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

const page = ref<number>(1)

const url = computed(() => {
  return `https://jsonplaceholder.typicode.com/posts?_page=${page.value}&_limit=10`
})

const { response, fetching } = fetchData(url)
</script>

<style lang="scss"></style>
