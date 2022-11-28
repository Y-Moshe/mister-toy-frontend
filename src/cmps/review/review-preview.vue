<template>
  <article class="review-preview">

    <router-link to="/">
      <div class="profile">
        <el-image src="src/assets/img/profile.png" alt="profile img" class="review-profile-img" />
        <span>{{ user?.fullname }}</span>
      </div>
    </router-link>

    <p>{{ review.txt }}</p>
    <el-button v-if="user?.isAdmin" type="danger" @click="$emit('remove', review._id)" size="small" :icon="deleteIcon" />
  </article>
</template>

<script>
import { Delete } from '@element-plus/icons-vue'

export default {
  props: { review: Object },
  computed: {
    user() {
      return this.$store.getters.user
    },
    deleteIcon() {
      return Delete
    }
  }
}
</script>
