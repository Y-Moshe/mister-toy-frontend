<template>
  <section class="toy-app">
    <toy-filter :filterBy="filterBy" @change="changeFilter" />
    <div class="add-toy" v-if="user?.isAdmin">
      <router-link to="/toy/edit">Add a toy +</router-link>
    </div>
    <hr>

    <loader :show="toys.length === 0" />
    <toy-list :toys="toys" @remove="removeToy" />

    <!-- <pagination
      :page="filterBy.page"
      :totalPages="totalPages"
      @prev="goNexrPrevPage(-1)"
      @page="goToPage"
      @next="goNexrPrevPage(1)"
    /> -->
  </section>
</template>

<script>
import { ElMessage } from 'element-plus'
import { utilService } from '../services/util.service.js'

import { actions, mutations } from '../store/modules/toy.store'
import toyList from '../cmps/toy/toy-list.vue'
import toyFilter from '../cmps/toy/toy-filter.vue'
import loader from '../cmps/loader.vue'
import pagination from '../cmps/pagination.vue'

export default {
  created() {
    this.$store.dispatch({ type: 'loadToys' })
    this.doFilter = utilService.debounce(this.changeFilter, 500) // MAKE IT WORK WITH THE DEBOUNCE
  },
  methods: {
    removeToy(toyId) {
      this.$store.dispatch(actions.removeToy(toyid))
        .then(() => ElMessage.success(`Toy ${toyId} removed successfully!`))
        .catch(() => ElMessage.error(`Failed to remove ${toyId}`))
    },
    changeFilter(name, value) {
      const target = { name, value }
      this.$store.commit(mutations.setFilterBy(target))
    },
    // goNexrPrevPage(diff) {
    //   const { page: currPage } = this.filterBy
    //   const nextPage = currPage + diff
    //   const target = { name: 'page', value: nextPage }
    //   this.$store.commit(mutations.setFilterBy(target))
    // },
    // goToPage(page) {
    //   const target = { name: 'page', value: page }
    //   this.$store.commit(mutations.setFilterBy(target))
    // },
  },
  computed: {
    filterBy() {
      return this.$store.getters.filterBy
    },
    toys() {
      return this.$store.getters.toys
    },
    user() {
      return this.$store.getters.user
    },
    // totalPages() {
    //   return this.$store.getters.totalPages
    // }
  },
  components: {
    toyList,
    toyFilter,
    loader,
    pagination
  }
}
</script>
