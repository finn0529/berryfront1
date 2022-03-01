<template lang="pug">
q-page
  .row(style="padding:50px ; padding-top:80px ; padding-bottom:100px ;")
    .col-12.col-md-6
      h4 寄送資訊
      q-form(class="q-pa-md q-gutter-sm" @submit.prevent="submitProduct" )
        q-input(outlined v-model="userInfo.name" color="black" bg-color="white" label="姓名" :rules="[ val => val.length > 0 || '名字必填' ]")
        q-input(outlined v-model="userInfo.phone" color="black" bg-color="white" label="電話" :rules="[ val => val.length == 10 || '電話格式不正確' ]")
        twzipcode-county#twzipcode__county.twzipcode(v-model='userInfo.county')
        twzipcode-zipcode#twzipcode__zipcode.twzipcode(text-template=":city" v-model='userInfo.zipcode' :filter-by-county='userInfo.county')
        q-input(outlined v-model="userInfo.address" color="black" bg-color="white" label="寄送地址" :rules="[ val => val.length > 0 || '地址必填' ]")
    .col-12.col-md-6(style="position: relative;")
      h4 商品資訊
      q-table(:data='products' :columns='columns' row-key='name' hide-bottom)
        template(v-slot:body="props" )
          q-tr
            q-td.text-center
              img(v-if='props.row.product.image' :src='props.row.product.image' style="height: 100px;")
            q-td.text-center {{ props.row.product.name }}
            q-td.text-center NT$ {{ props.row.product.price }}
            q-td.text-center 數量:{{ props.row.quantity }}
      p.text-right(style="font-size: 20px;") 總金額 NT$ {{ total }}
      q-btn(unelevated rounded style="right: 0; position: absolute;" color="light-green-4" size="lg" @click='checkOut') 結帳
</template>
<script>
import validator from 'validator'
import { Zipcode, County } from 'twzipcode-vue'
import twzipcode from 'twzipcode-data'
export default {
  data () {
    return {
      products: [],
      columns: [
        { name: 'image', label: '圖片', align: 'center' },
        { name: 'pname', label: '商品名稱', align: 'center' },
        { name: 'price', label: '價格', align: 'center' },
        { name: 'quantity', label: '數量', align: 'center' }
      ],
      userInfo:
        {
          name: '',
          phone: '',
          county: '臺北市',
          zipcode: '',
          address: ''
        },
      validator,
      twzipcode
    }
  },
  computed: {
    total () {
      return this.products.reduce((accumlator, currentValue) => {
        return accumlator + currentValue.quantity * currentValue.product.price
      }, 0)
    }
  },
  components: {
    TwzipcodeZipcode: Zipcode,
    TwzipcodeCounty: County
  },
  methods: {
    async checkOut () {
      try {
        await this.api.post('/orders', this.userInfo, {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        this.$q.notify({
          message: '結帳成功！',
          type: 'positive'
        })
        this.$router.push('/')
      } catch (error) {
        this.$q.notify({
          message: error.response.data.message,
          type: 'negative'
        })
      }
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
  .twzipcode
    width: 30%
    height: 56px
    color: #ff7e8f
</style>
