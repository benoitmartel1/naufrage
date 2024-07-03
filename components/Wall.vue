<template>
  <div class="pastilles-wrapper">
    <Video
      v-if="currentVideo"
      :path="currentVideo"
      :header="''"
      :closeButton="true"
    />
    <Header :text="header" />
    <div class="main">
      <div
        class="wall-item"
        v-for="(video, index) in videos"
        :key="video + index"
        @pointerdown="onClick(video)"
      >
        <div>
          <div class="number">{{ index + 1 }}</div>
          <div class="name">{{ video[lang].name }}</div>
          <div class="cercle"><Arrow /></div>
        </div>
      </div>
    </div>
    <div class="spacer"></div>
  </div>
</template>

<script>
export default {
  props: ['videos', 'header'],
  data() {
    return { currentVideo: null }
  },
  methods: {
    onClick(item) {
      this.currentVideo = item[this.lang].path
    },
  },
  computed: {
    lang() {
      return this.$store.state.lang
    },
  },
}
</script>

<style lang="scss" scoped>
.video-wrapper {
  position: absolute;
  z-index: 10;
  left: 160px;
  //   border: 2px solid green;
}
.pastilles-wrapper {
  //   animation: moveUp ease-out 500ms;
  display: flex;

  flex-direction: column;
  justify-content: space-between;
  //   width: 80%;
  height: 100%;
  //   border: 2px solid red;
  //   border: 2px blue solid;
}
.main {
  width: 70%;
  margin: auto;
  //   border: 2px solid blue;
  text-align: center;
  //   column-count: 2;
  //   display: flex;
  //   justify-content: space-between;

  .wall-item {
    color: white;
    animation: fadeInOpacity 600ms;
    font-size: 36px;

    margin-bottom: 40px;
    width: 340px;
    // border: 2px solid yellow;
    display: inline-block;
    text-align: center;

    // display: flex;
    // height: 300px;
    // display: flex;
    // justify-content: flex-start;
    // align-items: flex-start;
    .name {
      margin-bottom: 20px;
      white-space: pre-wrap;
      text-align: center;
      //   max-width: 400px;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      height: 60px;
      font-size: 28px;
      line-height: 1.2em;
      //   border: 2px solid blue;
    }
    .cercle {
      margin: auto;
      margin-top: 0;
      width: 140px;
      height: 140px;
      border-radius: 100%;
      border: 6px var(--yellow) solid;
      display: flex;
      justify-content: center;
      align-items: center;
      //   transform: scale(0.8);
      .arrow-wrapper {
        margin: 10px 0 0 10px;
        transform: scaleX(-1);
      }
    }
  }
}
</style>
