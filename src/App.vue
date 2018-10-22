<template>
  <div id="app">
    <headerComponent />
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import headerComponent from '@/components/Header.vue'
export default {
  name: 'app',
  components: {
    headerComponent
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
body {
  margin: 0;
}
main {
  position: relative;
  top: 40px;
}
</style>
