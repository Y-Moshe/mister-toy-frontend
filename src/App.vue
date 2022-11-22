<template>
  <section>
    <app-header />
    <router-view class="main-view" />
    <app-footer />
    <user-msg />
  </section>
</template>

<script>
import { RouterView } from 'vue-router'

import appHeader from './cmps/app-header.vue'
import appFooter from './cmps/app-footer.vue'
import userMsg from './cmps/user-msg.vue'

export default {
  components: {
    appHeader,
    appFooter,
    userMsg
  }
}

</script>
