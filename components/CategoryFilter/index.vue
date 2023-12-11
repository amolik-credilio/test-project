<template>
  <v-btn
    elevation="0"
    rounded
    class="mx-2 my-2"
    :color="selected ? 'primary' : ''"
    @click="handleClick"
  >
    <span class="text-caption">
      {{ category.value }}
    </span>
  </v-btn>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator'
import { Category } from '~/types/category.type'
@Component
export default class CategoryFilter extends Vue {
  @Prop({ type: Object, required: true }) category!: Category
  @Prop({ type: Boolean, required: true }) selected!: boolean
  handleClick(): void {
    this.$emit('selectCategory', this.category)
  }
}
</script>

<style></style>
