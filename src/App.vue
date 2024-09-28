<template>
  <HelloWorld/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: "Montserrat", sans-serif;
  /* font-family: "Lato", sans-serif; */
  font-weight: 400;
  font-style: normal;
  font-optical-sizing: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
}
</style>
