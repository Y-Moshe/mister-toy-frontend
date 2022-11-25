<template>
  <section class="auth-view">
    <el-form
      :model="credentials"
      :disabled="isLoading"
      @keydown.enter="handleSubmit"
      label-position="left"
      label-width="100px">
      <el-form-item>
        <h1>{{ formType }}</h1>
      </el-form-item>

      <el-form-item label="Fullname" v-if="!isLogin" required>
        <el-input type="text" v-model="credentials.fullname" />
      </el-form-item>

      <el-form-item label="Username" required>
        <el-input type="text" v-model="credentials.username" v-focus />
      </el-form-item>
      
      <el-form-item label="Password" required>
        <el-input type="password" v-model="credentials.password" />
      </el-form-item>

      <el-button type="primary" @click="handleSubmit" :loading="isLoading">{{ formType }}</el-button>
      <el-button v-if="isLogin" type="warning" @click="loginAsAdmin" plain>Login as admin</el-button>
    </el-form>
  </section>
</template>

<script>
import { authService } from '../services/auth.service.js'

export default {
  props: { isLogin: Boolean },
  data() {
    return {
      credentials: {
        username: '',
        password: '',
        fullname: ''
      },
      isLoading: false
    }
  },
  methods: {
    handleSubmit() {
      this.isLoading = true
      const authAction = this.isLogin
        ? authService.login
        : authService.signup

      authAction(this.credentials)
       .then(user => {
          this.$store.commit({ type: 'setUser', user })
          this.$router.push('/')
       })
       .catch(err => console.log('err', err))
       .finally(() => this.isLoading = false)
    },
    loginAsAdmin() {
      this.credentials.username = 'admin'
      this.credentials.password = 'admin'
      this.handleSubmit()
    }
  },
  computed: {
    formType() {
      return this.isLogin ? 'Login' : 'Signup'
    }
  }
}
</script>