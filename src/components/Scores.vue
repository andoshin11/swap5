<template>
  <div class="scores">
    <div v-for="color in colors" :style="{ color: color }">{{ color }}: {{ scores[color] }}point</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'scores',
  computed: {
    ...mapGetters([
      'colors',
      'scores'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .scores {
    position: absolute;
    right: 20px;
    top: 20px;
    padding: 10px;
    border: solid 1px;
    position: fixed;
  }
</style>
