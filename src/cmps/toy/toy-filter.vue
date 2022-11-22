<template>
  <section class="todo-filter">
    <el-form inline>

      <el-form-item label="Search">
        <el-input
          type="text"
          placeholder="Search.."
          :modelValue="filterBy.keyword"
          @update:modelValue="$emit('change', 'keyword', $event)"
        />
      </el-form-item>

      <el-form-item label="In Stock">
        <el-checkbox
          :checked="filterBy.inStock"
          @change="$emit('change', 'inStock', $event)"
        />
      </el-form-item>

      <el-form-item label="Labels">
        <el-select
          multiple
          :modelValue="filterBy.labels"
          @update:modelValue="$emit('change', 'labels', $event)"
          placeholder="Select">
          <el-option
            v-for="label in labelOptions"
            :key="label"
            :label="label"
            :value="label"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="Sort by">
        <el-select
          placeholder="Select.."
          :modelValue="filterBy.sortBy"
          @update:modelValue="$emit('change', 'sortBy', $event)">
          <el-option
            v-for="option in sortOptions"
            :value="option"
            :key="option">
              {{ option }}
          </el-option>
        </el-select>
      </el-form-item>

    </el-form>
  </section>
</template>

<script>
import { LABELS } from '../../services/toy.service'

export default {
  props: { filterBy: Object },
  computed: {
    sortOptions() {
      return ['Name', 'Price', 'Created']
    },
    labelOptions() {
      return LABELS
    }
  }
}
</script>
