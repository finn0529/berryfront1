<template lang="pug">
q-page#product
  .row(style="padding-top:150px ;")
    .col-12.col-sm-6.col-md-3(v-for='product in products' :key='product._id')
      .singleproduct.q-ma-lg(:to='"/singleProduct/" + product._id')
        router-link#routerLink(:to='"/singleProduct/" + product._id')
          .product-image.q-mb-md
            q-img.p-image(:src='product.image')
          .text-center
            .title(style="font-size: 25px;") {{ product.name }}
            .price NT${{ product.price }}
        q-btn.addcart(unelevated rounded color="redpink" label="加入購物車" @click='addCart(product._id)')

</template>
<script>
export default {
  data () {
    return {
      products: []
    }
  },
  methods: {
    addCart (productId) {
      console.log(productId)
      this.$store.dispatch('user/addCart', { product: productId, quantity: 1 })
    }
  },
  async created () {
    try {
      const { data } = await this.api.get('/products')
      this.products = data.result
    } catch (error) {
      this.$q.notify({
        message: error.response.data.message,
        type: 'negative'
      })
    }
  }
}
</script>
<style lang="sass">
  .bg-redpink
    background: #ff7e8f !important
  .text-redpink
    color: #ff7e8f !important
  .singleproduct
    position: relative
    cursor: pointer
    .p-image
      height: 400px
    .addcart
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%,-50%)
      display: none
  .singleproduct:hover
    .addcart
      display: block
</style>
