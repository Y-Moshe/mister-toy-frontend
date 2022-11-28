<template>
  <ul class="clean-list">
    <li v-for="review in reviews" :key="review._id">
      <review-preview :review="review" @remove="$emit('remove', $event)" />
    </li>
  </ul>
</template>

<script>
import reviewPreview from './review-preview.vue'

export default {
  props: { reviews: Array },
  components: { reviewPreview }
}
</script>
