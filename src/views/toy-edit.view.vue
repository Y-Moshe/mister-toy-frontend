<template>
  <section class="toy-edit">
    <loader :show="isLoading" />
    <el-form v-if="!isLoading" :model="toy" label-position="left" label-width="100px">

      <el-form-item label="Name">
        <el-input type="text" v-model="toy.name" v-focus />
      </el-form-item>

      <el-form-item label="Img URL">
        <el-col :span="6">
          <el-input type="text" v-model="toy.imgUrl" :disabled="isImgUploading" />
        </el-col>
        <el-col :offset="1" :span="1">
          <label>Or</label>
        </el-col>
        <el-col :span="3">
          <input type="file" ref="fileRef" @change="handleUpload" hidden />
          <el-button type="primary" class="mr-1" @click="$refs.fileRef.click()" :loading="isImgUploading">Upload file</el-button>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-col :offset="6" :span="12">
          <el-image
            v-if="/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(toy.imgUrl)"
            :src="toy.imgUrl"
            loading="eager" />
        </el-col>
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

import { actions } from '../store/modules/toy.store'
import { utilService } from '../services/util.service.js'
import { uploadService } from '../services/upload.service'
import { toyService, TAGS } from '../services/toy.service.js'

import loader from '../cmps/loader.vue'

export default {
  components: { loader },
  data() {
    return {
      toy: toyService.getEmptyToy(),
      isLoading: true,
      isImgUploading: false
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
      this.$store.dispatch(actions.saveToy(this.toy))
        .then(() => {
          ElMessage.success('The toy saved successfully!')
          this.$router.push('/')
        })
        .catch(() => ElMessage.error('Failed to save the toy'))
    },
    handleUpload(ev) {
      this.isImgUploading = true
      uploadService.uploadImg(ev)
        .then(url => {
          this.toy.imgUrl = url
          ElMessage.success('Image uploaded successfully!(required to save toy)')
        })
        .catch(() => ElMessage.error('Failed to upload img!'))
        .finally(() => this.isImgUploading = false)
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
