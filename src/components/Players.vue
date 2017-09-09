<template>
  <div class="players">
    <div v-for="(player, index) in players" :style="{ color: player.color }">{{ index + 1 }}: {{ player.name }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'scores',
  computed: {
    ...mapState([
      'players'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .players {
    position: absolute;
    left: 20px;
    top: 20px;
    padding: 10px;
    border: solid 1px;
    position: fixed;
  }
</style>
