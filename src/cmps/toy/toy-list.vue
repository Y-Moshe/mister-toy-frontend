<template>
  <div class="toy-list">
    <div class="add-toy">
      <router-link to="/toy/edit">Add a toy +</router-link>
    </div>
      <toy-preview v-for="toy in toys" :key="toy._id"
        :toy="toy"
        @remove="$emit('remove', $event)"
      />
  </div>
</template>

<script>
import toyPreview from './toy-preview.vue'

export default {
  props: {
    toys: Array
  },
  components: {
    toyPreview
  }
}
</script>
