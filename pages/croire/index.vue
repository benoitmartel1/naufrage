<template>
  <div>
    <div class="header">
      <span v-if="fr">J’SAIS PAS SI TU VAS M’CROIRE ?</span
      ><span v-else>WHAT TYPE OF VORE ARE YA?</span>
    </div>
    <Boucher />
    <div class="bulle">
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

      <ContinueButton @click.native="onContinue()" />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    fr() {
      return this.$store.state.lang == 'fr'
    },
  },
  methods: {
    onContinue() {
      this.$router.push('/croire/game')
    },
  },
}
</script>

<style lang="scss" scoped>
.boucher {
  left: 75%;
}
</style>
