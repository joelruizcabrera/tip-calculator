<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div
      class="header--container"
      style="
        position: fixed;
        width: 100vw;
        background: #fff;
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
        box-shadow: 0 5px #ddd;
        z-index: 999;
      "
  >
    <h1 style="
      font-weight: bolder;
      font-size: 1.6rem;
      text-align: center;
      height: 3.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
    ">
      TIP CALCULCATOR
    </h1>
  </div>
  <RouterView />
</template>

<style scoped>

</style>
