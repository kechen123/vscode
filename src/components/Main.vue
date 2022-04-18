<template>
  <Layout>
    <template #left>
      <LeftActivitybar />
      <Left />
    </template>
    <template #content>
      <Content />
    </template>
  </Layout>
</template>

<script setup lang="ts">
new Promise((resolve, reject) => {
  const interval = setInterval(() => {
    if (window.monaco) {
      clearInterval(interval)
      resolve(true)
    }
  })
})
</script>

<style scoped lang="less"></style>
