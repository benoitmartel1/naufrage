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
          <div v-if="Math.floor(score / questions.length >= 0.9)">
            <span v-if="fr"
              >Wow! On voit bien que vous êtes connaissant! Je n’aurais jamais
              pensé qu’un jour, la viande, on pourrait s’en passer!</span
            >
            <span v-else
              >Wow! We can see that you know a lot! I would never have thought
              that one day we could do without meat!</span
            >
          </div>
          <div v-else>
            <span v-if="fr"
              >Je vous félicite! Moi aussi, j’ai appris un tas de nouveaux mots!
              Qui aurait cru qu’un jour, il y aurait autant de façons de manger
              que j’ai d’enfants à nourrir!</span
            >
            <span v-else
              >Congratulations! Me too, I learned a few new words! Who would
              have believed that one day there would be as many ways of eating
              as I have kids to feed!
            </span>
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
  //   height: 476px;
  left: 578px;
  top: 271px;
  &:after {
    transform: scale(0.7, -0.7);
    // left: -100px;
    top: 180px;
  }
}
</style>
