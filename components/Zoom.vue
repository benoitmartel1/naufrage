<template>
  <div class="zoom-wrapper" @pointerdown="closeZoom()">
    <div class="image-container">
      <img :src="image" alt="" />
      <div class="close" @pointerdown="closeZoom()">X</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['image'],
  methods: {
    closeZoom() {
      this.$parent.currentImage = null
    },
  },
}
</script>

<style lang="scss" scoped>
.zoom-wrapper {
  .image-container {
    // display: flex;
    // justify-content: center;
    // align-items: flex-start;
    // transform: scale(1.3);
    // position: relative;
    // display: flex;
    // width: 100%;
    // border: 2px solid green;
    // display: block;
  }
  .close {
    // transform: scale(0.7);
    position: absolute;
    // z-index: 900;
    top: 60px;
    // right: unset;
    right: 60px;

    // position: unset;
    // margin-left: 30px;
  }
  //   border: 2px solid red;
  position: absolute;
  z-index: 888;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);

  img {
    // display: block;
    width: 140%;
    max-width: 1600px;
    // max-height: 300px;
    margin-left: -20%;
    overflow: hidden;
    border-radius: 20px;
    // border: 6px solid rgb(9, 10, 21);
  }
}
</style>
