(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[3],{"023a":function(t,s,i){},"0d8d":function(t,s,i){"use strict";i("023a")},"279c":function(t,s,i){t.exports=i.p+"img/dwaddwa.143a7d9e.png"},3908:function(t,s,i){t.exports=i.p+"img/skateboard-art-1.2ffcad9a.jpeg"},"58fd":function(t,s,i){t.exports=i.p+"img/fft3_工作區域 1.1bddaa4c.png"},6865:function(t,s,i){t.exports=i.p+"img/sk81_工作區域 1.0bc65679.png"},"79cd":function(t,s,i){t.exports=i.p+"img/joinus.ba5d8880.png"},9261:function(t,s,i){"use strict";i.r(s);var e=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("q-page",[e("section",{staticStyle:{overflow:"hidden"},attrs:{id:"section01"}},[e("q-carousel",{attrs:{animated:"",navigation:"",infinite:"",autoplay:t.autoplay,arrows:"","transition-prev":"slide-right","transition-next":"slide-left"},on:{mouseenter:function(s){t.autoplay=!1},mouseleave:function(s){t.autoplay=!0}},model:{value:t.slide,callback:function(s){t.slide=s},expression:"slide"}},[e("q-carousel-slide",{attrs:{name:1,"img-src":i("d3a1")}}),e("q-carousel-slide",{attrs:{name:2,"img-src":i("f70a")}}),e("q-carousel-slide",{attrs:{name:3,"img-src":i("3908")}}),e("q-carousel-slide",{attrs:{name:4,"img-src":i("9336")}})],1)],1),e("section",{attrs:{id:"section02"}},[e("div",{staticClass:"row secTop"},[e("div",{staticClass:"col-6 featured d-flex",attrs:{id:"f01"}},[e("img",{attrs:{src:i("6865")}})]),e("div",{staticClass:"col-6 featured",attrs:{id:"f02"}},[e("img",{attrs:{src:i("bf86")}})])]),e("div",{staticClass:"row secBottom"},[e("img",{attrs:{src:i("79cd")}})])]),e("div",{attrs:{id:"section03"}},[e("div",{staticClass:"row",staticStyle:{height:"100%"}},[e("div",{staticClass:"col-12 col-md-6",staticStyle:{position:"relative"}},[e("div",{attrs:{id:"product01"}},[e("img",{attrs:{src:i("d675")}})]),e("div",{attrs:{id:"product02"}},[e("img",{attrs:{src:i("279c")}})])]),e("div",{staticClass:"col-12 col-md-6",staticStyle:{position:"relative"}},[e("div",{attrs:{id:"product03"}},[e("img",{attrs:{src:i("f8c4")}})]),e("div",{attrs:{id:"product04"}},[e("img",{attrs:{src:i("58fd")}})])])])]),e("div",{attrs:{id:"section04"}},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-12",staticStyle:{position:"relative"}},[e("swiper",{ref:"mySwiper",staticClass:"swiper",staticStyle:{width:"100%"},attrs:{options:t.swiperOptions}},t._l(t.products,(function(s){return e("swiper-slide",{key:s._id,staticStyle:{height:"50%"}},[e("div",{staticClass:"singleproduct q-ma-lg",attrs:{to:"/singleProduct/"+s._id}},[e("router-link",{attrs:{id:"routerLink",to:"/singleProduct/"+s._id}},[e("div",{staticClass:"product-image q-mb-md"},[e("q-img",{staticClass:"p-image",attrs:{src:s.image}})],1),e("div",{staticClass:"text-center"},[e("div",{staticClass:"title",staticStyle:{"font-size":"25px"}},[t._v(t._s(s.name))]),e("div",{staticClass:"price"},[t._v("NT$"+t._s(s.price))])])]),e("q-btn",{staticClass:"addcart d-flex",attrs:{unelevated:"",rounded:"",color:"redpink",label:"加入購物車"},on:{click:function(i){return t.addCart(s._id)}}})],1)])})),1),e("div",{staticClass:"swiper-button-next"}),e("div",{staticClass:"swiper-button-prev"})],1)])])])},a=[],r=i("7212"),o=(i("a7a3"),{name:"carrousel",components:{Swiper:r["Swiper"],SwiperSlide:r["SwiperSlide"]},data(){return{slide:1,autoplay:!0,swiperOptions:{loop:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},breakpoints:{320:{slidesPerView:1,spaceBetween:20},600:{slidesPerView:2},960:{slidesPerView:3},1264:{slidesPerView:4}}},products:[]}},methods:{addCart(t){console.log(t),this.$store.dispatch("user/addCart",{product:t,quantity:1})}},async created(){try{const{data:t}=await this.api.get("/products");this.products=t.result}catch(t){this.$q.notify({message:t.response.data.message,type:"negative"})}}}),c=o,d=(i("0d8d"),i("2877")),n=i("9989"),l=i("880c"),p=i("62cd"),u=i("068f"),f=i("9c40"),g=i("eebe"),m=i.n(g),v=Object(d["a"])(c,e,a,!1,null,null,null);s["default"]=v.exports;m()(v,"components",{QPage:n["a"],QCarousel:l["a"],QCarouselSlide:p["a"],QImg:u["a"],QBtn:f["a"]})},9336:function(t,s,i){t.exports=i.p+"img/T0FLMTMzOTQ3MjU3.dda81b85.jpeg"},bf86:function(t,s,i){t.exports=i.p+"img/fft1p.8e7b9d6d.png"},d3a1:function(t,s,i){t.exports=i.p+"img/fotook-k0hB-U1401069467286d3-984x601@RC.bbca7548.jpeg"},d675:function(t,s,i){t.exports=i.p+"img/pppppp.80fa31b9.png"},f70a:function(t,s,i){t.exports=i.p+"img/Jhancarlos gonzalez foto Facebook.ae4eed56.jpeg"},f8c4:function(t,s,i){t.exports=i.p+"img/fft1_工作區域 1.fc138e7d.png"}}]);