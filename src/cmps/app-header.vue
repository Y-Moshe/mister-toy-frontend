<template>
  <header>
    <nav class="main-nav">
      <router-link to="/">
        <h1>Toys</h1>
      </router-link>

      <ul class="clean-list flex gap-15" v-if="user">
        <li>
          <router-link :to="profileLink">{{ user.fullname }}</router-link>
        </li>
        <li v-if="user.isAdmin">
          <router-link to="/admin/dashboard">Dashboard</router-link>
        </li>
        <li>
          <el-button type="danger" :icon="SwitchButton" @click="handleLogout"></el-button>
        </li>
      </ul>
      <ul class="clean-list flex gap-15" v-else>
        <li>
          <router-link to="/auth/login">Login</router-link>
        </li>
        <li>
          <router-link to="/auth/signup">Signup</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { ElMessage } from 'element-plus'
import { SwitchButton } from '@element-plus/icons-vue'
import { authService } from '../services/auth.service'

export default {
  methods: {
    handleLogout() {
      authService.logout()
        .then(() => {
          this.$store.commit({ type: 'setUser', user: null })
          ElMessage.success('Successfully logged out!')
        })
        .catch(() => ElMessage.error('Failed to log out!'))
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
    profileLink() {
      return '/profile/' + this.user.username
    },
    SwitchButton() {
      return SwitchButton
    }
  }
}
</script>
