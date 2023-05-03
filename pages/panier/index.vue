<template>
  <div :class="['main', { old: era == 'then' }]">
    <Boucher />
    <div class="bulle">
      <div class="message">
        <div v-if="era == 'now'">
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
  data() {
    return {
      era: this.$store.state.panier.now.list.length ? 'then' : 'now',
    }
  },
  computed: {
    lang() {
      return this.$store.state.lang
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
  left: 75% !important;
}
</style>
