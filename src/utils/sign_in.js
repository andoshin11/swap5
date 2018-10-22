import Firebase from 'firebase'
import { mapState } from 'vuex'
import Fb from '@/firebase/fb'
export default {
  computed: {
    ...mapState([
      'user',
      'usersRef'
    ])
  },
  methods: {
    signInWithTwitter () {
      const provider = new Firebase.auth.TwitterAuthProvider()
      Firebase.auth().signInWithPopup(provider).then(result => {
        const token = result.credential.accessToken
        const secret = result.credential.secret
        const user = result.user
        this.$store.dispatch('setTwitterCredential', {token: token, secret: secret})

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
    signOutFromTwitter () {
      Firebase.auth().signOut().then(() => {
        this.$store.dispatch('signOut')
      }).catch(err => console.log(err))
    }
  }
}
