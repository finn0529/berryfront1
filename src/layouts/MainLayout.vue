<template lang="pug">
#mainLayout
  q-layout
    q-header
      q-toolbar.fixed(style="z-index:99")
        q-btn.lt-sm(flat @click='drawerLeft = !drawerLeft' round dense icon='menu')
        q-toolbar-title
          q-btn(flat to='/')
            img(src="../assets/img/berry.png" width="100px")
        .gt-xs
          q-btn(flat to='/')
            span(style="color: rgb(250, 108, 132)") 首頁
          q-btn(flat)
            span(style="color: rgb(250, 108, 132)") 最新消息
          q-btn(flat to='/product')
            span(style="color: rgb(250, 108, 132)") 所有商品
          q-btn(flat)
            span(style="color: rgb(250, 108, 132)") 購物須知
          q-btn(v-if="!user.isLogin" flat round @click='signin = true' )
            img(src="../assets/icon/login_工作區域 1.png" width="25px")
          q-btn-dropdown(flat v-if="user.isLogin" label='會員管理' style="color: rgb(250, 108, 132)")
            q-list
              q-item(clickable to='/order')
                q-item-section
                  q-item-label 我的訂單
              q-item(clickable flat @click="logout")
                q-item-section
                  q-item-label 登出
        q-btn(flat round )
          img(src="../assets/icon/search_工作區域 1.png" width="25px")
        q-btn(v-if="user.isLogin" flat round to="/cart")
          img(src="../assets/icon/cart_工作區域 1.png" width="25px")
          q-badge( v-if="user.cart>=1" rounded color='red' style="position: absolute; right:-5px; top:0;") {{ user.cart }}
        //登入
        q-dialog(v-model='signin' persistent)
          q-card(style='min-width: 350px')
            q-form(align='center' @submit.prevent='login')
              q-card-section
                .logo(align='center')
                  img(src="../assets/img/berry.png" width="100px")
              q-card-section.q-pt-none
                q-input(label-color="redpink" color="redpink" v-model='signInForm.email' label='E-mail')
                q-input(type='password' label-color="redpink" color="redpink" v-model='signInForm.password' label='Password' )
              q-card-actions.text-primary(align='center')
                q-btn(flat style="color:#ff7e8f" label='註冊帳號' v-close-popup @click='signup = true')
                q-btn(flat style="color:#ff7e8f" label='忘記密碼')
              q-btn.q-mb-md(style="background: #ff7e8f; color:white" label='登入' v-close-popup type='submit')
            q-btn(flat label='X' v-close-popup style='position: absolute; right: 0; top: 0')
        //註冊
        q-dialog(v-model='signup' persistent)
          q-card(style='min-width: 350px')
            q-form(align='center' @submit.prevent='register' @reset='onReset')
              q-card-section
                .logo(align='center')
                  img(src="../assets/img/berry.png" width="100px")
              q-card-section.q-pt-none
                q-input(label-color="redpink" color="redpink" v-model='signUpForm.email' label='E-mail' :rules="[ val => validator.isEmail(val) || '格式不正確' ]")
                q-input(type='password' label-color="redpink" color="redpink" v-model='signUpForm.password' label='密碼' :rules="[ val => val.length >=4 && val.length <=20 || '4至20個字' ]")
                q-input(type='password' label-color="redpink" color="redpink" v-model='signUpForm.passwordCheck' label='確認密碼' :rules="[ val => val === signUpForm.password|| '與密碼不相同' ]")
                q-input(label-color="redpink" color="redpink" v-model='signUpForm.lastName' label='姓')
                q-input(label-color="redpink" color="redpink" v-model='signUpForm.firstName' label='名')
              q-btn.q-mb-md(style="background: #ff7e8f; color:white" label='註冊' type='submit')
              q-btn(flat label='已經有帳號了' v-close-popup @click='signin = true' style='position: absolute; right: 40px; bottom: 25px; color: rgb(143, 143, 143)' size="6px")
              q-btn(flat label='X' v-close-popup style='position: absolute; right: 0; top: 0' type='reset')
        q-drawer(v-model='drawerLeft' show-if-above elevated :width='200' :breakpoint='3000' background-color="redpink")
          q-list(style="color:white")
            q-item(clickable v-ripple to='/' active-class="white")
              q-item-section 首頁
            q-item(clickable v-ripple active-class="white")
              q-item-section 最新消息
            q-item(clickable v-ripple active-class="white" to='/product')
              q-item-section 所有商品
            q-item(clickable v-ripple active-class="white")
              q-item-section 購物須知
            q-item(clickable v-ripple active-class="white" v-if="user.isLogin" to='/order')
              q-item-section 我的訂單
            q-item(clickable v-ripple active-class="white" v-if="!user.isLogin" @click=' signin = true')
              q-item-section 登入/註冊
            q-item(clickable v-ripple active-class="white" v-if="user.isLogin" @click="logout")
              q-item-section 登出
    q-page-container
      router-view
    q-footer.text-center(style="padding:30px; height:200px; background:rgb(255, 171, 185)")
      p 關注我們
      .footerBtn.d-flex
        q-btn(flat round)
          i.fa-brands.fa-facebook.fa-xl
        q-btn(flat round)
          i.fa-brands.fa-instagram.fa-xl
        q-btn(flat round)
          i.fa-brands.fa-twitter.fa-xl
        q-btn(flat round)
          i.fa-brands.fa-pinterest.fa-xl
      p © 2022 小莓波醬.
      //- p(style="font-size: 25px;") 小莓波醬測試網站 下單交易不成立
</template>

<style lang="sass">
  #mainLayout
    .q-btn
      color: rgb(250, 108, 132)
    .q-field__label
      color: #ff7e8f
    .q-drawer
      background: #ff7e8f
  .text-redpink
    color: #ff7e8f
</style>

<script>
// import { api } from 'boot/axios'
import validator from 'validator'
export default {
  name: 'MyLayout',
  data () {
    return {
      active: false,
      rightDrawerOpen: false,
      drawerLeft: false,
      signin: false,
      signup: false,
      signInForm: {
        email: '',
        password: ''
      },
      signUpForm: {
        email: '',
        password: '',
        passwordCheck: '',
        firstName: '',
        lastName: ''
      },
      validator
    }
  },
  computed: {
    state () {
      return {
        password: this.signUpForm.password.length === 0 ? null : this.signUpForm.password.length >= 4 && this.signUpForm.password.length <= 30

      }
    }
  },
  methods: {
    onReset () {
      this.signUpForm.email = null
      this.signUpForm.password = null
      this.signUpForm.passwordCheck = null
      this.signUpForm.firstName = null
      this.signUpForm.lastName = null
    },
    async register () {
      try {
        await this.api.post('/users', this.signUpForm)
        this.$q.notify({
          message: '註冊成功',
          type: 'positive'
        })
        this.onReset()
        this.signup = false
        this.signin = true
      } catch (error) {
        this.$q.notify({
          message: error.response.data.message,
          type: 'negative'
        })
        console.log(error)
      }
    },
    async login () {
      await this.$store.dispatch('user/login', this.signInForm)
      const user = this.$store.getters['user/user']
      this.signInForm.email = null
      this.signInForm.password = null
      if (user.isAdmin) {
        this.$router.push('/admin')
      }
    },
    logout () {
      this.$store.dispatch('user/logout')
    },
    openLogin () {
      this.drawerLeft = false
      this.signin = true
    }
  },
  async created () {
    this.$store.dispatch('user/getInfo')
  }
}
</script>
