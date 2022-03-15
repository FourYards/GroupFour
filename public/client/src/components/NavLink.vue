<script setup>
import { RouterLink, RouterView } from 'vue-router';
defineProps({
  props: {
    to: String,
    label: String,
  },
});
</script>

<template>
  <li><RouterLink class="link"  to="/{{to}}">{{ label }}</RouterLink></li>
</template>

<style scoped>
  .link{
    color: #fff;
  }
</style>
