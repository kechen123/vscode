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

<script lang="ts">
import useKeyPress from '@hook/useKeyPress'

export default {
  name: 'Main',
  async setup() {
    const quickInput = ref()
    useKeyPress(['f1'], (event) => {
      event.preventDefault()
      quickInput.value.show()
    })
    let p = new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        if (window.monaco && window.prettier) {
          clearInterval(interval)
          console.log(1)
          resolve(true)
        }
      })
    })
    return p
  }
}
</script>

<style scoped lang="less">
* {
  user-select: none;
}
</style>
