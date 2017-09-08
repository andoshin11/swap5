<template>
  <div class="hello">
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
export default {
  name: 'game',
  components: {
    chip
  },
  data () {
    return {
      chips: this.$store.state.chips
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
  margin: auto;
  width: 800px;
  height: 800px;
  position: relative;
}

.chip {
  width: 60px;
  height: 60px;
  border-radius: 50%;
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
