<template>
  <div>
    <Boucher />
    <div class="bulle">
      <div class="message">
        <div v-if="isNow">
          <span v-if="lang == 'fr'"
            >Finito! ipsum occati illum estotas dolupi- et laut que repudandant.
            Cipsam faccatur reperum vollum incidebis dollamus inustias este
            vendell uptasperchil int estiatur ma.</span
          >
          <span v-else>EN</span>
        </div>
        <div v-else>
          <span v-if="lang == 'fr'"
            >Finito! ipsum occati illum estotas dolupi- et laut que repudandant.
            Cipsam
          </span>
          <span v-else>EN</span>
        </div>
      </div>

      <ContinueButton
        @click.native="onContinue()"
        :text="lang == 'fr' ? 'Retour au menu principal' : 'Back to main menu'"
      />
    </div>
    <ul class="list">
      <div class="title">Mon panier aujourd'hui</div>
      <li v-for="(i, index) in panier.now.list" :key="i.fr + index">
        {{ i[lang] }}
      </li>
    </ul>
    <ul class="list">
      <div class="title">Mon panier 1920</div>
      <li v-for="(i, index) in panier.then.list" :key="i.fr + index">
        {{ i[lang] }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      panier: this.$store.state.panier,
    }
  },
  computed: {
    lang() {
      return this.$store.state.lang
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
.list {
  background-color: white;
  width: 400px;
  position: absolute;
  min-height: 600px;
  @include bordered;
  &:nth-of-type(1) {
    right: 30%;
    transform: rotate(-3deg);
  }
  &:nth-of-type(2) {
    right: 10%;
    transform: rotate(5deg);
  }
  li {
    font-size: 0.5em;
  }
}
.boucher {
  transform: scaleX(-1);
  left: 500px;
  bottom: -200px;
  z-index: 150;
}
.bulle {
  top: 30px;
  width: 800px;
  z-index: 100;
  left: 30px;
  &:after {
    transform: rotate(-90deg) scaleX(-1);
    top: 100%;
    left: 5%;
  }
}
</style>
