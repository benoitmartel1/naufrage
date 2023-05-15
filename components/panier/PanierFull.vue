<template>
  <div class="wrapper panier-full">
    <div>
      <Boucher />
      <div class="bulle">
        <div class="message">
          <div class="total">
            {{
              lang == 'fr'
                ? padded(total).replace('.', ',') + ' $'
                : '$' + padded(total)
            }}
          </div>
          <div v-if="era == 'now'">
            <span v-if="lang == 'fr'"
              >Wôôô!!! Vous avez beaucoup dépensé! D’après moi, vous avez des
              réserves pour le mois au complet! Il y a des aliments que je n’ai
              jamais vus au village… C’est étonnant!</span
            >
            <span v-else
              >Whoa!!! You have spent a lot! I think you'll have enough for the
              whole month! There are foods I've never seen in the village, it's
              surprising!</span
            >
          </div>
          <div v-else>
            <span v-if="lang == 'fr'"
              >Merci de votre aide! C’est un {{ max }} $ bien investi! Juste à
              regarder les aliments que vous avez choisis, je sens mon ventre
              gargouiller!</span
            >
            <span v-else
              >Thanks for your help! That's ${{ max }} well invested! Just look
              at the food you've picked out. I can feel my stomach growling
              already!
            </span>
          </div>
        </div>

        <ContinueButton @click.native="$emit('continue')" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { era: this.$store.state.panier.then.list.length ? 'then' : 'now' }
  },
  props: ['total'],
  computed: {
    lang() {
      return this.$store.state.lang
    },
    max() {
      return this.$store.state.panier[this.era].max
    },
  },
  methods: {
    padded(n) {
      return n.toString().split('.')[1].length < 2 ? n.toString() + '0' : n
    },
  },
}
</script>
<style lang="scss">
.panier-full .boucher {
  .flip {
    transform: scaleX(-1);
  }
  left: 583px;
}
</style>
<style lang="scss" scoped>
.boucher {
  .flip {
    transform: scaleX(-1);
  }
  left: 583px;
}
.total {
  font-weight: 700;
  width: 100%;
  text-align: center;
  font-size: 88px;
  margin: 30px 0 60px 0;
}
.wrapper {
  position: absolute;
  z-index: 100;
  .bulle {
    width: 853px;
    height: 615px;
    top: 158px;
    left: 656px;
    &:after {
      transform: scale(-1, -1);

      left: -150px;
      top: 280px;
    }
  }
}
</style>
