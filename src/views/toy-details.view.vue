<template>
  <section class="toy-details">
    <loader :show="!toy" />
    <div v-if="toy">
      <p>ID: {{ toy._id }}</p>
      <p>Name: {{ toy.name }}</p>
      <p>Price: {{ toy.price }}</p>
      <p>Tags: {{ toy.tags }}</p>
      <p>In Stock: {{ toy.inStock }}</p>
      <p>Created At: {{ getCreatedAt(toy.createdAt) }}</p>
      <hr>
      <el-form :model="form">
        <el-input type="text" v-model="form.txt" />
        <el-button type="success" @click="submitReview">Add a review</el-button>
      </el-form>
      <hr>
      <ul class="clean-list">
        <li v-for="review in toy.reviews" :key="review._id">
          <p>{{ review.txt }}</p>
          <el-button v-if="user?.isAdmin" type="danger" @click="removeReview(review._id)">Remove review</el-button>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { ElMessage } from 'element-plus'
import { toyService } from '../services/toy.service.js'

import loader from '../cmps/loader.vue'

export default {
  data() {
    return {
      toy: null,
      form: {
        txt: ''
      }
    }
  },
  created() {
    toyService.getById(this.toyId)
      .then(toy => this.toy = toy)
      .catch(() => ElMessage.error(`Failed to load the toy ${this.toyId}!`))
  },
  methods: {
    getCreatedAt(timestamp) {
      return new Date(timestamp).toLocaleTimeString()
    },
    submitReview() {
      toyService.addReview(this.toyId, this.form.txt)
        .then(({ _id }) => {
          const review = {
            _id,
            txt: this.form.txt
          }

          this.toy.reviews.push(review)
          ElMessage.success('Review added successfully!')

          this.form.txt = ''
        })
        .catch(() => ElMessage.error('Failed to add your review'))
      },
    removeReview(reviewId) {
      toyService.removeReview(this.toyId, reviewId)
        .then(() => {
          const reviewIdx = this.toy.reviews.find(rev => rev._id === reviewId)
          this.toy.reviews.splice(reviewIdx, 1)

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
    }
  },
  components: {
    loader
  }
}
</script>
