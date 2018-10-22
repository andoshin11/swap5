<template>
  <div class="players">
    <div v-for="(uid, index) in playersList" :style="{ color: player(uid).color }">{{ player(uid).playerNum + 1 }}: {{ isDummyUser(uid) ? 'ダミーユーザー' : FbUser(uid).username }}</div>
    <button v-if="Object.keys(currentRoom.players).length < 4" @click="createDummyUser()">ダミーユーザーを追加</button>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'scores',
  computed: {
    ...mapState([
      'usersRef'
    ]),
    ...mapGetters([
      'currentRoom'
    ]),
    FbUsers () {
      return this.currentRoom ? Object.keys(this.currentRoom.players).map(x => this.usersRef.find(u => u['.key'] === x)) : []
    },
    playersList () {
      if (!this.currentRoom) return []
      return Object.keys(this.currentRoom.players).sort((a, b) => {
        const A = this.currentRoom.players[a]
        const B = this.currentRoom.players[b]
        if (A.playerNum === B.playerNum) return 0
        return A.playerNum > B.playerNum ? 1 : -1
      })
    }
  },
  methods: {
    isDummyUser (uid) {
      return this.currentRoom.players[uid].isDummy
    },
    FbUser (uid) {
      return uid ? this.usersRef.find(x => x['.key'] === uid) : null
    },
    player (uid) {
      return this.currentRoom ? this.currentRoom.players[uid] : null
    },
    createDummyUser () {
      const roomId = this.currentRoom['.key']
      this.$store.dispatch('createDummyUser', roomId)
    }
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
  }
</style>
