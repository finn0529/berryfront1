<template lang="pug">
q-page
  section#section01(style="overflow: hidden;")
    q-carousel(animated v-model='slide' navigation infinite :autoplay='autoplay' arrows transition-prev='slide-right' transition-next='slide-left' @mouseenter='autoplay = false' @mouseleave='autoplay = true')
      q-carousel-slide(:name='1' img-src='../assets/img/fotook-k0hB-U1401069467286d3-984x601@RC.jpeg')
      q-carousel-slide(:name='2' img-src='../assets/img/Jhancarlos gonzalez foto Facebook.jpeg')
      q-carousel-slide(:name='3' img-src='../assets/img/skateboard-art-1.jpeg')
      q-carousel-slide(:name='4' img-src='../assets/img/T0FLMTMzOTQ3MjU3.jpeg')
  section#section02
    .row.secTop
      .col-6.featured#f01.d-flex
        img(src='../assets/img/sk81_工作區域 1.png')
      .col-6.featured#f02
        img(src='../assets/img/fft1p.png')
    .row.secBottom
      img(src="../assets/img//joinus.png")
  #section03
    .row(style="height:100%;")
      .col-12.col-md-6(style="position: relative;")
        #product01
          img(src='../assets/img/product/pppppp.png')
        #product02
          img(src='../assets/img/product/dwaddwa.png')
      .col-12.col-md-6(style="position: relative;")
        #product03
          img(src='../assets/img/product/fft1_工作區域 1.png')
        #product04
          img(src='../assets/img/product/fft3_工作區域 1.png')
  #section04
    .row
      .col-12(style="position: relative;")
        swiper.swiper(ref='mySwiper' :options='swiperOptions' style="width:100%;")
          swiper-slide(v-for='product in products' :key='product._id' style="height:50%")
            .singleproduct.q-ma-lg(:to='"/singleProduct/" + product._id')
              router-link#routerLink(:to='"/singleProduct/" + product._id')
                .product-image.q-mb-md
                  q-img.p-image(:src='product.image')
                .text-center
                  .title(style="font-size: 25px;") {{ product.name }}
                  .price NT${{ product.price }}
              q-btn.addcart.d-flex(unelevated rounded color="redpink" label="加入購物車" @click='addCart(product._id)')
        .swiper-button-next
        .swiper-button-prev
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  name: 'carrousel',
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      slide: 1,
      autoplay: true,
      swiperOptions: {
        loop: true,
        // autoplay: {
        //   delay: 5000,
        //   disableOnInteraction: false
        // },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 20
          },
          600: {
            slidesPerView: 2
          },
          960: {
            slidesPerView: 3
          },
          1264: {
            slidesPerView: 4
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
  .q-carousel
    height: 100%
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
      padding: 0 !important
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%,-50%)
      justify-content: center
      align-items: center
      display: none
      text-align: center
  .singleproduct:hover
    .addcart
      display: flex
.text-redpink
  color: #8bb4cf !important
.bg-redpink
  background: #8bb4cf !important
.swiper-button-next,.swiper-button-prev
  color:#8bb4cf !important
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
  #section02
    .secBottom
      img
        width: 100%
        height: auto
  #section03
    height: 100vh
</style>
