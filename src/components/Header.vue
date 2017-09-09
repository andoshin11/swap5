<template>
  <div class="header">
    <div class="header__logo">Swap 5 {{ signedIn }}</div>
    <!-- <div class="header__user">{{ user.displayName }}</div> -->
    <div class="header__nav nav">
      <button @click="signInWithTwitter" v-if="!signedIn">Sign in</button>
      <button @click="signOutFromTwitter" v-if="signedIn">Sign out</button>
    </div>
  </div>
</template>

<script>
import Firebase from 'firebase'
import { mapState } from 'vuex'

export default {
  name: 'game',
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
    signInWithTwitter () {
      const provider = new Firebase.auth.TwitterAuthProvider()
      Firebase.auth().signInWithPopup(provider).then(result => {
        const token = result.credential.accessToken
        const secret = result.credential.secret
        const user = result.user
        const loginStatus = user !== null && user !== undefined
        this.$store.dispatch('setTwitterCredential', {token: token, secret: secret})
        this.$store.dispatch('setUser', user)
        this.$store.dispatch('setLoginStatus', loginStatus)
      }).catch(err => console.log(err))
    },
    signOutFromTwitter () {
      Firebase.auth().signOut().then(() => {
        this.$store.dispatch('removeUser')
      }).catch(err => console.log(err))
    }
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
    }
    &__nav {
      display: inline-block;
      width: 20%;
      float: right;
    }
  }
</style>
