<template>
  <section class="toy-edit">
    <loader :show="isLoading" />
    <el-form v-if="!isLoading" :model="toy" label-position="left" label-width="100px">

      <el-form-item label="Name">
        <el-input type="text" v-model="toy.name" v-focus />
      </el-form-item>

      <el-form-item label="Price">
        <el-input type="number" v-model="toy.price" />
      </el-form-item>

      <el-form-item label="Labels">
        <dropdown-select v-model="toy.labels" />
      </el-form-item>

      <el-form-item label="In Stock">
        <el-checkbox v-model="toy.inStock" />
      </el-form-item>

      <el-button type="success" @click="handleSubmit">{{ getBtnText }}</el-button>
    </el-form>
  </section>
</template>

<script>
import { utilService } from '../services/util.service.js'
import { toyService } from '../services/toy.service.js'
import { showSuccessMsg } from '../services/event-bus.service.js'

import loader from '../cmps/loader.vue'
import dropdownSelect from '../cmps/dropdown-select.vue'

export default {
  data() {
    return {
      toy: toyService.getEmptyToy(),
      isLoading: true
    }
  },
  created() {
    if (this.toyId) {
      toyService.getById(this.toyId)
        .then(toy => {
          this.toy = utilService.deepCopy(toy)
          this.isLoading = false
        })
        .catch(() => showErrorMsg(`Failed to load the toy ${this.toyId}!`))
    } else {
      this.isLoading = false
    }
  },
  methods: {
    handleSubmit() {
      if (!this.toyId) this.toy.createdAt = Date.now()
      this.$store.dispatch({ type: 'saveToy', toy: this.toy })
        .then(() => {
          showSuccessMsg('The toy saved successfully!')
          this.$router.push('/')
        })
        .catch(() => showSuccessMsg('Failed to save the toy'))
    }
  },
  computed: {
    toyId() {
      return this.$route.params.id
    },
    getBtnText() {
      return this.toyId ? 'Save' : 'Add'
    }
  },
  components: {
    loader,
    dropdownSelect
  }
}
</script>
