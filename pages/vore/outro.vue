<template>
  <div :class="['main-wrapper main', { old: era == 'then' }]">
    <div class="black"></div>
    <Boucher />
    <div class="animation">
      <img class="woman" src="img/vore/VJ2_femme-1920.png" alt="" />

      <img class="man" src="img/vore/VJ_homme-aujrd.png" alt="" />
    </div>
    <div class="backdrop"></div>
    <Boucher />
    <div class="bulle">
      <div class="message">
        <div class="score">{{ score }}/{{ questions.length }}</div>
        <div>
          <div v-if="Math.floor(score / questions.length)">
            <span v-if="fr"
              >100% Lorem ipsum occati illum estotas dolupiet laut que
              repudandant.</span
            >
            <span v-else>EN</span>
          </div>
          <div v-else>
            <span v-if="fr"
              >Pas 100% Lorem ipsum occati illum estotas dolupiet laut que
              repudandant.</span
            >
            <span v-else>EN</span>
          </div>
        </div>
      </div>

      <ContinueButton
        @click.native="onContinue()"
        :text="fr ? 'Retour au<br>menu principal' : 'Back to main menu'"
      />
    </div>
  </div>
</template>

<script>
import { questions } from '~/static/data/vore.json'
export default {
  data() {
    return {
      panier: this.$store.state.panier,
      questions: questions,
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
.score {
  font-size: 88px;
  font-weight: 400;
  width: 100%;
  text-align: center;
  margin-bottom: 60px;
}
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

.boucher {
  //   left: 75%;
}
.black {
  animation: none;
  z-index: 0;
}
.bulle {
  width: 668px;
  height: 476px;
  left: 578px;
  top: 271px;
  &:after {
    transform: scale(0.7, -0.7);
    // left: -100px;
    top: 180px;
  }
}
</style>
