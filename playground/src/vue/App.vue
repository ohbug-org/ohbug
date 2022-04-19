<template>
  <div>
    <h2>Ohbug Vue Demo</h2>

    <div>
      <div>
        Count: <span>{{ count }}</span>
      </div>

      <button @click="increment">
        Increment
      </button>
      <button @click="decrement">
        Decrement
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)

    const increment = () => {
      count.value++
    }
    const decrement = () => {
      count.value--
    }

    return {
      count,
      increment,
      decrement,
    }
  },
}
</script>
