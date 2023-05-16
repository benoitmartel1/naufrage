export const state = () => ({
  lang: 'fr',
  volume: 1,
  score: 0,
  moviePlaying: false,
  panier: {
    now: { list: [], max: 100 },
    then: { list: [], max: 4 },
  },
  croire: {
    max: 6,
  },
})

export const mutations = {
  resetGameData(state) {
    state.panier.now.list = []
    state.panier.then.list = []
    state.score = 0
  },
  setLang(state, l) {
    state.lang = l
  },
  setScore(state, s) {
    state.score = s
  },
  checkoutList(state, p) {
    state.panier[p.list].list = p.content
  },
  setVolume(state, v) {
    state.volume = v
  },
  setCroireMax(state, v) {
    state.croire.max = v
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
