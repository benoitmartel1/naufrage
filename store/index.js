export const state = () => ({
  lang: 'fr',
  borne: null,
  idleTime: 90,
  videoPath: 'video/',
  videoIsPlaying: false,
})

export const mutations = {
  setVideoIsPlaying(state, v) {
    state.videoIsPlaying = v
  },
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
