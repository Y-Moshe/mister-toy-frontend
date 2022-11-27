<template>
  <el-card class="toy-preview">
    <template #header>
      <h1>{{ toy.name }}</h1>
    </template>
    <img :src="toy.imgUrl" alt="toy" class="toy-img">
    <div class="price">
      <span>Price: {{ formattedCurrency }}</span>
      <span :class="inStockClass">{{ stockLbl }}</span>
    </div>
    <section class="tags">
      <el-tag type="info" v-for="tag in toy.tags">{{ tag }}</el-tag>
    </section>
    <el-divider><el-icon><MoreFilled /></el-icon></el-divider>
    <section class="toy-actions">
      <router-link :to="toyLink"><el-link type="info" :icon="icons.Reading" /></router-link>
      <template v-if="user?.isAdmin">
        <router-link :to="editLink"><el-link type="warning" :icon="icons.Edit" /></router-link>
        <el-popconfirm
          :icon="null"
          title="Are you sure to delete this toy?"
          @confirm="$emit('remove', toy._id)">
          <template #reference>
            <el-link type="danger" :icon="icons.Delete" @click.prevent />
          </template>
        </el-popconfirm>
      </template>
    </section>
  </el-card>
</template>

<script>
import { Delete, Edit, Reading, MoreFilled } from '@element-plus/icons-vue'

export default {
  props: { toy: Object },
  components: { MoreFilled },
  methods: {
    formattedDate(timestamp) {
      return new Date(timestamp).toLocaleTimeString()
    }
  },
  computed: {
    icons() {
      return {
        Delete,
        Edit,
        Reading
      }
    },
    user() {
      return this.$store.getters.user
    },
    toyLink() {
      return '/toy/' + this.toy._id
    },
    editLink() {
      return '/toy/edit/' + this.toy._id
    },
    stockLbl() {
      return this.toy.inStock ? 'In-stock' : 'Out-of-stock'
    },
    inStockClass() {
      return {
        'in-stock': this.toy.inStock,
        'out-of-stock': !this.toy.inStock
      }
    },
    formattedCurrency() {
      const price = this.toy.price
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(price)
    }
  }
}
</script>
