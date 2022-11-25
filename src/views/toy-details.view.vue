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
      <ul class="clean-list">
        <li v-for="review in toy.reviews">{{ review }}</li>
      </ul>
    </div>
  </section>
</template>

<script>
import { showErrorMsg } from '../services/event-bus.service.js'
import { toyService } from '../services/toy.service.js'

import loader from '../cmps/loader.vue'

export default {
  data() {
    return {
      toy: null
    }
  },
  created() {
    toyService.getById(this.toyId)
      .then(toy => this.toy = toy)
      .catch(() => showErrorMsg(`Failed to load the toy ${this.toyId}!`))
  },
  methods: {
    getCreatedAt(timestamp) {
      return new Date(timestamp).toLocaleTimeString()
    }
  },
  computed: {
    toyId() {
      return this.$route.params.id
    }
  },
  components: {
    loader
  }
}
</script>
