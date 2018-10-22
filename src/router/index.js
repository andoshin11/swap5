import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Welcome from '@/components/Welcome'
import Room from '@/components/Room'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/game',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/room',
      name: 'Room',
      component: Room
    }
  ]
})
