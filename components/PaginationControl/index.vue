<template>
  <div class="d-flex mx-2 align-center justify-center w-100">
    <v-btn class="mr-4" fab small elevation="1" @click="prev">
      <v-icon> mdi-chevron-left </v-icon>
    </v-btn>
    <v-btn
      v-for="page in pages"
      :key="page"
      elevation="0"
      width="20"
      :color="currentPage === page ? 'primary' : ''"
      class="mx-4 pa-5"
      fab
      small
      @click="handlePageClick(page)"
      >{{ page }}</v-btn
    >

    <v-btn class="ml-4" fab small elevation="1" @click="next">
      <v-icon> mdi-chevron-right </v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator'

@Component
export default class PaginationControl extends Vue {
  @Prop({ type: Number, required: true }) pages!: number
  @Prop({ type: Number, default: 1 }) currentPage!: number
  @Prop({ type: Number, required: false }) total!: number

  handlePageClick(val: number) {
    this.$emit('updatePage', val)
  }

  prev() {
    if (this.currentPage === 1) return
    this.handlePageClick(this.currentPage - 1)
  }

  next() {
    if (this.currentPage === this.pages) return
    this.handlePageClick(this.currentPage + 1)
  }
}
</script>

<style></style>
