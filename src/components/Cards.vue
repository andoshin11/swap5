<template>
  <div class="cards" v-if="currentRoom">
    <div class="card" v-for="card in currentPlayerCards" @click="useCard(card)">{{ card.name }}</div>
    <div class="cards__header">{{ currentPlayer.isDummy ? 'ダミーユーザー' : getFbUser(currentPlayer).username }}のカード</div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'cards',
  computed: {
    ...mapState([
      'usersRef',
      'user'
    ]),
    ...mapGetters([
      'currentRoom',
      'currentPlayer',
      'currentPlayerCards'
    ]),
    isValidUser () {
      const turn = this.currentRoom.turn
      return turn === this.currentRoom.players[this.user.uid].playerNum
    }
  },
  data () {
    return {
    }
  },
  methods: {
    getUid (player) {
      return this.currentRoom ? Object.keys(this.currentRoom.players).find(x => this.currentRoom.players[x].playerNum === player.playerNum) : null
    },
    getFbUser (player) {
      const uid = this.getUid(player)
      return uid ? this.usersRef.find(x => x['.key'] === uid) : null
    },
    useCard (card) {
      if (!this.isValidUser) {
        alert('他のプレイヤーがプレイ中です')
        return
      }
      this.$store.dispatch('useCard', {
        roomId: this.currentRoom['.key'],
        uid: this.getUid(this.currentPlayer),
        card: card
      })
    }
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .card {
    display: inline-block;
    border: solid 1px grey;
    background-color: grey;
    text-align: center;
    line-height: 5;
    color: white;
    padding: 0 5px;
    transition: .3s;
    &:first-child {
      margin-right: 5px;
    }
    &:hover {
      cursor: pointer;
      opacity: .7;
    }
  }
  .cards {
    position: absolute;
    left: 20px;
    bottom: -30px;
    padding: 10px;
    border: solid 1px;
    &__header {
      margin: 5px auto;
    }
  }
</style>
