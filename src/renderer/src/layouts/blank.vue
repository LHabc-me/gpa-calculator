<template>
  <VApp>
    <VMain>
      <RouterView v-slot="{ Component }">
        <KeepAlive>
          <component :is="Component" />
        </KeepAlive>
      </RouterView>
    </VMain>
  </VApp>
</template>
<script setup></script>
