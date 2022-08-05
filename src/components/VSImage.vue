<template>
  <div class="image-preview">
    <el-image :src="url" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  file?: any
  url?: string
}>()
const url = ref('')
const init = () => {
  console.log('image--------', props);
  if (props.file) {
    var reader = new FileReader()
    reader.readAsDataURL(props.file)
    reader.onloadend = function () {
      if (reader.result) {
        url.value = reader.result.toString()
      }
    }
  } else if (props.url) {
    console.log(props.url)
    url.value = props.url
  }
}

watch(
  [() => props.file, () => props.url],
  (newValue, oldValue) => {
    init()
  },
  {
    immediate: true
  }
)
</script>

<style scoped lang="less">
.image-preview {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .el-image {
    background-image: linear-gradient(45deg,
        rgb(20, 20, 20) 25%,
        transparent 25%,
        transparent 75%,
        rgb(20, 20, 20) 75%,
        rgb(20, 20, 20)),
      linear-gradient(45deg,
        rgb(20, 20, 20) 25%,
        transparent 25%,
        transparent 75%,
        rgb(20, 20, 20) 75%,
        rgb(20, 20, 20));
    background-position: 0 0, 8px 8px;
    background-size: 16px 16px;
    zoom: 1.5;
  }
}
</style>
