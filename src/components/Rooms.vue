<template>
  <div class="rooms" v-if="signedIn">
    <div class="room-form">
      <input type="text" v-model="roomName" placeholder="ルーム名を入力してください" @keyup.enter="createRoom()">
      <button @click="createRoom()">ルームを作成</button>
    </div>
    <ul class="room-list">
      <li class="room-list__item room" v-for="room in roomsRef">
        <div class="room__name">{{ room.name }}</div>
        <div class="room__num" v-if="room.players">参加者： {{ Object.keys(room.players).length || 0 }} / 4人</div>
        <div class="room__num" v-if="!room.players">参加者： 0 / 4 人</div>
        <div class="room__created-at">{{ room.createdAt }}</div>
        <div class="room__join" @click="joinRoom(room)">参加する</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'rooms',
  computed: {
    ...mapState([
      'roomsRef',
      'user',
      'signedIn'
    ])
  },
  data () {
    return {
      roomName: null
    }
  },
  methods: {
    createRoom () {
      if (this.roomName) {
        this.$store.dispatch('createRoom', this.roomName)
        this.roomName = null
      } else {
        alert('ルーム名を入力してください')
      }
    },
    joinRoom (room) {
      try {
        // if (!room.players) throw new Error('このルームには参加できません')
        // if (room.players.length >= 4) throw new Error('ルームに空きがありません')

        this.$store.dispatch('joinRoom', room['.key'])
      } catch (e) {
        alert(e)
        console.log(e)
      }
    }
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .room-form {
    input {
      width: 200px;
    }
  }
  .room-list {
    list-style: none;
    width: 60%;
    margin: 30px auto;
    &__item {
      padding: 10px;
      border-bottom: solid 1px #ddd;
      transition: .3s;
      cursor: pointer;
      &:hover {
        opacity: .6;
      }
    }
  }
</style>
