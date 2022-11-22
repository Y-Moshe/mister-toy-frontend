<template>
  <el-card class="toy-preview">
    <template #header>
      <h1>{{ toy.name }}</h1>
    </template>
    <img src="../../assets/img/toy.jpg" alt="toy" class="toy-img">
    <p>Price: {{ toy.price }}</p>
    <section class="labels">
      <el-button v-for="label in toy.labels">{{ label }}</el-button>
    </section>
    <section class="toy-actions">
      <router-link :to="toyLink"><el-link type="info">Details</el-link></router-link>
      <router-link :to="editLink"><el-link type="warning">Edit</el-link></router-link>
      <el-link type="danger" :icon="deleteIcon" @click.prevent="$emit('remove', toy._id)" />
    </section>
  </el-card>
</template>

<script>
import { Delete } from '@element-plus/icons-vue'

export default {
  props: {
    toy: Object
  },
  methods: {
    formattedDate(timestamp) {
      return new Date(timestamp).toLocaleTimeString()
    }
  },
  computed: {
    toyLink() {
      return '/toy/' + this.toy._id
    },
    editLink() {
      return '/toy/edit/' + this.toy._id
    },
    deleteIcon() {
      return Delete
    }
  }
}
</script>
