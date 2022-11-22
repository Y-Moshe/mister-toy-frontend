<template>
  <div class="loader" v-if="show"></div>
</template>

<script>
export default {
  props: {
    show: Boolean
  }
}
</script>
