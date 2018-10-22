<template>
  <div class="welcome">
    <div class="welcome__status" v-if="!signedIn">オンラインモードで遊ぶにはログインが必要です</div>
    <div class="welcome__nav nav">
      <!-- <div class="nav__link" @click="signInWithGoogle" v-if="!signedIn">Googleでログイン</div> -->
      <!-- <a class="nav__link" v-if="signedIn" href="/#/profile">プロフィール</a> -->
      <!-- <div class="nav__link">オフラインモード</div> -->
    </div>
    <rooms />
  </div>
</template>

<script>
import Firebase from 'firebase'
import Fb from '@/firebase/fb'
import rooms from './Rooms.vue'
import { mapState } from 'vuex'

export default {
  name: 'welcomw',
  components: {
    rooms
  },
  computed: {
    ...mapState([
      'signedIn',
      'user',
      'usersRef'
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
    signInWithGoogle () {
      const provider = new Firebase.auth.GoogleAuthProvider()
      Firebase.auth().signInWithPopup(provider).then(result => {
        const user = result.user

        if (user) {
          // check existing user
          Fb.state.usersRef.child(user.uid).once('value').then(snapshot => {
            if (snapshot.val()) {
              this.$store.dispatch('signIn', user)
            } else {
              this.$store.dispatch('registerUser', user)
            }
          })
        } else {
          this.$store.dispatch('signOut')
        }
      }).catch(err => console.log(err))
    },
    updateUsername () {
      this.$store.dispatch('changeUsername')
        // usersRef.push({
        //   name: 'Masaki Ando',
        //   username: 'masaki0819'
        // })
    },
    createRoom () {
      this.$store.dispatch('createRoom')
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
  .nav {
    &__link {
      display: block;
      transition: .3s;
      text-decoration: underline;
      cursor: pointer;
      &:hover {
        opacity: .7;
      }
    }
  }
  .welcome {
    padding-top: 50px;
  }
  .profile {
    &__photo {
      display: block;
      margin-left: auto;
      width: 200px;
      height: 200px;
      border-radius: 50%;
    }
  }
</style>
