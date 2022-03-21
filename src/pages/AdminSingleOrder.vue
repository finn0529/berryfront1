<template lang="pug">
q-page(style="padding: 30px;")
  p(style="font-size: 30px;") 單號 {{ order._id }}
  p {{ order.date }}
  q-btn(@click='updateOrder({pay:!order.pay});order.pay=!order.pay')
    span(v-if="order.pay") 已付款
    span(v-else) 未付款
  q-btn(@click='updateOrder({ship:!order.ship});order.ship=!order.ship')
    span(v-if="order.ship") 已出貨
    span(v-else) 未出貨
  q-table(:data='order.products' :columns='columns' row-key='name' hide-bottom style="background: none; box-shadow:none")
    template(v-slot:body="props")
      q-tr
        q-td.text-center
          img(v-if='props.row.product.image' :src='props.row.product.image' style="height: 100px;")
        q-td.text-center {{ props.row.product.name }}
        q-td.text-center NT$ {{ props.row.product.price }}
        q-td.text-center {{ props.row.quantity }}
  p 訂購人： {{ order.userInfo.name }}
  p 電話： {{ order.userInfo.phone }}
  p 地址： {{ order.userInfo.zipcode + order.userInfo.address }}
</template>
<script>
export default {
  data () {
    return {
      order: '',
      columns: [
        { name: 'image', label: '圖片', align: 'center' },
        { name: 'pname', label: '商品名稱', align: 'center' },
        { name: 'price', label: '價格', align: 'center' },
        { name: 'quantity', label: '數量', align: 'center' }
      ]
    }
  },
  methods: {
    async updateOrder (condition) {
      try {
        await this.api.patch('/orders/' + this.order._id, condition, {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
      } catch (error) {
        console.log(error)
        this.$q.notify({
          message: error.response.data.message,
          type: 'negative'
        })
      }
    }
  },
  async created () {
    if (this.$route.params.id) {
      try {
        const { data } = await this.api.get('/orders/' + this.$route.params.id)
        this.order = data.result
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
<style lang="sass"></style>
