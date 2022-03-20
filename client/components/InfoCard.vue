<script setup></script>

<template>
  <div class="infoCard"></div>
</template>

<style scoped>
.infoCard {
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
  height: var(--height);
  width: var(--width);
  padding: 30px;
  color: black;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;
}

:hover.infoCard {
  transform: scale(1.02);
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}
</style>
