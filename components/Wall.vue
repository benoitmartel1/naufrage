<template>
  <div class="pastilles-wrapper">
    <Transition name="fade">
      <Video
        v-if="currentVideo"
        :path="currentVideo"
        :header="''"
        :closeButton="true"
      />
    </Transition>
    <Header :text="header" />
    <div class="main" :style="numberOfColumns(videos.length)">
      <div
        class="wall-item"
        v-for="(video, index) in videos"
        :key="video + index"
        @pointerdown="onClick(video)"
      >
        <div>
          <div class="number"></div>
          <div class="name">{{ index + 1 + '.  ' + video[lang].name }}</div>
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
    numberOfColumns(nb) {
      console.log(nb)
      let style = `grid-template-columns: repeat(${nb == 4 ? 2 : 3}, 1fr);`
      return style
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
  left: 0;
  width: 100%;
  //   border: 2px red solid;
  //   border: 2px solid green;
}
.pastilles-wrapper {
  //   border: 2px red solid;
  //   animation: moveUp ease-out 500ms;
  display: flex;

  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  //   border: 2px solid red;
  //   border: 2px blue solid;
}
.main {
  width: 70vw;
  margin: auto;
  //   border: 2px solid blue;
  text-align: center;

  display: grid;
  //   grid-template-columns: repeat(3, 1fr);
  // .wrapper {
  //   display: grid;
  //   grid-template-columns: repeat(6, 1fr);
  //   gap: 5px;
  //   border: 1px solid;
  //   padding: 10px;
  //   margin: 10px;
  // }
  // .element {
  //   grid-column: span 2;
  //   height: 20px;
  //   background: red;
  // }
  // /* the case with 4 elements */
  // .element:first-child:nth-last-child(4),
  // .element:first-child:nth-last-child(4) ~ *{
  //   grid-column: span 3;
  // }

  .wall-item {
    color: white;
    animation: fadeInOpacity 600ms;
    font-size: 80%;

    margin-bottom: 60px;
    // width: 50%;
    // border: 2px solid yellow;
    // display: inline-block;
    text-align: center;
    .name {
      margin-bottom: 20px;
      white-space: pre-wrap;
      text-align: center;
      min-height: 110px;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      height: 60px;
      //   font-size: 28px;
      line-height: 1.05em;
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
