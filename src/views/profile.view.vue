<template>
  <h1>Profile</h1>
</template>

<script>
import { ElMessage } from 'element-plus'
import { reviewService } from '../services/review.service'

export default {
  data() {
    return {
      reviews: []
    }
  },
  created() {
    this.loadReviews()
  },
  methods: {
    loadReviews() {
      reviewService.query({ userId: this.user._id })
        .then(reviews => this.reviews = reviews)
        .catch(() => ElMessage.error('Failed to load reviews'))
    }
  },
  computed: {
    user() {
      return this.$store.state.getters.user
    }
  }
}
</script>