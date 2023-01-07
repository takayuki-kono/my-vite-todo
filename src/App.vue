<script setup>
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
import MainTodo from './components/MainTodo.vue'
</script>

<template>
  <div class="wrap">
    <TheHeader />
    <main class="main"><MainTodo /></main>
    <TheFooter />
  </div>
</template>

<style scoped></style>
