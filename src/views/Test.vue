<template>
  <div class="test-container page-container">
    <div class="page-title">Unit Test Page</div>
    <p>count is: {{ count }}</p>
    <p>person is: {{ JSON.stringify(person) }}</p>

    <button @click="increment">increment</button>
    <button @click="person.name += '!'">name++</button>
    <button @click="person.age += 1">age++</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch } from 'vue'

export default defineComponent({
  name: 'Vuex',
  setup() {
    const count = ref<number>(0)
    const person = reactive({
      name: '张三',
      age: 12
    })

    const increment = () => {
      count.value += 1
    }
    return { count, person, increment }
  }
})
</script>

<style scoped lang="less">
button {
  cursor: pointer;
  font-size: 20px;
  padding: 5px;
}
</style>
