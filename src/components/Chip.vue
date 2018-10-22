<template>
      <div class="chip" :class="{myChip: isMyChip, targetChip: isTargetChip, isTransparent: chip.color === 'transparent' }" style="position:absolute;" :style="{ top: top, left: left, backgroundColor: chip.color }" @click="addTarget"></div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  props: {
    chip: {
      type: Object,
      required: true
    }
  },
  name: 'chip',
  computed: {
    top () {
      return (((this.chip.row - 1) * 150) + -30) + 'px'
    },
    left () {
      return (((this.chip.column - 1) * 150) + -30) + 'px'
    },
    isMyChip () {
      return this.currentPlayer.color === this.chip.color
    },
    isTargetChip () {
      const step = this.currentRoom.step
      if (step === 0) {
        return this.isMyChip
      } else if (step === 1) {
        const firstTarget = this.currentRoom.firstTarget
        return Math.pow((this.chip.row - firstTarget.row), 2) + Math.pow((this.chip.column - firstTarget.column), 2) === 1
      } else {
        return false
      }
    },
    ...mapState([
      'user'
    ]),
    ...mapGetters([
      'currentRoom',
      'currentPlayer'
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
    addTarget () {
      if (!this.isValidUser) {
        alert('他のプレイヤーがプレイ中です')
        return
      }

      if (Object.keys(this.currentRoom.players).length !== 4) {
        alert('人数が足りません')
      } else {
        if (this.isTargetChip) this.$store.dispatch('addTarget', this.chip)
      }
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
  .chip {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    transition: .3s;
    cursor: not-allowed;
    &:hover {
    }
  }

  .myChip {
    // transition: .3s;
    // cursor: pointer;
    // &:hover{
    //   box-shadow:5px 5px 10px;
    // }
  }

  .targetChip {
    transition: .3s;
    cursor: pointer;
    &:hover{
      box-shadow:5px 5px 10px;
    }
    &.isTransparent:hover{
      box-shadow: none;
    }
  }
</style>
