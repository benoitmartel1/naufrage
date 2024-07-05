<template>
  <div>
    <div class="image-wrapper">
      <Transition name="fade">
        <Zoom v-if="currentImage" :image="currentImage" />
      </Transition>
      <Header :text="header" />
      <div class="body">
        <div class="mover">
          <TransitionGroup tag="div" name="fade">
            <div
              v-for="i in 5"
              v-show="imagesLoaded >= 5"
              :key="i"
              class="image-container"
            >
              <img
                :src="backgroundUrl(i)"
                alt=""
                @pointerdown="showImage(zoomUrl(i))"
                @load="imagesLoaded++"
              />
            </div>
          </TransitionGroup>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['tiles', 'imagesPath', 'header'],
  data() {
    return {
      imagesLoaded: 0,
      currentImage: null,
    }
  },
  methods: {
    backgroundUrl(i) {
      return 'img/' + this.imagesPath + '/0' + i + '.jpg'
    },
    zoomUrl(i) {
      return 'full/' + this.imagesPath + '/0' + i + '.jpg'
    },
    showImage(url) {
      this.currentImage = url
    },
  },
}
</script>

<style lang="scss" scoped>
.image-wrapper {
  width: 1600px;
  .body {
    transform: scale(0.95);
    transform-origin: center 0;
    .mover {
      //   animation: moveLeft 1000ms cubic-bezier(0.16, 0.82, 0.38, 0.96);
    }
  }
}
@keyframes moveLeft {
  from {
    // opacity: 0;
    transform: translateX(40px);
  }
  to {
    // opacity: 1;
    transform: translateX(0);
  }
}
.image-container {
  overflow: hidden;
  border-radius: 20px;
  border: 6px solid rgb(9, 10, 21);
  display: inline-block;
  width: 50px;
  height: 290px;
  margin-right: 10px;

  &:nth-of-type(1),
  &:nth-of-type(2) {
    margin-bottom: 10px;
    height: 536px;
    color: green;
  }
  &:nth-of-type(1) {
    width: 945px;
  }
  &:nth-of-type(2) {
    margin-left: 4px;
    transition-delay: 100ms;
    width: 620px;
  }
  &:nth-of-type(3) {
    transition-delay: 200ms;
    width: 515px;
  }
  &:nth-of-type(4) {
    transition-delay: 300ms;
    width: 640px;
  }
  &:nth-of-type(5) {
    transition-delay: 400ms;
    width: 405px;
  }

  img {
    will-change: transform;
    animation: scaleIn 900ms cubic-bezier(0.16, 0.82, 0.38, 0.96) both;
    // animation-delay: 200ms;
    width: 100%;
  }
  @keyframes scaleIn {
    from {
      // opacity: 0;
      transform: scale(1.1);
    }
    to {
      // opacity: 1;
      transform: scale(1);
    }
  }
}
</style>
