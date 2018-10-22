import Firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyCKGjC60tlhpTTQMk9iDtyey1DFOdzpD5k',
  authDomain: 'swap5-2d4fd.firebaseapp.com',
  databaseURL: 'https://swap5-2d4fd.firebaseio.com',
  storageBucket: 'swap5-2d4fd.appspot.com',
  messagingSenderId: '885439308126'
}

const app = Firebase.initializeApp(config)
const db = app.database()

const cliendId = '885439308126-spqm1dfa8v5bf5r5s3phuvegd4t9nb1u.apps.googleusercontent.com'
const clientSecret = 'ue1tRvwLvyJe_0Z2Nzw9FNEX'
const secretKeyPass = 'notasecret'
const apiKey = 'AIzaSyBuj3vf3kzGbGLHl3Izy5u-NaoH2JY2UNs'
console.log(cliendId + clientSecret + secretKeyPass + apiKey)
//
// const state = {
//   usersRef: db.ref('users'),
//   seedsRef: db.ref('seeds'),
//   roomsRef: db.ref('rooms')
// }
class Fb {
  constructor () {
    console.log('constructed')
  }

  // state
  get state () {
    return state
  }

  // getters
  get getters () {
    return getters
  }

  // actions
  get dispatch () {
    return actions
  }

  set (ref, obj) {
    return ref.set(obj)
  }

  update (ref, obj) {
    // return ref.update(obj)
  }

  push (ref, obj) {
    return ref.push(obj)
  }
}

const state = {
  usersRef: db.ref('users'),
  seedsRef: db.ref('seeds'),
  roomsRef: db.ref('rooms')
}

const actions = {
  update (ref, obj, callback) {
    return ref.update(obj, callback)
  },
  push (ref, obj) {
    return ref.push(obj)
  },
  set (ref, obj) {
    return ref.set(obj)
  }
}

const getters = {
  currentRoom (uid) {
    return state.roomsRef.child(uid)
  }
}

export default new Fb()
