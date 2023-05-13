<template>
  <div :class="[' main-wrapper main', { old: era == 'then' }]">
    <Boucher />
    <div class="backdrop"></div>
    <div class="bulle">
      <div class="message">
        <div v-if="era == 'now'">
          <span v-if="lang == 'fr'"
            ><div class="title">L’épicerie dans les années 2020</div>
            Aujourd’hui, c’est jour d’épicerie! Ajoutez tout ce qui vous tente
            dans le p’tit panier. On verra bien ce que vous trouverez à manger!
            Vous avez 100 $ à dépenser.
          </span>
          <span v-else
            ><div class="title">The grocery in the 2020s</div>
            Today is grocery day! Add everything you'd like to the little
            basket. Then we'll see what you find to eat! You have $100 to
            spend.</span
          >
        </div>
        <div v-else>
          <span v-if="lang == 'fr'"
            ><div class="title">L’épicerie dans les années 1920</div>
            C’est à mon tour de faire la commande de la semaine. Qu’est-ce qu’on
            mange? Histoire de me donner des idées, vous mettriez quoi, dans mon
            p’tit panier? Vous avez un gros 7 $ à dépenser.
          </span>
          <span v-else
            ><div class="title">The grocery in the 1920s</div>
            Now it's my turn to make the order for the week. What shall we eat?
            Give me some ideas, what would you put in my little basket? You have
            a whole $7 to spend.
          </span>
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
  //   left: 75% !important;
}
.title {
  font-weight: 800;
  margin-bottom: 30px;
}
.bulle {
  width: 853px;
  height: 615px;
  position: absolute;
  left: 333px;
  top: 158px;

  &:after {
    transform: scaleY(-1);
    top: 300px;
    border-bottom-width: 150px;
    border-right-width: 166px;
    right: -130px;
  }
}
</style>
