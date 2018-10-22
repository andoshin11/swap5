<template>
  <div class="header">
    <a class="header__logo" href="/">SWAP 5</a>
    <a href="/#/" class="header__link">トップ</a>
    <a href="/#/room" class="header__link">ルーム</a>
    <div class="header__nav nav">
      <button @click="signInWithTwitter" v-if="!signedIn">Twitterでログイン</button>
      <button @click="signOutFromTwitter" v-if="signedIn">ログアウト</button>
    </div>
  </div>
</template>

<script>
import signIn from '@/utils/sign_in'
import { mapState } from 'vuex'

export default {
  name: 'game',
  extends: signIn,
  components: {
  },
  computed: {
    ...mapState([
      'user',
      'signedIn'
    ])
  },
  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
  .header {
    height: 40px;
    width: 100%;
    line-height: 40px;
    -webkit-box-shadow: 0 0 10px;
    box-shadow: 0 0 10px;
    position: fixed;
    background-color: #fff;
    z-index: 100;
    &__logo {
      display: inline-block;
      float: left;
      width: 20%;
      text-align: center;
      font-weight: bold;
      color: #666;
      text-decoration: none;
    }
    &__nav {
      display: inline-block;
      width: 20%;
      float: right;
    }
    &__link {
      color: #666;
      text-decoration: none;
      padding: 0 20px;
      transition: .3s;
      &:hover {
        opacity: .7;
        text-decoration: underline;
      }
    }
  }
</style>
