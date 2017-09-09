<template>
  <div class="hello">
    <scores />
    <div class="header">
      <div class="header__player">{{ this.$store.getters.player.name }}の手番です</div>
      <div class="header__message" v-if="this.$store.state.step == 0">動かすチップを選択してください。</div>
      <div class="header__message" v-if="this.$store.state.step == 1">移動先を選んでください</div>
      <div class="header__message" v-if="this.$store.state.step == 2"></div>
      <div class="header__message" v-if="this.$store.state.step == 3">ゲームが終了しました</div>
    </div>
    <div class="board">
      <table class="grid">
        <tr>
          <td class="grid__cell"></td>
          <td class="grid__cell"></td>
          <td class="grid__cell"></td>
          <td class="grid__cell"></td>
        </tr>
        <tr>
          <td class="grid__cell"></td>
          <td class="grid__cell"></td>
          <td class="grid__cell"></td>
          <td class="grid__cell"></td>
        </tr>
        <tr>
          <td class="grid__cell"></td>
          <td class="grid__cell"></td>
          <td class="grid__cell"></td>
          <td class="grid__cell"></td>
        </tr>
        <tr>
          <td class="grid__cell"></td>
          <td class="grid__cell"></td>
          <td class="grid__cell"></td>
          <td class="grid__cell"></td>
        </tr>
      </table>
      <chip :chip="chip" v-for="chip in chips" :key="chip.id" />
    </div>
  </div>
</template>

<script>
import chip from './Chip.vue'
import scores from './Scores.vue'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'game',
  components: {
    chip,
    scores
  },
  computed: {
    ...mapState([
      'firstTarget',
      'secondTarget',
      'chips',
      'step'
    ]),
    ...mapGetters([
      'scores'
    ])
  },
  data () {
    return {
    }
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
//
// .blue {
//   background-color: blue;
// }

.board {
  margin: 50px auto;
  width: 600px;
  height: 600px;
  position: relative;
}

.grid {
  width: 100%;
  height: 100%;
  border-collapse: collapse;
  margin: auto;
  &__cell {
    border: solid 1px grey;
  }
}

</style>
