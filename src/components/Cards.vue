<template>
  <div class="cards">
    <div class="card" v-for="card in cards[player.id]" @click="useCard(card)">{{ card.name }}</div>
    <div class="cards__header">{{ player.name }}のカード</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'cards',
  computed: {
    ...mapGetters([
      'player',
      'cards'
    ])
  },
  data () {
    return {
    }
  },
  methods: {
    useCard (card) {
      this.$store.dispatch('useCard', {
        playerId: this.player.id,
        cardId: card.id,
        firstRow: card.firstRow,
        secondRow: card.secondRow,
        firstColumn: card.firstColumn,
        secondColumn: card.secondColumn
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
    bottom: 20px;
    padding: 10px;
    border: solid 1px;
    position: fixed;
    &__header {
      margin: 5px auto;
    }
  }
</style>
