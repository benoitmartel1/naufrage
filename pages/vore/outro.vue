<template>
  <div :class="['main', { old: era == 'then' }]">
    <div class="black"></div>
    <div class="animation">
      <img class="woman" src="@/assets/images/boucher.png" alt="" />
      <img class="man" src="@/assets/images/boucher.png" alt="" />
    </div>
    <Boucher />
    <div class="bulle">
      <div class="message">
        <div class="score">{{ score }} / XX</div>
        <div>
          <span v-if="fr"
            >Lorem ipsum occati illum estotas dolupiet laut que
            repudandant.</span
          >
          <span v-else>EN</span>
        </div>
      </div>

      <ContinueButton
        @click.native="onContinue()"
        :text="fr ? 'Retour au menu principal' : 'Back to main menu'"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      panier: this.$store.state.panier,
    }
  },
  computed: {
    fr() {
      return this.$store.state.lang == 'fr'
    },
    score() {
      return this.$store.state.score
    },
  },
  methods: {
    onContinue() {
      this.$router.push('/')
    },
  },
}
</script>

<style lang="scss" scoped>
.animation {
  position: relative;
  height: $height;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  .man {
    transform: scaleX(-1);
    filter: brightness(0);
  }
  .woman {
    filter: brightness(0);
  }
}
.list {
  background-color: white;
  width: 400px;
  position: absolute;
  min-height: 600px;
  @include bordered;
  &:nth-of-type(1) {
    right: 30%;
    transform: rotate(-3deg);
  }
  &:nth-of-type(2) {
    right: 10%;
    transform: rotate(5deg);
  }
  li {
    font-size: 0.5em;
  }
}
.boucher {
  left: 75%;
}
.black {
  animation: none;
  z-index: 0;
}
.bulle {
  //   top: 30px;
  //   width: 800px;
  //   z-index: 100;
  //   left: 30px;
  //   &:after {
  //     transform: rotate(-90deg) scaleX(-1);
  //     top: 100%;
  //     left: 5%;
  //   }
}
</style>
