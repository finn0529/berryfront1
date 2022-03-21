<template lang="pug">
q-layout
  q-header(style="background:#ffffff ;")
    q-toolbar
      q-btn.lt-sm(flat @click='drawerLeft = !drawerLeft' round dense icon='menu' color='black')
      q-toolbar-title
        q-btn(flat to='/admin')
          img(src="../assets/img/finnflip_工作區域 1.png" width="100px")
  q-drawer(v-model='drawerLeft' show-if-above :width='200' :breakpoint='500' )
    q-list(style="color:black")
      q-item(clickable v-ripple active-class="white" to='/admin')
        q-item-section 首頁
      q-item(clickable v-ripple active-class="white" to='/admin/order')
        q-item-section 訂單管理
      q-item(clickable v-ripple active-class="white" to='/admin/product')
        q-item-section 商品管理
      q-item(clickable v-ripple active-class="white" to='/admin/customer')
        q-item-section 客戶管理
      q-item(clickable v-ripple active-class="white" to='/')
        q-item-section 返回官網
  q-page-container
    router-view
</template>
<script>
export default {
  name: 'admin',
  data () {
    return {
      drawerLeft: false
    }
  }
}
</script>
<style lang="sass">
  .q-drawer
    background: #fff
    color: #262626
</style>
