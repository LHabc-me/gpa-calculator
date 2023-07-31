<template>
  <VThemeProvider :theme="theme.name">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </VThemeProvider>
</template>

<script setup>
import { useTheme } from './store/modules/theme'

const theme = useTheme()
</script>

<style lang="scss"></style>
