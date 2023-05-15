<template>
  <div :class="['main-wrapper main', { old: era == 'then' }]">
    <div class="black"></div>
    <Boucher />
    <div class="animation">
      <img class="woman" src="img/vore/VJ2_femme-1920.png" alt="" />

      <img class="man" src="img/vore/VJ_homme-aujrd.png" alt="" />
      <div class="labels">
        <div class="label">
          <span>{{ fr ? 'Omnivore' : 'Omnivore' }}</span>
        </div>
        <div class="label">
          <span>{{ fr ? 'Végétarien' : 'Vegetarian' }}</span>
        </div>
        <div class="label">
          <span>{{ fr ? 'Végan' : 'Vegan' }}</span>
        </div>
        <div class="label">
          <span>{{ fr ? 'Flexitarien' : 'Flexitarian' }}</span>
        </div>
        <div class="label">
          <span>{{ fr ? 'Méditerranéen' : 'Mediterranean' }}</span>
        </div>
        <div class="label">
          <span>{{ fr ? 'Crudivore' : 'Crudivore' }}</span>
        </div>
      </div>
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
    left: 221px;
    position: absolute;
    // transform: scaleX(-1);
    filter: brightness(0);
  }
  .woman {
    left: 449px;
    position: absolute;
    top: 97px;
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
  z-index: 2;
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
.black {
  z-index: 1;
}
.labels {
  .label {
    span {
      background: url('~/assets/img/VJ-J2_Étiquette.png');
      width: 292px;
      height: 146px;
      color: #4e2803;
      font-weight: 400;
      font-size: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      //   display: block;
      animation: scaleDown 500ms ease-out;
      //   padding: 20px 50px;
      //   background-color: white;
      //   border: 5px solid black;
    }
    position: absolute;
    left: 344px;
    top: 482px;
    // font-weight: 800;
    transform-origin: center center;

    // font-size: 3em;

    &:nth-child(1) {
      transform: translate(0px, 0px) rotate(0deg);
    }
    &:nth-child(2) {
      transform: translate(150px, -80px) rotate(12deg);
    }
    &:nth-child(3) {
      transform: translate(-110px, -80px) rotate(-18deg);
    }
    &:nth-child(6) {
      transform: translate(-120px, 90px) rotate(14deg);
    }
    &:nth-child(5) {
      transform: translate(100px, 100px) rotate(-20deg);
    }
    &:nth-child(4) {
      transform: translate(140px, -190px) rotate(6deg);
    }
  }
}
</style>
