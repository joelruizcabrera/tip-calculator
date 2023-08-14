<template>
  <input
      ref="inputRef"
      type="text"
      name="tipSum"
      class="form-control w-100 rounded" id="tipSum" aria-describedby="basic-addon3 basic-addon4" style="font-size: 1.4rem"
  />
</template>

<script>
import { useCurrencyInput } from 'vue-currency-input'

export default {
  name: 'CurrencyInput',
  props: {
    modelValue: Number, // Vue 2: value
    options: Object
  },
  setup(props) {
    const { inputRef } = useCurrencyInput(props.options)

    return { inputRef }
  }
}
</script>