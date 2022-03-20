<script setup>
import NavLink from './NavLink.vue';
</script>

<template>
  <nav>
    <div class="container">
      <img src="../assets/logo.svg" alt="logo" class="logo" />
      <h1 class="webTitle">FourYards</h1>
      <ul>
        <NavLink to="about" label="About" />
        <li>World</li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
nav {
  background: black;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
}

.container {
  display: flex;
  justify-content: space-between;
  height: 80px;
  z-index: 1;
  width: 100%;
  padding: 0 24px;
  max-width: 1100px;
}

ul {
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  margin-right: -22px;
  width: 100%;
  overflow: hidden;
}

li {
  color: #fff;
  padding: 50px;
  font-size: 2rem;
}

li:hover {
  background-color: #41b883;
}

.webTitle {
  color: #fff;
  font-size: 3rem;
  padding-right: 150px;
}

.logo {
  max-height: 70px;
  max-width: 70px;
  padding-top: 10px;
}
</style>
