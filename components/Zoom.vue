<template>
  <div class="zoom-wrapper" @pointerdown="closeZoom()">
    <div class="close" @pointerdown="closeZoom()">X</div>
    <div class="image-container">
      <img :src="image" alt="" @pointerdown.stop="" />
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
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 888;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.8);
  .close {
    position: absolute;
    top: 60px;
    right: 70px;
  }
  .image-container {
    position: absolute;
    // border: 2px red solid;
    overflow-y: auto;
    overflow-x: hidden;

    max-width: 1400px;
    width: auto;
    max-height: 90vh;
  }

  img {
    display: block;
    width: 100%;
    // max-width: 100%;
    // min-width: 120%;
    box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.7);
  }
}
</style>
