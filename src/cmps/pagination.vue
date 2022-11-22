<template>
  <div class="pagination">
    <button type="button" :disabled="page <= 0" @click="$emit('prev')">Previous</button>

    <ul class="clean-list pages-list">
      <li v-for="pageNum in totalPages" :key="pageNum" :class="pageClass(pageNum)" @click="$emit('page', pageNum - 1)">
        {{ pageNum }}
      </li>
    </ul>

    <button type="button" :disabled="(page + 1) >= totalPages" @click="$emit('next')">Next</button>
  </div>
</template>

<script>
export default {
  props: {
    page: Number,
    totalPages: Number
  },
  methods: {
    pageClass(page) {
      return {
        active: page === this.page + 1,
        'page': true
      }
    }
  }
}
</script>
