export const state = () => ({
  lang: 'fr',
  borne: null,
  idleTime: 60,
  videoPath: 'video/',
})

export const mutations = {
  setLang(state, l) {
    state.lang = l
  },
  setBorne(state, nb) {
    state.borne = nb
  },
  setSettings(state, s) {
    if (s.borne) {
      state.borne = s.borne
    }
    if (s.idleTime) {
      state.idleTime = s.idleTime
    }
    if (s.videoPath) {
      state.videoPath = s.videoPath
    }
  },
}
