<template>
  <div class="main-wrapper">
    <div class="black"></div>
    <Boucher />
    <div class="bulle">
      <div class="row">
        <Vache :score="score" />
        <div class="score">{{ score + '/' + nbOfQuestions }}</div>
      </div>

      <div class="message">
        <div>
          <div v-if="Math.floor(score / nbOfQuestions) >= 0.8">
            <span v-if="fr"
              >Félicitations! Démêler les « accroires » de la réalité, c’est
              votre spécialité. Je vous lève mon chapeau de boucher!</span
            >
            <span v-else
              >Congratulations! Separating beliefs from reality is your
              specialty! I tip my butcher's hat to you!</span
            >
          </div>
          <div v-else>
            <span v-if="fr"
              >Bien joué! Vous savez maintenant mieux démêler les « accroires »
              de la réalité. Je vous lève mon chapeau de boucher!</span
            >
            <span v-else
              >Good game! You now know how to better separate beliefs from
              reality. I tip my butcher's hat to you!</span
            >
          </div>
        </div>
      </div>

      <ContinueButton
        @click.native="onContinue()"
        :text="fr ? 'Retour au<br>menu principal' : 'Back to main menu'"
      />
    </div>

    <div class="frame"></div>
  </div>
</template>

<script>
import { questions } from '~/static/data/croire.json'
export default {
  computed: {
    nbOfQuestions() {
      return questions.length
    },
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
.black {
  z-index: 0;
}
.row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 100px;
}
.bulle {
  width: 875px;
  min-height: 681px;
  left: 344px;
  top: 107px;
}
.score {
  font-size: 88px;
  line-height: 65px;
  font-weight: 400;
  float: right;
}
.vache {
  //   position: relative;
}
</style>
