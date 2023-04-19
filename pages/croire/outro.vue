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
          <span v-if="fr"
            >Lorem ipsum occati illum estotas dolupi- et laut que repudandant.
            Cipsam faccatur reperum vollum incidebis dollamus inustias este
            vendell uptasperchil int estiatur ma.</span
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
