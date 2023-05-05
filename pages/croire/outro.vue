<template>
  <div class="main-wrapper">
    <Boucher />
    <div class="bulle">
      <div class="row">
        <Vache :score="score" />
        <div class="score">{{ score + '/' + nbOfQuestions }}</div>
      </div>

      <div class="message">
        <div>
          <div v-if="Math.floor(score / nbOfQuestions)">
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
.row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 100px;
}
.score {
  font-size: 72px;
  font-weight: 700;
  //   width: 100%;
  text-align: center;
  //   margin-bottom: 60px;
}
.vache {
  //   position: relative;
}
.boucher {
  left: 75%;
}
</style>
