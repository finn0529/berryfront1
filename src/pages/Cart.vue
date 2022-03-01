<template lang="pug">
q-page
  .row(style="padding:50px ; padding-top:80px ; padding-bottom:100px ;")
    .col
      h4 購物車
      .cartTable(v-if="products.length>0" style="position: relative;")
        q-table(:data='products' :columns='columns' row-key='name' hide-bottom style="background: none; box-shadow:none" :pagination.sync="pagination")
          template(v-slot:body="props")
            q-tr
              q-td.text-center
                img(v-if='props.row.product.image' :src='props.row.product.image' style="height: 100px;")
              q-td.text-center {{ props.row.product.name }}
              q-td.text-center NT$ {{ props.row.product.price }}
              q-td
                q-input.quantity(v-model='props.row.quantity' outlined color='black' bg-color='white' type='number' style="width:65px;" min='1' @input='updateCart(props.pageIndex, props.row.quantity)')
              q-td.text-center
                q-btn(flat @click='updateCart(props.pageIndex, 0)') X
        p.text-right(style="font-size: 20px;") 總金額 NT$ {{ total }}
        q-btn(unelevated rounded style="right: 0; position: absolute;" color="light-green-4" size="lg" to="/check") 前往結帳
      p(v-else) 購物車是空的喔！
        q-btn(flat to="/product") 立即前往購物
</template>
<script>

export default {
  data () {
    return {
      pagination: {
        rowsPerPage: 100
      },
      products: [],
      columns: [
        { name: 'image', label: '圖片', align: 'center' },
        { name: 'pname', label: '商品名稱', align: 'center' },
        { name: 'price', label: '價格', align: 'center' },
        { name: 'quantity', label: '數量', align: 'center' },
        { name: 'delete', label: '刪除', align: 'center' }
      ]
    }
  },
  methods: {
    async updateCart (index, quantity) {
      try {
        await this.api.patch('/users/me/cart', { product: this.products[index].product._id, quantity }, {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        if (quantity === 0) {
          this.products.splice(index, 1)
          this.$store.commit('user/updateCart', this.user.cart - 1)
        }
      } catch (error) {
        this.$q.notify({
          message: error.response.data.message,
          type: 'negative'
        })
      }
    }
  },
  computed: {
    total () {
      return this.products.reduce((accumlator, currentValue) => {
        return accumlator + currentValue.quantity * currentValue.product.price
      }, 0)
    }
  },
  async created () {
    try {
      const { data } = await this.api.get('/users/me/cart', {
        headers: {
          authorization: 'Bearer ' + this.user.token
        }
      })
      this.products = data.result
      console.log(this.products)
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
  .quantity
    position: absolute
    left: 50%
    top: 50%
    transform: translate(-50%,-50%)
</style>
