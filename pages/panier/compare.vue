<template>
  <div class="main-wrapper">
    <Boucher />
    <div class="bulle">
      <div class="message">
        <div v-if="isNow">
          <span v-if="fr"
            >Finito! ipsum occati illum estotas dolupi- et laut que repudandant.
            Cipsam faccatur reperum vollum incidebis dollamus inustias este
            vendell uptasperchil int estiatur ma.</span
          >
          <span v-else>EN</span>
        </div>
        <div v-else>
          <span v-if="fr"
            >Finito! ipsum occati illum estotas dolupi- et laut que repudandant.
            Cipsam
          </span>
          <span v-else>EN</span>
        </div>
      </div>

      <ContinueButton
        @click.native="onContinue()"
        :text="fr ? 'Retour au menu principal' : 'Back to main menu'"
      />
    </div>

    <ul class="list">
      <div class="title">Mon panier 1920</div>
      <li v-for="(i, index) in panier.then.list" :key="i.fr + index">
        {{ i[fr ? 'fr' : 'en'] }}
      </li>
      <div class="bottom">
        <div v-if="fr">
          <span>Coût total:</span>
          <div class="cost">{{ total.then }} $</div>
        </div>
        <div v-else>
          <span>Total cost:</span>
          <div class="cost">{{ total.then }}$</div>
        </div>
      </div>
    </ul>
    <ul class="list">
      <div class="title">Mon panier aujourd'hui</div>
      <li v-for="(i, index) in panier.now.list" :key="i.fr + index">
        {{ i[fr ? 'fr' : 'en'] }}
      </li>
      <div class="bottom">
        <div v-if="fr">
          <span>Coût total:</span>
          <div class="cost">{{ total.now }} $</div>
        </div>
        <div v-else>
          <span>Total cost:</span>
          <div class="cost">{{ total.now }}$</div>
        </div>
      </div>
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
    fr() {
      return this.$store.state.lang == 'fr'
    },
    total() {
      let total = 0
      let arr = {}
      arr.then = this.panier.then.list
        .reduce(
          (accumulator, currentValue) => accumulator + currentValue['then'],
          total
        )
        .toFixed(2)

      total = 0
      arr.now = this.panier.now.list
        .reduce(
          (accumulator, currentValue) => accumulator + currentValue['now'],
          total
        )
        .toFixed(2)

      return arr
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
  .bottom {
    position: absolute;
    bottom: 0;
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
