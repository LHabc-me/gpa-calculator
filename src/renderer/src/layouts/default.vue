<template>
  <VApp>
    <VAppBar :flat="true" density="compact">
      <div class="position-absolute" style="left: 180px">
        {{ $route.meta.title }}
      </div>
      <template #prepend>
        <div style="width: 160px; margin-top: 8px">
          <div class="text-center">
            {{ `${time.getHours()}:${time.getMinutes()}` }}
          </div>
          <div class="text-center">
            {{ `${time.getFullYear()}/${time.getMonth() + 1}/${time.getDate()}` }}
          </div>
        </div>
      </template>
    </VAppBar>
    <VNavigationDrawer :floating="true" :permanent="true" :width="180" class="elevation-3">
      <VList :mandatory="true">
        <VListItem
          v-for="(item, index) in menu"
          :key="index"
          :value="index"
          :active="$route.path === item.to"
          color="primary"
          variant="flat"
          height="60"
          :ripple="false"
          :style="{ opacity: $route.path === item.to ? 1 : 0.8 }"
          @click="$router.push(item.to)"
        >
          <!--          <template #prepend>-->
          <!--            <VIcon :icon="item.icon"></VIcon>-->
          <!--          </template>-->
          <template #title>
            <div class="text-center" style="font-size: large">{{ item.title }}</div>
          </template>
        </VListItem>
      </VList>
    </VNavigationDrawer>

    <VMain>
      <RouterView v-slot="{ Component }">
        <KeepAlive>
          <component :is="Component" />
        </KeepAlive>
      </RouterView>
    </VMain>
  </VApp>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const menu = [
  {
    icon: 'mdi-view-dashboard',
    title: '首页',
    to: '/'
  },
  {
    icon: 'mdi-view-dashboard',
    title: '计算器',
    to: '/calculator'
  },
  {
    icon: 'mdi-forum',
    title: '规则',
    to: '/rules'
  },
  {
    icon: 'mdi-account',
    title: '设置',
    to: '/settings'
  }
]

const time = ref(new Date())
let timer = null
onMounted(() => {
  timer = setInterval(() => {
    time.value = new Date()
  }, 1)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>
