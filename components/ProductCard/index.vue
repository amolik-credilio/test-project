<template>
  <nuxt-link :to="`/product/${id}`" class="unset-property">
    <div
      class="product-card d-flex flex-column justify-space-between pa-4 ma-6 rounded-lg"
    >
      <div>
        <h3 class="text-truncate">{{ title }}</h3>
        <p class="grey--text text--darken-1">{{ brand }}</p>
        <p class="amber--text text-darken-3 font-weight-bold">
          &#9734; {{ rating }}
        </p>
      </div>

      <p class="product-description">{{ description }}</p>

      <div>
        <div class="d-flex align-center font-weight-bold">
          <p class="strikethrough">&dollar;{{ price }}</p>
          <p class="red--text text--darken-2 ml-2">
            &dollar;{{ discountedPrice }}
          </p>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator'
@Component
export default class ProductCard extends Vue {
  @Prop({ type: Number, required: true }) id!: number
  @Prop({ type: String, required: true }) thumbnail!: string
  @Prop({ type: String, required: true }) title!: string
  @Prop({ type: String, required: true }) brand!: string
  @Prop({ type: Number, required: true }) rating!: number
  @Prop({ type: Number, required: true }) price!: number
  @Prop({ type: Number, required: true }) discount!: number
  @Prop({ type: String, required: true }) description!: string

  get discountedPrice(): number {
    return Math.round(this.price - (this.discount / 100) * this.price)
  }
}
</script>

<style lang="scss" scoped>
.product-card {
  width: 290px;
  height: 290px;
  margin: 24px;
  border: 1px solid rgb(217, 217, 217);
  box-shadow: 1px 2px rgb(237, 237, 237);
  cursor: pointer;
  text-decoration: inherit;
}
.product-card:hover {
  border: 1px solid rgb(237, 237, 237);
}
.strikethrough {
  text-decoration: line-through;
}
.product-description {
  max-height: 100px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
