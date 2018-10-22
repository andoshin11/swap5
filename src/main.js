// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import VueFire from 'vuefire'
import Firebase from 'firebase'
// import Fb from './firebase/fb'
import router from './router'
import store from './vuex/store'

Vue.use(Vuex)
Vue.use(VueFire)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
  beforeCreate () {
    this.$store.dispatch('bindRefs')
    Firebase.auth().onAuthStateChanged(user => {
      console.log('beforeCreate')
      console.log(user.uid)
      if (user) {
        this.$store.dispatch('signIn', user)
      } else {
        this.$store.dispatch('signOut')
      }
    })
  }
})
