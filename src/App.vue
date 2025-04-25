<template>
  <main>
    <RouterView v-slot="{Component}">
      <transition name="fade">
        <component :is="Component"></component>
      </transition>
    </RouterView>
  </main>
</template>

<style scoped>

</style>
