<template lang="pug">
q-page
  .row(style="padding:30px ; padding-top:120px ;")
    .col-12.col-md-6.text-center(style="height: 60%;")
      img(:src="image" style="width: 80%;")
    .col-12.col-md-6
      h3 {{ name }}
      p 數量
      q-input(outlined v-model.number='quantity' color='black' bg-color='white' type='number' style="width:50px; margin-bottom:20px" min='1')
      q-btn.addcart(unelevated rounded color="redpink" label="加入購物車" @click='addCart')
      p.q-mt-lg(v-html='description')
</template>
<script>
export default {
  data () {
    return {
      name: '',
      price: 0,
      image: '',
      description: '',
      sell: false,
      category: '',
      quantity: 1
    }
  },
  methods: {
    addCart () {
      console.log(this.$route.params.id)
      this.$store.dispatch('user/addCart', { product: this.$route.params.id, quantity: this.quantity })
    }
  },
  async created () {
    if (this.$route.params.id) {
      try {
        const { data } = await this.api.get('/products/' + this.$route.params.id)
        this.name = data.result.name
        this.price = data.result.price
        this.description = data.result.description
        this.image = data.result.image
        this.category = data.result.category
        this.sell = data.result.sell
        document.title = `${this.name}`
      } catch (error) {
        this.$q.notify({
          message: error.response.data.message,
          type: 'negative'
        })
      }
    }
  }
}
</script>
<style lang="sass">
  .bg-redpink
    background: #ff7e8f !important
</style>
