<template>
  <div class="header">
    <div class="logo"></div>
    <div class="menubar">
      <div
        v-for="(item, key) in btns"
        key="item.id"
        :class="['menubar-menu-button', `${item.id === contextMenu.id ? 'active' : ''}`]"
        @click.stop="btnClick(item, $event)"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
  <ContextMenu
    :name="contextMenu.name"
    :rect="contextMenu.rect"
    :menu="contextMenu.menu"
    @click="contextMenuClick"
    @onClose="onClose"
  />
</template>

<script lang="ts" setup>
import {
  fileContextMenu,
  editContextMenu,
  selectContextMenu,
  viewContextMenu,
  goContextMenu,
  terminalsContextMenu,
  helpContextMenu
} from '@config/contextmenu'
const btns = [
  {
    id: 1,
    label: '文件(F)'
  },
  {
    id: 2,
    label: '编辑(E)'
  },
  {
    id: 3,
    label: '选择(S)'
  },
  {
    id: 4,
    label: '查看(V)'
  },
  {
    id: 5,
    label: '转到(G)'
  },
  {
    id: 6,
    label: '运行(R)'
  },
  {
    id: 7,
    label: '帮助(H)'
  }
]
const btnList = [
  {
    id: 1,
    list: fileContextMenu
  },
  {
    id: 2,
    list: editContextMenu
  },
  {
    id: 3,
    list: selectContextMenu
  },
  {
    id: 4,
    list: viewContextMenu
  },
  {
    id: 5,
    list: goContextMenu
  },
  {
    id: 6,
    list: terminalsContextMenu
  },
  {
    id: 7,
    list: helpContextMenu
  }
]
const contextMenu = ref({
  id: 0,
  name: '',
  rect: { x: 0, y: 0 },
  menu: fileContextMenu
})
const btnClick = (item: any, event: Event) => {
  console.log(event)
  const el = event.target as HTMLElement
  const { height, left } = el?.getBoundingClientRect()
  contextMenu.value = {
    id: item.id,
    name: item.label,
    rect: { x: left, y: height },
    menu: btnList[item.id - 1].list
  }
}
const onClose = () => {
  contextMenu.value.id = 0
}
const contextMenuClick = (e: any) => {
  console.log(e)
}
</script>

<style scoped lang="less">
.header {
  font-size: 13px;
  width: 100%;
  height: 30px;
  min-height: 30px;
  background: #333;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0;
  height: 30px;
  line-height: 30px;
  justify-content: left;
  overflow: visible;

  .logo {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='256' height='256' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cmask id='a' maskUnits='userSpaceOnUse' x='0' y='0' width='256' height='256'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M181.534 254.252a15.934 15.934 0 0012.7-.488l52.706-25.361a16.002 16.002 0 009.06-14.42V42.018c0-6.15-3.522-11.754-9.06-14.42L194.234 2.238a15.939 15.939 0 00-18.185 3.097l-100.9 92.052-43.95-33.361a10.655 10.655 0 00-13.614.605L3.49 77.453c-4.648 4.227-4.653 11.54-.011 15.774L41.593 128 3.478 162.773c-4.642 4.235-4.637 11.547.011 15.775l14.097 12.822a10.655 10.655 0 0013.613.606l43.95-33.362 100.9 92.053a15.915 15.915 0 005.485 3.585zm10.505-184.367L115.479 128l76.56 58.115V69.885z' fill='%23fff'/%3E%3C/mask%3E%3Cg mask='url(%23a)'%3E%3Cpath d='M246.94 27.638L194.193 2.241a15.947 15.947 0 00-18.194 3.092L3.324 162.773c-4.645 4.235-4.64 11.547.011 15.775L17.44 191.37a10.667 10.667 0 0013.622.606l207.941-157.75c6.976-5.291 16.996-.316 16.996 8.44v-.612a16 16 0 00-9.059-14.416z' fill='%230065A9'/%3E%3Cg filter='url(%23filter0_d)'%3E%3Cpath d='M246.94 228.362l-52.747 25.397a15.95 15.95 0 01-18.194-3.092L3.324 93.227c-4.645-4.234-4.64-11.547.011-15.775L17.44 64.63a10.667 10.667 0 0113.622-.605l207.941 157.748c6.976 5.292 16.996.317 16.996-8.44v.613a16.001 16.001 0 01-9.059 14.416z' fill='%23007ACC'/%3E%3C/g%3E%3Cg filter='url(%23filter1_d)'%3E%3Cpath d='M194.196 253.763A15.955 15.955 0 01176 250.667c5.904 5.904 16 1.722 16-6.628V11.961c0-8.35-10.096-12.532-16-6.628a15.955 15.955 0 0118.196-3.097L246.934 27.6A16 16 0 01256 42.017v171.965a16 16 0 01-9.066 14.419l-52.738 25.361z' fill='%231F9CF0'/%3E%3C/g%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M181.378 254.252a15.936 15.936 0 0012.699-.488l52.706-25.362a16 16 0 009.061-14.419V42.018c0-6.15-3.522-11.754-9.06-14.42L194.077 2.238a15.939 15.939 0 00-18.185 3.096l-100.9 92.053-43.95-33.361a10.655 10.655 0 00-13.613.605L3.333 77.452c-4.648 4.228-4.653 11.54-.011 15.775L41.436 128 3.322 162.773c-4.642 4.235-4.637 11.547.011 15.775L17.43 191.37a10.655 10.655 0 0013.614.606l43.95-33.362 100.899 92.053a15.919 15.919 0 005.486 3.585zm10.505-184.367L115.323 128l76.56 58.115V69.885z' fill='url(%23paint0_linear)' opacity='.25'/%3E%3C/g%3E%3Cdefs%3E%3Cfilter id='filter0_d' x='-21.49' y='40.523' width='298.822' height='236.149' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeColorMatrix in='SourceAlpha' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'/%3E%3CfeOffset/%3E%3CfeGaussianBlur stdDeviation='10.667'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'/%3E%3CfeBlend mode='overlay' in2='BackgroundImageFix' result='effect1_dropShadow'/%3E%3CfeBlend in='SourceGraphic' in2='effect1_dropShadow' result='shape'/%3E%3C/filter%3E%3Cfilter id='filter1_d' x='154.667' y='-20.674' width='122.667' height='297.347' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeColorMatrix in='SourceAlpha' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'/%3E%3CfeOffset/%3E%3CfeGaussianBlur stdDeviation='10.667'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'/%3E%3CfeBlend mode='overlay' in2='BackgroundImageFix' result='effect1_dropShadow'/%3E%3CfeBlend in='SourceGraphic' in2='effect1_dropShadow' result='shape'/%3E%3C/filter%3E%3ClinearGradient id='paint0_linear' x1='127.844' y1='.66' x2='127.844' y2='255.34' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23fff'/%3E%3Cstop offset='1' stop-color='%23fff' stop-opacity='0'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 16px;
    width: 35px;
    height: 100%;
  }

  .menubar {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 1;
    box-sizing: border-box;
    height: 30px;
    overflow: hidden;
    flex-wrap: wrap;
    .menubar-menu-button {
      color: #cccccc;
      align-items: center;
      box-sizing: border-box;
      padding: 0 8px;
      cursor: default;
      -webkit-app-region: no-drag;
      zoom: 1;
      white-space: nowrap;
      outline: 0;
    }
    .active {
      background-color: rgba(255, 255, 255, 0.1);
    }
    .menubar-menu-button:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
}
</style>
