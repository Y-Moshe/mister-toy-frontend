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
export default {
  computed: {
    user() {
      return this.$store.getters.user
    },
    profileLink() {
      return '/profile/' + this.user.username
    }
  }
}
</script>
