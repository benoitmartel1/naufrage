<template>
  <div>
    <Header :text="header" />
    <div v-show="showVideo" class="video-wrapper" @click="toggleVideo($event)">
      <video disableRemotePlayback id="video" :src="videoPath()"></video>
    </div>
  </div>
</template>

<script>
export default {
  props: ['path', 'header'],
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
  },
  mounted() {
    var myVid = document.getElementById('video')
    myVid.onloadeddata = this.showVideo = true
    myVid.onended = function () {
      console.log('done')
      myVid.currentTime = 0
      myVid.pause()
    }
  },
}
</script>

<style lang="scss" scoped>
.video-wrapper {
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
