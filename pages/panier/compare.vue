<template>
  <div class="main-wrapper compare">
    <div class="backdrop"></div>
    <Boucher />
    <div class="bulle">
      <div class="message">
        <span v-if="fr"
          >Avez-vous trouvé tout ce qu’il vous faut pour le souper? Vos aliments
          préférés sont dans quel panier? La liste d’épicerie s’est transformée
          avec les années, avez-vous remarqué?</span
        >
        <span v-else
          >Have you found everything you need for supper? Are your favourite
          foods in the basket? Have you noticed how the grocery list has changed
          over the years?</span
        >
      </div>

      <ContinueButton
        @click.native="onContinue()"
        :text="fr ? 'Retour au<br>menu principal' : 'Back to main menu'"
      />
    </div>
    <List
      :list="panier.then.list"
      :types="types"
      :era="'then'"
      :lang="lang"
      :left="total.then"
      :isCompare="true"
    />
    <List
      :list="panier.now.list"
      :types="types"
      :era="'now'"
      :lang="lang"
      :left="total.now"
      :isCompare="true"
    />
  </div>
</template>

<script>
import { types } from '~/static/data/types.json'
export default {
  data() {
    return {
      types: types,
      panier: this.$store.state.panier,
    }
  },
  computed: {
    fr() {
      return this.$store.state.lang == 'fr'
    },
    lang() {
      return this.$store.state.lang
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
<style lang="scss">
.compare {
  .remove {
    opacity: 0 !important;
  }
  .btn {
    cursor: default;
  }
  .flip {
    transform: scaleX(-1);
  }
}
</style>
<style lang="scss" scoped>
.list {
  background-color: white;
  width: 444px;
  height: 859px;
  position: absolute;
  @include bordered;
  border-color: var(--red);
  border-width: 6px;
  border-radius: 11px;
  box-shadow: 12px 12px 12px rgba(0, 0, 0, 0.2);
  padding: 30px;
  border-color: var(--brown);
  left: 855px;
  top: 103px;
  z-index: 100;
  transform: rotate(-2deg);

  &:last-of-type {
    left: 1310px;
    top: 54px;
    transform: rotate(3deg);
  }
}
.boucher {
  left: 700px;
  bottom: 780px;
  //   z-index: 150;
}
.bulle {
  width: 706px;
  //   height: 462px;
  left: 106px;
  top: 33px;
  z-index: 0;

  &:after {
    transform: rotate(-90deg) scaleX(-1);
    top: 100%;
    left: 5%;
  }
}
</style>
