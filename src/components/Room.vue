<template>
  <div class="room">
    <players />
    <scores />
    <cards />
    <div class="header">
      <div class="header__room" v-if="currentRoom">{{ currentRoom.name }}</div>
      <div class="header__player" v-if="currentRoom && currentRoom.step !== 3">
        <span :style="{ color: currentPlayer.color }" style="font-weight:bold;">
          {{ currentPlayer.isDummy ? 'ダミーユーザー' : getFbUser(currentPlayer).username }}
        </span>
        の手番です
      </div>
      <button v-if="currentPlayer.isDummy" @click="playDummy()">次の手番へ</button>
      <div class="header__message" v-if="currentRoom && currentRoom.step == 0">動かすチップを選択してください。</div>
      <div class="header__message" v-if="currentRoom && currentRoom.step == 1">移動先を選んでください</div>
      <div class="header__message" v-if="currentRoom && currentRoom.step == 2"></div>
      <div class="header__message" v-if="currentRoom && currentRoom.step == 3">
        ゲームが終了しました
        <ul class="winner-list">
          <li class="winner-list__item" v-for="winner in Object.keys(currentRoom.winners)" :style="{ color: currentRoom.players[winner].color }">{{ getFbUserById(winner).username }}</li>
        </ul>
        の勝利です
      </div>
      <button class="header__reset" @click="reset()">ゲームをリセット</button>
    </div>
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
      <chip :chip="chip" v-for="chip in currentChips" :key="chip.id" v-if="currentRoom"/> -->
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
      'step',
      'user',
      'roomsRef',
      'usersRef',
      'signedIn'
    ]),
    ...mapGetters([
      'scores',
      'player',
      'currentRoom',
      'currentPlayer',
      'currentChips',
      'fbUser'
    ]),
    fbUserInfo () {
      return this.currentPlayer ? this.usersRef.find(x => x['.key'] === this.user.uid) : null
    }
  },
  data () {
    return {
    }
  },
  methods: {
    getUid (player) {
      return Object.keys(this.currentRoom.players).find(x => this.currentRoom.players[x].playerNum === player.playerNum)
    },
    getFbUser (player) {
      const uid = this.getUid(player)
      return uid ? this.usersRef.find(x => x['.key'] === uid) : null
    },
    getFbUserById (uid) {
      return uid ? this.usersRef.find(x => x['.key'] === uid) : null
    },
    reset () {
      const roomId = this.currentRoom['.key']
      this.$store.dispatch('resetGame', roomId)
    },
    playDummy () {
      const roomId = this.currentRoom['.key']
      this.$store.dispatch('playDummy', roomId)
    }
  },
  watch: {
    scores () {
      const winners = Object.keys(this.scores).filter(x => this.scores[x] >= 5)
      if (winners && winners.length) {
        console.log('calling endGame')
        this.$store.dispatch('endGame', { roomId: this.currentRoom['.key'], scores: this.scores })
      }
    }
  },
  mounted () {
    // if (!this.signedIn) {
    //   alert('ログインしてください')
    //   window.location.href = '/#/'
    // }
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

.room {
  padding-top: 50px;
}

</style>
