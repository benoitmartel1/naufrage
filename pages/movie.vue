<template>
  <div>
    <div class="main">
      <video
        :src="
          this.$store.state.settings.videoPath || '/extraResources/video.mp4'
        "
        autoplay
        @ended="onMovieEnd()"
      ></video>
    </div>
  </div>
</template>

<script>
let vid
export default {
  computed: {
    videoVolume() {
      return this.$store.state.volume
    },
  },
  mounted() {
    console.log('playing movie ' + this.$store.state.settings.videoPath)
    vid = document.querySelector('video')
    vid.volume = this.videoVolume
  },
  watch: {
    videoVolume() {
      vid.volume = this.videoVolume
    },
  },

  methods: {
    onMovieEnd() {
      this.$store.commit('setMoviePlaying', false)
      this.$router.push('/')
    },
  },
}
</script>

<style lang="scss" scoped>
.main {
  width: $width;
  height: $height;

  background-color: #000;
}
video {
  //   position: fixed;
  //   right: 0;
  //   bottom: 0;
  min-width: 100%;
  min-height: 100%;
}
.page-enter-active,
.page-leave-active {
  transition: opacity 1s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
</style>
