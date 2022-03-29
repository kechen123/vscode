<template>
  <el-menu class="el-menu-vertical-demo" :router="true" :default-active="active">
    <el-menu-item
      v-for="(nav, index) in navList"
      :key="index"
      :index="nav.path"
      @click="navClick(nav, index)"
    >
      <span>{{ nav.name }}</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, watch } from 'vue'
import { Location, Document, Menu as IconMenu, Setting } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { NavItem } from '../common/types'

export default defineComponent({
  name: 'Nav',
  setup() {
    const router = useRouter()
    const reactiveData = reactive({
      navList: [

        {
          name: 'Home',
          path: '/'
        },
        {
          name: 'Pinia',
          path: '/pinia'
        },
        {
          name: 'Axios',
          path: '/axios'
        },
        {
          name: 'Test',
          path: '/test'
        }
      ],
      active: '/'
    })
    const navClick = (e: NavItem, i: number) => {
      reactiveData.active = e.path
    }
    const changeNavActive = (currentPath: string) => {
      reactiveData.navList.forEach((v: NavItem, i: number) => {
        const temp = v
        if (temp.path === currentPath) {
          reactiveData.active = currentPath
        }
      })
    }

    watch(
      () => router.currentRoute.value,
      (_n) => {
        changeNavActive(_n.path)
      }
    )

    onMounted(() => {
      router.isReady().then(() => {
        changeNavActive(router.currentRoute.value.path)
      })
    })

    return {
      ...toRefs(reactiveData),
      navClick
    }
  }
})
</script>
