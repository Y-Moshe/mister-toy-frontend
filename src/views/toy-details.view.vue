<template>
  <section class="toy-details">
    <loader :show="!toy" />

    <section v-if="toy">
      <small>ID: {{ toy._id }}</small>
      <h1>{{ toy.name }}</h1>
      <div class="img-wrapper">
        <el-image :src="toy.imgUrl" loading="eager" />
        <div class="tags">
          <el-tag type="info" v-for="tag in toy.tags">{{ tag }}</el-tag>
        </div>
      </div>
      <div class="flex space-between">
        <span>Price: {{ formattedCurrency }}</span>
        <div class="flex gap-10">
          <span :class="inStockClass">{{ stockLbl }}</span>
          <span>Created At: {{ formattedDate }}</span>
        </div>
      </div>

      <hr>

      <el-form :model="form" :disabled="isLoading">
        <el-form-item label="Add Review">
          <el-col :span="16">
            <el-input type="text" v-model="form.txt" />
          </el-col>
          <el-col :offset="1" :span="4">
            <el-button type="success" @click="handleSubmitReview" class="w-100" :loading="isLoading">Post</el-button>
          </el-col>
        </el-form-item>
      </el-form>
      <hr>

      <review-list :reviews="toy.reviews" @remove="handleRemoveReview" />

    </section>
    <chat-btn :messages="chatMessages" @messageSend="sendChatMessage" />
  </section>
</template>

<script>
import { ElMessage } from 'element-plus'
import { toyService } from '../services/toy.service.js'
import { socketService } from '../services/socket.service'

import { reviewService } from '../services/review.service'
import reviewList from '../cmps/review/review-list.vue'

import loader from '../cmps/loader.vue'
import chatBtn from '../cmps/chat-btn.vue'

export default {
  components: {
    loader,
    reviewList,
    chatBtn
  },
  data() {
    return {
      toy: null,
      form: {
        txt: ''
      },
      isLoading: false,
      chatMessages: []
    }
  },
  created() {
    const { emits, events } = socketService
    socketService.emit(emits.SOCKET_EMIT_SET_TOPIC, this.toyId)
    socketService.on(events.SOCKET_EVENT_REVIEW_ADDED, this.reviewAdded)
    socketService.on(events.SOCKET_EVENT_REVIEW_REMOVED, this.removeReview)
    socketService.on(events.SOCKET_EVENT_ADD_MSG, this.addChatMessage)

    toyService.getById(this.toyId)
      .then(toy => this.toy = toy)
      .catch(() => ElMessage.error(`Failed to load the toy ${this.toyId}!`))
  },
  methods: {
    addChatMessage(msgObj) {
      this.chatMessages.push(msgObj)
    },
    sendChatMessage(msg) {
      const { emits } = socketService
      socketService.emit(emits.SOCKET_EMIT_SEND_MSG, msg)
    },
    reviewAdded(review) {
      this.toy.reviews.push(review)
      ElMessage.success('New review added!')
    },
    removeReview(reviewId) {
      const reviewIdx = this.toy.reviews.find(rev => rev._id === reviewId)
      this.toy.reviews.splice(reviewIdx, 1)
    },
    handleSubmitReview() {
      this.isLoading = true
      const reviewToSave = {
        toyId: this.toyId,
        txt: this.form.txt
      }

      reviewService.add(reviewToSave)
        .then(review => {
          this.toy.reviews.push(review)
          ElMessage.success('Review added successfully!')

          this.form.txt = ''
        })
        .catch(() => ElMessage.error('Failed to add your review'))
        .finally(() => this.isLoading = false)
    },
    handleRemoveReview(reviewId) {
      reviewService.remove(reviewId)
        .then(res => {
          console.log('res', res)
          this.removeReview(reviewId)

          ElMessage.success('Review successfully removed!')
        })
        .catch(() => ElMessage.error('Failed to remove your review'))
    }
  },
  computed: {
    toyId() {
      return this.$route.params.id
    },
    user() {
      return this.$store.getters.user
    },
    formattedDate() {
      return new Date(this.toy.createdAt).toLocaleTimeString()
    },
    inStockClass() {
      return {
        'in-stock': this.toy.inStock,
        'out-of-stock': !this.toy.inStock
      }
    },
    stockLbl() {
      return this.toy.inStock ? 'In-stock' : 'Out-of-stock'
    },
    formattedCurrency() {
      const price = this.toy.price
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(price)
    }
  }
}
</script>
