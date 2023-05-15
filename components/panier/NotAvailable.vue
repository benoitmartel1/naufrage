<template>
  <div class="bulle" @click.stop="$parent.notAvailable = undefined">
    <div class="close">X</div>
    <div class="pointe">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="99.037"
        height="86.486"
        viewBox="0 0 99.037 86.486"
      >
        <path
          id="Tracé_75"
          data-name="Tracé 75"
          d="M0,0,47.372,81.513,95.586,0"
          transform="translate(1.729 1.018)"
          fill="#f48e6c"
          stroke="#fff"
          stroke-width="4"
        />
      </svg>
    </div>

    <div class="exclamation"><span>!</span></div>
    <div class="message" v-html="text"></div>

    <!-- <ContinueButton @click.native="$emit('continue')" /> -->
  </div>
</template>

<script>
export default {
  props: ['text'],
  computed: {
    lang() {
      return this.$store.state.lang
    },
  },
}
</script>

<style lang="scss" scoped>
.bulle {
  top: unset;
  position: absolute;
  color: black;
  background-color: #f48e6c;
  //   top: -280px;
  //   left: -60px;
  min-width: 800px;
  //   width: 390px;
  min-height: 340px;
  border-color: white;
  display: flex;
  // justify-content: center;
  align-items: center;
  z-index: 800;
  .close {
    font-weight: 400;
    transform: scaleX(1.2);
    right: 30px;
    top: 20px;
    font-size: 48px;
    position: absolute;
    font-family: arial;
  }
  .exclamation {
    width: 82px;
    height: 82px;
    background-color: var(--yellow);
    border-radius: 100%;
    font-weight: 800;
    font-size: 70px;
    margin-bottom: 30px;
    span {
      margin-top: -6px;
    }
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .pointe {
    position: absolute;
    // bottom: -80px;
  }
  &:after {
    display: none;
  }
}
</style>
