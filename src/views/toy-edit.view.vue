<template>
  <section class="toy-edit">
    <loader :show="isLoading" />
    <el-form v-if="!isLoading" :model="toy" label-position="left" label-width="100px">

      <el-form-item label="Name">
        <el-input type="text" v-model="toy.name" v-focus />
      </el-form-item>

      <el-form-item label="Img URL">
        <el-input type="text" v-model="toy.imgUrl" />
      </el-form-item>

      <el-form-item label="Price">
        <el-input type="number" v-model="toy.price" />
      </el-form-item>

      <el-form-item label="Tags">
        <el-select multiple v-model="toy.tags" placeholder="Select..">
          <el-option v-for="option in tagsOptions" :key="option" :value="option">
            {{ option }}
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="In Stock">
        <el-checkbox v-model="toy.inStock" />
      </el-form-item>

      <el-button type="success" @click="handleSubmit">{{ getBtnText }}</el-button>
    </el-form>
  </section>
</template>

<script>
import { ElMessage } from 'element-plus'

import { utilService } from '../services/util.service.js'
import { toyService, TAGS } from '../services/toy.service.js'

import loader from '../cmps/loader.vue'

export default {
  components: { loader },
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
        .catch(() => ElMessage.error(`Failed to load the toy ${this.toyId}!`))
    } else {
      this.isLoading = false
    }
  },
  methods: {
    handleSubmit() {
      if (!this.toyId) this.toy.createdAt = Date.now()
      this.$store.dispatch({ type: 'saveToy', toy: this.toy })
        .then(() => {
          ElMessage.success('The toy saved successfully!')
          this.$router.push('/')
        })
        .catch(() => ElMessage.error('Failed to save the toy'))
    }
  },
  computed: {
    toyId() {
      return this.$route.params.id
    },
    getBtnText() {
      return this.toyId ? 'Save' : 'Add'
    },
    tagsOptions() {
      return TAGS
    }
  }
}
</script>
