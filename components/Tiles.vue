<template>
  <div>
    <div class="image-wrapper">
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
              <img :src="backgroundUrl(i)" alt="" @load="imagesLoaded++" />
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
    }
  },
  methods: {
    backgroundUrl(i) {
      return 'img/' + this.imagesPath + '/0' + i + '.jpg'
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
  display: inline-block;
  color: blue;
  width: 50px;
  height: 290px;
  margin-right: 10px;
  //   background-color: red;
  border-radius: 20px;
  border: 6px solid rgb(9, 10, 21);
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
    transition-delay: 100ms;
    width: 630px;
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
    animation: scaleIn 900ms cubic-bezier(0.16, 0.82, 0.38, 0.96) both;
    // animation-delay: 200ms;
    width: 100%;
  }
  @keyframes scaleIn {
    from {
      // opacity: 0;
      transform: scale(1.3) translate3d(0px, 0px, 0px);
    }
    to {
      // opacity: 1;
      transform: scale(1) translate3d(0px, 0px, 0px);
    }
  }
}
</style>
