
<template>
  <section class="chat-btn">
    <!-- v-outside-click="() => isOpen = false" -->

    <section class="chat-box" :style="{ display: isOpen ? 'grid' : 'none' }">
      <div class="chat-content">
        <p v-for="num in 50">{{num}}</p>
      </div>

      <el-form :model="form">
        <el-input type="text" v-model="form.message" v-focus />
        <el-button type="success" @click="handleMessage" :icon="sendIcon" circle />
      </el-form>
    </section>

    <el-button type="primary" @click="isOpen = !isOpen" :icon="chatIcon" size="large"  circle />
  </section>
</template>

<script>
import { ChatDotRound, Promotion } from '@element-plus/icons-vue'

export default {
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
      console.log('this.form.message', this.form.message)
      this.form.message = ''
    }
  },
  computed: {
    chatIcon() {
      return ChatDotRound
    },
    sendIcon() {
      return Promotion
    },
  }
}
</script>
