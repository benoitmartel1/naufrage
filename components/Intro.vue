<template>
  <div class="intro-wrapper">
    <Header :text="header" />
    <div class="intro">{{ text }}</div>
    <div class="arrow-down" @click="$parent.changeSlide(1)"><Arrow /></div>
  </div>
</template>

<script>
export default {
  props: ['text', 'header'],
}
</script>

<style lang="scss" scoped>
.intro-wrapper {
  animation: moveUp ease-out 500ms;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  //   border: 2px blue solid;
}
@keyframes moveUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.intro,
.arrow-down {
  animation: fadeInOpacity 600ms;
}

.intro {
  //   height: 100%;
  //   flex-basis: 1;
  white-space: pre-wrap;
  font-size: 28px;
  line-height: 1em;
  text-align: center;
}
.arrow-down {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 30px;
  transform: rotate(-90deg);
}
</style>
