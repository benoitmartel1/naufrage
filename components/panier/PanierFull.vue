<template>
  <div class="wrapper">
    <div class="frame">
      <Boucher />
      <div class="bulle">
        <div class="message">
          <div class="total">{{ total + ' $' }}</div>
          <span v-if="lang == 'fr'"
            >Lorem ipsum occati illum estotas dolupi- et laut que repudandant.
            Cipsam faccatur reperum vollum incidebis dollamus inustias este
            vendell uptasperchil int estiatur ma.</span
          >
          <span v-else>EN</span>
        </div>

        <ContinueButton @click.native="$emit('continue')" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['total'],
  computed: {
    lang() {
      return this.$store.state.lang
    },
  },
}
</script>

<style lang="scss" scoped>
.total {
  font-weight: 700;
  width: 100%;
  text-align: center;
  font-size: 88px;
  margin: 30px 0 60px 0;
}
.wrapper {
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 100%;

  box-sizing: border-box;
  .frame {
    position: relative;
    width: 100%;
    height: 100%;
    // background-color: green;
    overflow: hidden;
    .boucher {
      right: unset;
      left: 500px;
      bottom: -200px;
      transform: scaleX(-1);
    }
    .bulle {
      left: 500px;
      &:after {
        transform: scaleX(-1);
        left: -100px;
        top: 20px;
      }
    }
  }
}
</style>
