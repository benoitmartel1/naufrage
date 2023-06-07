export const state = () => ({
  lang: 'fr',
  ambVolume: 1,
  filmVolume: 1,
  idleTime: 60,
  score: 0,
  moviePlaying: false,
  settings: {},
  panier: {
    now: { list: [], max: 60 },
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
