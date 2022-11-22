<template>
  <div class="dropdown-select" @click="toggleDropdown">
    <p>{{ placeholder }}</p>
    <Transition name="fade-down">
      <div class="items" v-if="isOpen">
        <div v-rainbow v-for="item in labels" :key="item.label" class="item">
          <el-checkbox
            :label="item.label"
            :checked="item.isChecked"
            @change="handleCheckboxChange(item.label, $event)"
            @click.stop
          />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import { LABELS } from '../services/toy.service.js'
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
    handleCheckboxChange(label, { target }) {
      const modelValue = utilService.deepCopy(this.modelValue)
      const labelIdx = modelValue.indexOf(label)

      if (target.checked && labelIdx === -1) modelValue.push(label)
      else modelValue.splice(labelIdx, 1)

      this.$emit('update:modelValue', modelValue)
    }
  },
  computed: {
    labels() {
      return LABELS.map(lbl => ({ isChecked: this.modelValue.includes(lbl), label: lbl }))
    },
    placeholder() {
      return this.modelValue.length > 0
        ? this.modelValue.toString()
        : 'Select labels'
    }
  }
}
</script>

