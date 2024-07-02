export const state = () => ({
  lang: 'fr',

  idleTime: 60,

  moviePlaying: false,
  settings: {},
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
  setLoop(state, s) {
    state.settings.movieLoop = s
  },
  setSettings(state, s) {
    state.settings = s

    if (Number.isInteger(s.idletime)) {
      state.idleTime = s.idletime
    }
    if (Number.isInteger(s.panier_1920_max)) {
      state.panier.then.max = s.panier_1920_max
    }
    if (Number.isInteger(s.panier_2020_max)) {
      state.panier.now.max = s.panier_2020_max
    }
  },
  checkoutList(state, p) {
    state.panier[p.list].list = p.content
  },
  setAmbVolume(state, v) {
    state.ambVolume = v
  },
  setFilmVolume(state, v) {
    state.filmVolume = v
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
