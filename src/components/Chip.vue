<template>
      <div class="chip" :class="{myChip: isMyChip }" style="position:absolute;" :style="{ top: top, left: left, backgroundColor: chip.color }" @click="addTarget"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
      return (((this.chip.row - 1) * 200) + -30) + 'px'
    },
    left () {
      return (((this.chip.column - 1) * 200) + -30) + 'px'
    },
    isMyChip () {
      return this.$store.state.step === 0 && this.$store.getters.player.color === this.chip.color
    },
    ...mapState([
      'firstTarget',
      'secondTarget',
      'chips'
    ])
  },
  data () {
    return {
    }
  },
  methods: {
    addTarget () {
      this.$store.dispatch('addTarget', this.chip)
    }
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
    transition: .3s;
    cursor: pointer;
    &:hover{
      box-shadow:5px 5px 10px;
    }
  }
</style>
