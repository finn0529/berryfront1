<template lang="pug">
#q-app
  router-view(:key='$route.fullPath')
</template>
<script>
export default {
  name: 'App',
  async created () {
    this.$store.dispatch('user/getInfo')
  }
}
</script>
