<template>
      <div class="chip blue" style="position:absolute;" :style="{ top: top, left: left, backgroundColor: chip.color }"></div>
    </div>
  </div>
</template>

<script>
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
    }
  },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
