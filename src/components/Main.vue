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
</template>

<script lang="ts">
export default {
  name: 'Main',
  async setup() {
    let p = new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        if (window.monaco) {
          clearInterval(interval)
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
