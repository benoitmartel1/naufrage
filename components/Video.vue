<template>
  <div class="video-wrapper">
    <div v-if="closeButton" class="close" @pointerdown="closeVideo()">X</div>
    <Header :text="header" />
    <div
      v-show="showVideo"
      class="video-container"
      @pointerdown="toggleVideo($event)"
    >
      <video disableRemotePlayback id="video" :src="videoPath()"></video>
    </div>
  </div>
</template>

<script>
export default {
  props: ['path', 'header', 'closeButton'],
  data() {
    return { showVideo: false }
  },
  methods: {
    videoPath() {
      return 'video/' + this.path
    },
    toggleVideo(e) {
      e.target.paused ? e.target.play() : e.target.pause()
    },
    closeVideo() {
      this.$parent.currentVideo = null
    },
  },
  mounted() {
    var myVid = document.getElementById('video')
    myVid.onloadeddata = this.showVideo = true
    myVid.onended = () => {
      myVid.currentTime = 0
      myVid.pause()
      if (this.closeButton) {
        this.$parent.currentVideo = null
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.video-wrapper {
  width: 1600px;
  text-align: center;
}
.video-container {
  animation: fadeVideoInOpacity 800ms both;
}
@keyframes fadeVideoInOpacity {
  0% {
    opacity: 0;
    transform: scale(0.98);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
.close {
  right: 0;
  border-radius: 100%;
  border: 2px solid white;
  width: 80px;
  height: 80px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
}
video {
  width: 1400px;
  border-radius: 20px;
  //   opacity: 0;
}
.arrow-down {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 30px;
  div {
    transform: rotate(-90deg);
    width: 60px;
  }
}
</style>
