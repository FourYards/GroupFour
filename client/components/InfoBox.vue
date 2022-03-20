<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <p class="description">{{ msg }}</p>
</template>

<style scoped>
p {
  width: 100%;
  font-size: 1rem;
  text-align: center;
  border: 1px;
  border-style: solid;
  border-color: black;
  padding: 0.5em;
  margin-bottom: 10px;
}
</style>
