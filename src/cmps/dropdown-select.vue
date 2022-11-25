<template>
  <div class="dropdown-select" @click="toggleDropdown">
    <p>{{ placeholder }}</p>
    <Transition name="fade-down">
      <div class="items" v-if="isOpen">
        <div v-rainbow v-for="item in tagsOptions" :key="item.tag" class="item">
          <el-checkbox
            :label="item.tag"
            :checked="item.isChecked"
            @change="handleCheckboxChange(item.tag, $event)"
            @click.stop
          />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import { TAGS } from '../services/toy.service.js'
import { utilService } from '../services/util.service'

export default {
  props: {
    modelValue: Array
  },
  emits: ['update:modelValue'],
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen
    },
    handleCheckboxChange(tag, { target }) {
      const modelValue = utilService.deepCopy(this.modelValue)
      const tagIdx = modelValue.indexOf(tag)

      if (target.checked && tagIdx === -1) modelValue.push(tag)
      else modelValue.splice(tagIdx, 1)

      this.$emit('update:modelValue', modelValue)
    }
  },
  computed: {
    tagsOptions() {
      return TAGS.map(lbl => ({ isChecked: this.modelValue.includes(lbl), tag: lbl }))
    },
    placeholder() {
      return this.modelValue.length > 0
        ? this.modelValue.toString()
        : 'Select tags'
    }
  }
}
</script>

