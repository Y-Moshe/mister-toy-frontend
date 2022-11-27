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
        <el-select
          :modelValue="filterBy.status"
          @update:modelValue="$emit('change', 'status', $event)"
          placeholder="Select stock">
          <el-option value="">All</el-option>
          <el-option value="In-stock">In-stock</el-option>
          <el-option value="Out-of-Stock">Out-of-stock</el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Tags">
        <el-select
          multiple
          :modelValue="filterBy.tags"
          @update:modelValue="$emit('change', 'tags', $event)"
          placeholder="Select tags">
          <el-option
            v-for="tag in tagsOptions"
            :key="tag"
            :label="tag"
            :value="tag"
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
import { TAGS } from '../../services/toy.service'

export default {
  props: { filterBy: Object },
  computed: {
    sortOptions() {
      return ['Name', 'Price']
    },
    tagsOptions() {
      return TAGS
    }
  }
}
</script>
