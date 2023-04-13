<template>
  <div>
    <Nav />
    <Boucher />
    <div class="bulle">
      <div class="message">
        <div v-if="isNow">
          <span v-if="lang == 'fr'"
            >Lorem ipsum occati illum estotas dolupi- et laut que repudandant.
            Cipsam faccatur reperum vollum incidebis dollamus inustias este
            vendell uptasperchil int estiatur ma.</span
          >
          <span v-else>EN</span>
        </div>
        <div v-else>
          <span v-if="lang == 'fr'"
            >1920 Lorem ipsum occati illum estotas dolupi- et laut que
            repudandant. Cipsam
          </span>
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
    lang() {
      return this.$store.state.lang
    },
    isNow() {
      return !this.$store.state.panier.now.isFull
    },
  },
  methods: {
    onContinue() {
      this.$router.push('/panier/game')
    },
  },
}
</script>

<style lang="scss" scoped>
.boucher {
  left: 75%;
}
</style>
