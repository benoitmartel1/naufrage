<template>
  <div class="pastilles-wrapper">
    <Header :text="header" />
    <div class="main">
      <div class="naufrages" v-for="(item, index) in items" :key="item + index">
        <div>
          <div class="name" @pointerdown="onClick(item)">
            {{ item.name[lang].toUpperCase() }}
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
    font-size: 36px;
    margin-bottom: 30px;
    width: 300px;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    border: 6px var(--yellow) solid;
  }
}
</style>
