let ambientSound
export default {
  data() {
    return {
      fadeOutDuration: 0,
    }
  },
  computed: {
    ambientVolume() {
      return this.$store.state.volume * 0.5
    },
    moviePlaying() {
      return this.$store.state.moviePlaying
    },
  },
  mounted() {
    if (!ambientSound) {
      ambientSound = new Howl({
        src: ['audio/ambient.mp3'],
        loop: true,
        autoplay: true,
        volume: this.ambientVolume,
      })
    }
  },
  methods: {
    fadeOutAudio(aud, time) {
      aud.fade(aud.volume(), 0, time * 1000)
    },
    fadeInAudio(aud, vol, time, reset) {
      if (reset) {
        aud.seek(0)
      }
      aud.fade(0, vol, time * 1000)
    },
  },
  watch: {
    ambientVolume(val) {
      if (!this.moviePlaying) {
        ambientSound.volume(val)
      }
    },
    moviePlaying(val) {
      if (val) {
        this.fadeOutAudio(ambientSound, this.fadeOutDuration)
      } else {
        this.fadeInAudio(ambientSound, this.ambientVolume, 3, true)
      }
    },
  },
}
