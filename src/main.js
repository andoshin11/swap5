// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import VueFire from 'vuefire'
import Firebase from 'firebase'
import router from './router'
import store from './vuex/store'

Vue.use(Vuex)
Vue.use(VueFire)
Vue.config.productionTip = false

const config = {
  apiKey: 'AIzaSyCKGjC60tlhpTTQMk9iDtyey1DFOdzpD5k',
  authDomain: 'swap5-2d4fd.firebaseapp.com',
  databaseURL: 'https://swap5-2d4fd.firebaseio.com',
  storageBucket: 'swap5-2d4fd.appspot.com',
  messagingSenderId: '885439308126'
}

const app = Firebase.initializeApp(config)
const db = app.database()
console.log(db)

const cliendId = '885439308126-spqm1dfa8v5bf5r5s3phuvegd4t9nb1u.apps.googleusercontent.com'
const clientSecret = 'ue1tRvwLvyJe_0Z2Nzw9FNEX'
const secretKeyPass = 'notasecret'
const apiKey = 'AIzaSyBuj3vf3kzGbGLHl3Izy5u-NaoH2JY2UNs'
console.log(cliendId + clientSecret + secretKeyPass + apiKey)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
  beforeCreate () {
    console.log('beforeCreate')
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('setUser', user)
        this.$store.dispatch('setLoginStatus', true)
      } else {
        this.$store.dispatch('setLoginStatus', false)
      }
    })
  }
})
