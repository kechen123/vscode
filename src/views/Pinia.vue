<template>
  <div class="vuex-container page-container">
    <div class="page-title">Vuex Test Page</div>
    <p>store Root is: {{ text }}</p>
    <p>store doubleCount is: {{ count }}</p>
    <el-button type="primary" @click="double">double</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, toRefs } from 'vue'
import { useUserStore } from '@/store/user'

export default defineComponent({
  name: 'Vuex',

  setup() {
    const userStore = useUserStore()
    const reactiveData = reactive({
      text: computed(() => userStore.name),
      count: computed(() => userStore.count)
    })

    const double = () => {
      userStore.updateName(reactiveData.text + '~')
    }

    return {
      ...toRefs(reactiveData),
      double
    }
  }
})
</script>

<style scoped lang="less"></style>
