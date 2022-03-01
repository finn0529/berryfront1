<template lang="pug">
q-page
  section#section01
    img.sec01bg(src="../assets/img/7429766.png")
    .wrapper
      swiper(ref='mySwiper' :options='swiperOptions')
        swiper-slide
          img(src='../assets/img/product/IMG_1022.jpg')
        swiper-slide
          img(src='../assets/img/product/IMG_0120.jpg')
        swiper-slide
          img(src='../assets/img/product/IMG_0457.jpg')
        swiper-slide
          img(src='../assets/img/product/IMG_0467.jpg')
        swiper-slide
          img(src='../assets/img/product/IMG_0588.jpg')
        swiper-slide
          img(src='../assets/img/product/IMG_0610.jpg')
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
  section#section03
    #product01
      img(src='../assets/img/product/IMG_1022.jpg')
    #product02
      img(src='../assets/img/product/IMG_0120.jpg')
    #product03
      img(src='../assets/img/product/IMG_0457.jpg')
    #product04
      img(src='../assets/img/product/IMG_0610.jpg')
  section#section04
</template>

<script>
export default {
  name: 'carrousel',
  data () {
    return {
      swiperOptions: {
        slidesPerView: 3,
        spaceBetween: 50,
        freeMode: true,
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next'
      }
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
    +poscenter
  .q-carousel
    background: none
  .wrapper
    width: 70%
    height: 350px
    position: absolute
    bottom: 5%
    left: 30%
    overflow: hidden
    img
      width: 210px
      height: 280px
#section02
  background: #fcff8f
  .secTop
    height: 50%
    background-color: #fff
  .secBottom
    height: 50%
    position: relative
  .featured
    position: relative
    img
      position: absolute
      height: 100%
      +poscenter
  .secBottom
    bottom: 0
    width: 100%
    height: 50%
    overflow: hidden
    img
      position: absolute
      width: 100%
      +poscenter
#section03
  position: relative
  #product01
    position: absolute
    left: 15%
    bottom: 10%
    width: 360px
    height: 480px
  #product02
    position: absolute
    left: 5%
    top: 10%
    width: 180px
    height: 240px
  #product03
    position: absolute
    right: 20%
    top: 10%
    width: 300px
    height: 400px
  #product04
    position: absolute
    right: 10%
    bottom: 12%
    width: 210px
    height: 280px
  img
    width: 100%
    position: absolute
    +poscenter
#section04
  background: #fff
</style>
