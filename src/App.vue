<template>
  <section class="main-app main-layout">
    <app-header class="main-header main-layout full" />
    <router-view class="main-view" />
    <app-footer class="main-footer full" />
  </section>
</template>

<script>
import { RouterView } from 'vue-router'

import appHeader from './cmps/app-header.vue'
import appFooter from './cmps/app-footer.vue'

export default {
  components: {
    appHeader,
    appFooter
  },
  created() {
    this.$store.dispatch({ type: 'loadUser' })
  }
}

</script>
