<template>
  <Header />
  <Layout>
    <template #left>
      <LeftActivitybar />
      <Left />
    </template>
    <template #content>
      <Content />
    </template>
    <template #right>
      <Right />
    </template>
  </Layout>
  <Footer />
  <QuickInput ref="quickInput" />
</template>

<script setup lang="ts">
import useKeyPress from '@hook/useKeyPress'

const quickInput = ref()

useKeyPress(['f1'], (event) => {
  event.preventDefault()
  quickInput.value.show()
})
new Promise((resolve, reject) => {
  const interval = setInterval(() => {
    if (window.monaco) {
      clearInterval(interval)
      resolve(true)
    }
  })
})
</script>

<style scoped lang="less">
* {
  user-select: none;
}
</style>
