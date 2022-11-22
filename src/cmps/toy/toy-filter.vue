<template>
  <section class="todo-filter">
    <el-form inline>

      <el-form-item label="Search">
        <el-input type="text" placeholder="Search.." :value="filterBy.keyword" @input="$emit('change', 'keyword', $event)" />
      </el-form-item>

      <el-form-item label="In Stock">
        <el-checkbox :checked="filterBy.inStock" @change="$emit('change', 'inStock', $event)" />
      </el-form-item>

      <el-form-item label="Labels">
        <dropdown-select :modelValue="filterBy.labels" @update:modelValue="handleLabelsChange" />
      </el-form-item>

      <el-form-item label="Sort by">
        <el-select placeholder="Select.." :modelValue="filterBy.sortBy" @update:modelValue="$emit('change', 'sortBy', $event)">
          <el-option v-for="option in sortOptions" :value="option" :key="option">{{ option }}</el-option>
        </el-select>
      </el-form-item>

    </el-form>
  </section>
</template>

<script>
import dropdownSelect from '../dropdown-select.vue';

export default {
  props: { filterBy: Object },
  components: { dropdownSelect },
  methods: {
    handleLabelsChange(labels) {
      this.$emit('change', {
        target: {
          name: 'labels',
          value: labels
        }
      });
    }
  },
  computed: {
    sortOptions() {
      return ['Name', 'Price', 'Created']
    }
  }
}
</script>
