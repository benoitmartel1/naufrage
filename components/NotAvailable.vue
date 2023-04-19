<template>
  <div class="wrapper">
    <div class="frame">
      <div class="bulle" @click="$parent.notAvailable = false">
        <div class="message">
          <span v-if="lang == 'fr'">Pas dispo!!</span>
          <span v-else>EN</span>
        </div>

        <!-- <ContinueButton @click.native="$emit('continue')" /> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    lang() {
      return this.$store.state.lang
    },
  },
}
</script>

<style lang="scss" scoped>
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
      color: white;
      background-color: black;
      left: 500px;
      &:after {
        // color: white;
        border-bottom-color: black;
        transform: scaleX(-1);
        left: -100px;
        top: 20px;
        filter: drop-shadow(4px 1px 0 white);
      }
    }
  }
}
</style>
