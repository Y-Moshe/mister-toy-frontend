<template>
  <div>
    Auth
  </div>
</template>

<script>
export default {
  props: { isLogin: Boolean },
  created() {
    console.log('this.isLogin', this.isLogin)
  }
}
</script>