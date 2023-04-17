export const state = () => ({
  lang: 'fr',
  volume: 1,
  moviePlaying: false,
  panier: {
    now: { list: [], max: 20, isFull: false },
    then: { list: [], max: 30, isFull: false },
  },
})

// export const getters = {
//   getLang(state) {
//     return state.lang
//   },
// }

export const mutations = {
  resetGameData(state) {
    state.panier.now.list = []
    state.panier.then.list = []
    state.panier.then.isFull = false
    state.panier.now.isFull = false
  },
  setLang(state, l) {
    state.lang = l
  },
  addItem(state, p) {
    state.panier[p.list].list.push(p.item)
  },
  removeItem(state, p) {
    state.panier[p.list].list.splice(p.item, 1)
  },
  setPanierFullStatus(state, p) {
    state.panier[p.list].isFull = p.status
  },
  setVolume(state, v) {
    state.volume = v
  },
  setMoviePlaying(state, s) {
    state.moviePlaying = s
  },
}

export const actions = {
  async fetchCounter({ state }) {
    // make request
    const res = { data: 10 }
    state.counter = res.data
    return res.data
  },
}
