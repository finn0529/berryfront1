<template lang="pug">
q-page
  section#section01(style="overflow: hidden;")
    .sec01bg
    img.sec01img01(src='../assets/img/heart_工作區域 1.png')
    img.sec01img02(src='../assets/img/logoword_工作區域 1.png')
    img.sec01img03(src='../assets/img/berrydrink_工作區域 1.png')
    .wrapper
      swiper(ref='mySwiper' :options='swiperOptions')
        swiper-slide
          img(src='../assets/img/product/product1_工作區域 1.png')
        swiper-slide
          img(src='../assets/img/product/product2_工作區域 1.png')
        swiper-slide
          img(src='../assets/img/product/product3_工作區域 1.png')
        swiper-slide
          img(src='../assets/img/product/product4_工作區域 1.png')
        swiper-slide
          img(src='../assets/img/product/product5_工作區域 1.png')
        swiper-slide
          img(src='../assets/img/product/product6_工作區域 1.png')
      .swiper-button-next
      .swiper-button-prev
  section#section02
    .row.secTop
      .col-6.featured#f01.d-flex
        img(src='../assets/img/jssis.png')
      .col-6.featured#f02
        img(src='../assets/img/kbsis.png')
    .row.secBottom
      img(src="../assets/img/截圖 2022-02-08 下午1.59.33.png")
  #section03
    .row(style="height:100%;")
      .col-12.col-md-6(style="position: relative;")
        #product01
          img(src='../assets/img/product/product1_工作區域 1.png')
        #product02
          img(src='../assets/img/product/product2_工作區域 1.png')
      .col-12.col-md-6(style="position: relative;")
        #product03
          img(src='../assets/img/product/product3_工作區域 1.png')
        #product04
          img(src='../assets/img/product/product4_工作區域 1.png')
  #section04
    .row
      .col-12.col-sm-6.col-md-3(v-for='product in products.slice(0, 4)' :key='product._id' style="height:50%" )
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
  name: 'carrousel',
  data () {
    return {
      swiperOptions: {
        freeMode: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          hideOnClick: true
        },
        breakpoints: {
          320: {
            slidesPerView: 2,
            spaceBetween: 150
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 120
          },
          992: {
            slidesPerView: 4,
            spaceBetween: 100
          }
        }
      },
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
=poscenter
  top: 50%
  left: 50%
  transform: translate(-50%,-50%)
=dfcenter
  display: flex
  justify-content: center
  align-items: center
#section01
  overflow: hidden
  .sec01bg
    position: absolute
    width: 100%
    height: 100%
    +poscenter
  .sec01img01
    position: absolute
    width: 70%
    left: 50%
    top: 10%
    transform: translateX(-50%)
  .sec01img02
    position: absolute
    width: 70%
    left: 50%
    top: 20%
    transform: translateX(-50%)
  .sec01img03
    position: absolute
    width: 35%
    left: 0
    bottom: 20%
  .q-carousel
    background: none
  .wrapper
    width: 65%
    height: 300px
    position: absolute
    bottom: 5%
    left: 35%
    overflow: hidden
    img
      width: 210px
      height: 280px
#section02
  overflow: hidden
  background: #fcff8f
  .secTop
    height: 50%
    background-color: #fff
  .secBottom
    height: 50%
    position: relative
  .featured
    position: relative
    overflow: hidden
    img
      position: absolute
      height: 70%
      +poscenter
    &:hover
      transform: scale(110%)
    transition: 0.5s
    cursor: pointer
  .secBottom
    bottom: 0
    width: 100%
    height: 50%
    overflow: hidden
    img
      position: absolute
      height: 100%
      +poscenter
    &:hover
      transform: scale(110%)
    transition: 0.5s
    cursor: pointer
#section03
  height: 200vh
  #product01
    position: absolute
    right: 5%
    bottom: 10%
    width: 300px
    height: 400px
    &:hover
      transform: scale(110%)
    transition: 0.5s
    cursor: pointer
  #product02
    position: absolute
    left: 5%
    top: 10%
    width: 180px
    height: 240px
    &:hover
      transform: scale(110%)
    transition: 0.5s
    cursor: pointer
  #product03
    position: absolute
    left: 5%
    top: 10%
    width: 300px
    height: 400px
    &:hover
      transform: scale(110%)
    transition: 0.5s
    cursor: pointer
  #product04
    position: absolute
    right: 5%
    bottom: 10%
    width: 210px
    height: 280px
    &:hover
      transform: scale(110%)
    transition: 0.5s
    cursor: pointer
  img
    width: 100%
    position: absolute
    +poscenter
#section04
  background: #fff
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
.text-redpink
  color: #ff7e8f !important
.bg-redpink
  background: #ff7e8f !important
.swiper-button-next,.swiper-button-prev
  color:#ff7e8f !important
@media (min-width: 576px)
  #section01
    .sec01img01
      position: absolute
      width: 70%
      left: 50%
      top: 5%
      transform: translateX(-50%)
    .sec01img02
      position: absolute
      width: 70%
      left: 50%
      top: 17%
      transform: translateX(-50%)
    .sec01img03
      position: absolute
      width: 30%
      left: 3%
      bottom: 20%
@media (min-width: 768px)
  #section01
    .sec01img01
      position: absolute
      width: 70%
      left: 50%
      top: 0
      transform: translateX(-50%)
    .sec01img02
      position: absolute
      width: 70%
      left: 50%
      top: 10%
      transform: translateX(-50%)
    .sec01img03
      position: absolute
      width: 28%
      left: 3%
      bottom: 20%
  #section02
    .secBottom
      img
        width: 992px
        height: auto
@media (min-width: 992px)
  #section01
    .sec01img01
      position: absolute
      width: 50%
      left: 50%
      top: 0
      transform: translateX(-50%)
    .sec01img02
      position: absolute
      width: 45%
      left: 50%
      top: 14%
      transform: translateX(-50%)
    .sec01img03
      position: absolute
      width: 20%
      left: 8%
      bottom: 20%
  #section02
    .secBottom
      img
        width: 100%
  #section03
    height: 100vh
</style>
