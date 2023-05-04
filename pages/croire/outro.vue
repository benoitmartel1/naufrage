<template>
  <div>
    <div class="header">
      <span v-if="fr">J’SAIS PAS SI TU VAS M’CROIRE ?</span
      ><span v-else>WHAT TYPE OF VORE ARE YA?</span>
    </div>

    <Boucher />
    <div class="bulle">
      <Vache :score="score" />
      <div class="score">{{ score + ' / ' + nbOfQuestions }}</div>
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
        :text="fr ? 'Retour au menu principal' : 'Back to main menu'"
      />
    </div>
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
.vache {
  position: relative;
}
.boucher {
  left: 75%;
}
</style>
