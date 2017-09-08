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
      <chip :chip="chip" v-for="chip in chips"/>
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
      chips: [
        {
          color: 'blue',
          row: 1,
          column: 1
        },
        {
          color: 'red',
          row: 1,
          column: 2
        },
        {
          color: 'green',
          row: 1,
          column: 3
        },
        {
          color: 'yellow',
          row: 1,
          column: 4
        },
        {
          color: 'transparent',
          row: 1,
          column: 5
        },
        {
          color: 'yellow',
          row: 2,
          column: 1
        },
        {
          color: 'transparent',
          row: 2,
          column: 2
        },
        {
          color: 'blue',
          row: 2,
          column: 3
        },
        {
          color: 'red',
          row: 2,
          column: 4
        },
        {
          color: 'green',
          row: 2,
          column: 5
        },
        {
          color: 'green',
          row: 3,
          column: 1
        },
        {
          color: 'yellow',
          row: 3,
          column: 2
        },
        {
          color: 'transparent',
          row: 3,
          column: 3
        },
        {
          color: 'blue',
          row: 3,
          column: 4
        },
        {
          color: 'red',
          row: 3,
          column: 5
        },
        {
          color: 'transparent',
          row: 4,
          column: 1
        },
        {
          color: 'blue',
          row: 4,
          column: 2
        },
        {
          color: 'red',
          row: 4,
          column: 3
        },
        {
          color: 'green',
          row: 4,
          column: 4
        },
        {
          color: 'yellow',
          row: 4,
          column: 5
        },
        {
          color: 'red',
          row: 5,
          column: 1
        },
        {
          color: 'green',
          row: 5,
          column: 2
        },
        {
          color: 'yellow',
          row: 5,
          column: 3
        },
        {
          color: 'transparent',
          row: 5,
          column: 4
        },
        {
          color: 'blue',
          row: 5,
          column: 5
        }
      ]
    }
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
