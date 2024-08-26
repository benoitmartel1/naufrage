<template>
  <div class="video-wrapper">
    <Header :text="header" />

    <Transition name="fadeInVideo">
      <div
        v-show="showVideo"
        class="video-container"
        @pointerdown="toggleVideo($event)"
      >
        <div v-if="closeButton" class="close" @pointerdown="closeVideo()">
          X
        </div>
        <Transition name="fade">
          <div v-show="showingHeadphones" class="headphones">
            <div class="circle">
              <Arrow />
              <svg
                fill="#ffffff"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 287.386 287.386"
                xml:space="preserve"
                stroke="#ffffff"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <g>
                    <g>
                      <path
                        d="M62.743,155.437v98.42c0,5.867,4.741,10.605,10.605,10.605c5.854,0,10.605-4.738,10.605-10.605v-98.42 c0-5.856-4.751-10.605-10.605-10.605C67.484,144.832,62.743,149.576,62.743,155.437z"
                      ></path>
                      <path
                        d="M29.456,264.582h23.351v-116.85c0.064-0.56,0.166-1.119,0.166-1.693c0-50.412,40.69-91.42,90.698-91.42 c50.002,0,90.692,41.008,90.692,91.42c0,0.771,0.113,1.518,0.228,2.263v116.28h23.354c16.254,0,29.442-13.64,29.442-30.469 v-60.936c0-13.878-8.989-25.57-21.261-29.249c-1.129-66.971-55.608-121.124-122.45-121.124 c-66.86,0-121.347,54.158-122.465,121.15C8.956,147.638,0,159.32,0,173.187v60.926C0,250.932,13.187,264.582,29.456,264.582z"
                      ></path>
                      <path
                        d="M203.454,155.437v98.42c0,5.867,4.748,10.605,10.604,10.605s10.604-4.738,10.604-10.605v-98.42 c0-5.856-4.748-10.605-10.604-10.605C208.191,144.832,203.454,149.576,203.454,155.437z"
                      ></path>
                    </g>
                  </g>
                </g>
              </svg>
              <Arrow />
            </div>
          </div>
        </Transition>
        <video disableRemotePlayback id="video" :src="videoPath()"></video>
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  props: ['path', 'header', 'closeButton', 'showHeadphones'],
  data() {
    return { showVideo: false, showingHeadphones: false }
  },
  methods: {
    videoPath() {
      let videoPath = this.$store.state.videoPath
      //For local test only
      //   videoPath = 'D:/JOB/Lisette/Naufrages/Videos/'

      return videoPath + this.path
    },
    toggleVideo(e) {
      var myVid = document.getElementById('video')
      if (!this.showingHeadphones && myVid) {
        if (!myVid.paused) {
          this.$store.commit('setVideoIsPlaying', false)
          myVid.pause()
        } else {
          if (myVid.currentTime == 0 && this.showHeadphones) {
            this.showingHeadphones = true
            setTimeout(() => {
              this.showingHeadphones = false
              this.$parent.showHeadphones = false
              setTimeout(() => {
                this.playVideo(myVid)
              }, 200)
            }, 3000)
          } else {
            this.playVideo(myVid)
          }
        }
      }
    },
    playVideo(myVid) {
      this.$store.commit('setVideoIsPlaying', true)
      myVid.play()
    },
    closeVideo() {
      if (!this.showingHeadphones) {
        this.$store.commit('setVideoIsPlaying', false)
        this.$parent.currentVideo = null
      }
    },
  },
  mounted() {
    var myVid = document.getElementById('video')
    myVid.oncanplaythrough = this.showVideo = true
    myVid.onended = () => {
      //   myVid.currentTime = 0
      myVid.pause()
      if (this.closeButton) {
        this.closeVideo()
      } else {
        this.$store.commit('setVideoIsPlaying', false)
        myVid.currentTime = 0
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.video-wrapper {
  width: 1600px;
  text-align: center;
  .video-container {
    position: relative;
  }
}
.headphones {
  position: absolute;
  top: 0;
  //   border: 2px solid yellow;
  z-index: 999;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .circle {
    margin-left: 24px;
    margin-top: -20px;

    // border: var(--yellow) 3px solid;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 40px;
    background-color: black;
    border-radius: 100%;
    width: 600px;
    height: 600px;
    svg {
      margin-bottom: 30px;
      margin-left: 10px;
      width: 200px;
    }
    .arrow-wrapper {
      animation: blink 0.8s infinite ease-in-out;
    }

    .arrow-wrapper:nth-of-type(2) {
      transform: scaleX(-1);
    }
  }
}
@keyframes blink {
  0%,
  100% {
    opacity: 0.5;
  }
  25%,
  75% {
    opacity: 1;
  }
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
