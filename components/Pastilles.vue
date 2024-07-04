<template>
  <div class="pastilles-wrapper">
    <Header :text="header" />
    <div class="main">
      <div
        class="naufrages"
        @pointerdown="onClick(item)"
        v-for="(item, index) in items"
        :key="item + index"
      >
        <div>
          <div class="name">
            {{ item.name[lang].toUpperCase() }}
          </div>
          <div class="arrow-container">
            <Arrow />
          </div>
        </div>
      </div>
    </div>
    <div class="spacer"></div>
  </div>
</template>

<script>
export default {
  props: ['items', 'header'],
  methods: {
    onClick(item) {
      console.log(item)
      this.$parent.currentItem = item
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
.arrow-container {
  display: flex;
  justify-content: center;
  //   align-items: flex-end;
  //   transform-origin: 0 0;
  transform: scale(0.5) rotate(-90deg);
  margin-right: -10px;
  //   border: 2px solid yellow;
}
.pastilles-wrapper {
  //   animation: moveUp ease-out 500ms;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 80%;
  height: 100%;
  //   border: 2px blue solid;
}
.main {
  //   width: 80%;
  //   column-count: 2;
  display: flex;
  justify-content: space-between;

  .naufrages {
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    animation: fadeInOpacity 600ms;
    // font-size: 36px;
    margin-bottom: 30px;
    width: 300px;
    height: 300px;
    padding-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    border-radius: 100%;
    border: 6px var(--yellow) solid;
  }
}
</style>
