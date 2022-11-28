
<template>
  <section class="chat-btn">
    <!-- v-outside-click="() => isOpen = false" -->

    <section class="chat-box" :style="{ display: isOpen ? 'grid' : 'none' }">
      <div class="chat-content">
        <p v-for="msg in messages"
          :key="msg.id"
          class="chat-msg"><span>{{ getUserName(msg.fullname) }}</span>: {{ msg.txt }}</p>
      </div>

      <el-form :model="form" @keydown.enter="handleMessage">
        <el-input type="text" v-model="form.message" placeholder="Type anything..." v-focus />
        <el-button type="success" @click="handleMessage" :icon="sendIcon" circle />
      </el-form>
    </section>

    <el-button type="primary" @click="isOpen = !isOpen" :icon="chatIcon" size="large"  circle />
  </section>
</template>

<script>
import { ChatDotRound, Promotion } from '@element-plus/icons-vue'

export default {
  props: { messages: Array },
  emits: ['messageSend'],
  data() {
    return {
      isOpen: false,
      form: {
        message: ''
      }
    }
  },
  methods: {
    handleMessage() {
      this.$emit('messageSend', this.form.message)
      this.form.message = ''
    },
    getUserName(name) {
      return this.user.fullname === name ? 'Me' : name
      // return name
    }
  },
  computed: {
    chatIcon() {
      return ChatDotRound
    },
    sendIcon() {
      return Promotion
    },
    user() {
      return this.$store.getters.user
    },
  }
}
</script>
