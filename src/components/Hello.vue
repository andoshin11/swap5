<template>
  <div class="hello">
    <players />
    <scores />
    <cards />
    <div class="header">
      <div class="header__player"><span :style="{ color: player.color }" style="font-weight:bold;">{{ player.name }}</span>の手番です</div>
      <div class="header__message" v-if="this.$store.state.step == 0">動かすチップを選択してください。</div>
      <div class="header__message" v-if="this.$store.state.step == 1">移動先を選んでください</div>
      <div class="header__message" v-if="this.$store.state.step == 2"></div>
      <div class="header__message" v-if="this.$store.state.step == 3">ゲームが終了しました</div>
    </div>
    <button type="button" name="button" @click="addUser()">push</button>
    <div class="board">
      <div class="board-labels board-labels_on_top">
        <div class="board-labels__item">1</div>
        <div class="board-labels__item">2</div>
        <div class="board-labels__item">3</div>
        <div class="board-labels__item">4</div>
        <div class="board-labels__item">5</div>
      </div>
      <div class="board-labels board-labels_on_left">
        <div class="board-labels__item">A</div>
        <div class="board-labels__item">B</div>
        <div class="board-labels__item">C</div>
        <div class="board-labels__item">D</div>
        <div class="board-labels__item">E</div>
      </div>
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
import cards from './Cards.vue'
import chip from './Chip.vue'
import scores from './Scores.vue'
import players from './Players.vue'
// import Firebase from 'firebase'
import { mapState, mapGetters } from 'vuex'
//
// let config = {
//   apiKey: 'AIzaSyCKGjC60tlhpTTQMk9iDtyey1DFOdzpD5k',
//   authDomain: 'swap5-2d4fd.firebaseapp.com',
//   databaseURL: 'https://swap5-2d4fd.firebaseio.com',
//   storageBucket: 'swap5-2d4fd.appspot.com',
//   messagingSenderId: '885439308126'
// }
//
// let app = Firebase.initializeApp(config)
// let db = app.database()
//
// let usersRef = db.ref('users')

export default {
  name: 'game',
  components: {
    cards,
    chip,
    scores,
    players
  },
  computed: {
    ...mapState([
      'firstTarget',
      'secondTarget',
      'chips',
      'step'
    ]),
    ...mapGetters([
      'scores',
      'player'
    ])
  },
  data () {
    return {
    }
  },
  firebase: {
    // users: usersRef
  },
  methods: {
    addUser () {
      // usersRef.push({
      //   name: 'Masaki Ando',
      //   username: 'masaki0819'
      // })
      // const address = this.users.length - 1
      // usersRef.child(this.users[address]['.key']).remove()
    }
  },
  mounted () {
    console.log('testing VueFire')
    // console.log(this.users)
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

.board {
  margin: 100px auto;
  width: 600px;
  height: 600px;
  position: relative;
}

.board-labels {
  position: absolute;
  box-sizing: border-box;
  &__item {
    box-sizing: border-box;
  }
  &_on_top {
    width: 125%;
    left: -0.5rem;
    top: -70px;
    .board-labels__item {
      display: inline-block;
      float: left;
      width: 20%;
      text-align: left;
    }
  }
  &_on_left {
    left: -70px;
    top: -0.5rem;
    height: 125%;
    .board-labels__item {
      height: 20%;

    }
  }
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
