<template>
  <div v-if="alive" class="alert" :class="alertClass">
    {{ msg.txt }}
  </div>
</template>

<script>
import { eventBus } from '../services/event-bus.service.js'

export default {
  created() {
    eventBus.on('show-msg', msg => {
      const delay = msg.delay || 2000
      this.msg = msg
      this.alive = true

      setTimeout(() => this.alive = false, delay)
    })
  },
  data() {
    return {
      alive: false,
      msg: null
    }
  },
  computed: {
    alertClass() {
      if (!this.msg) return
      return `alert-${this.msg.type}`
    }
  }
}
</script>
