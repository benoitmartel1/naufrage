<template>
  <div class="main-wrapper">
    <Boucher />
    <div class="bulle-wrapper">
      <div class="bulle">
        <div class="message">
          <div>
            <span v-if="fr"
              >La viande est associée à des croyances qui sont partiellement
              vraies ou totalement inventées. Saurez-vous faire la distinction
              entre mythe et réalité? Je gage 10 cennes que vous réussirez les
              mains dans les poches!</span
            >
            <span v-else
              >Meat is associated with beliefs that are partly true or totally
              invented. Will you be able to distinguish myth from reality? I'll
              bet you 10 cents you won't!</span
            >
          </div>
        </div>

        <ContinueButton @click.native="onContinue()" />
      </div>
    </div>
    <div class="frame"></div>
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
  //   left: 75%;
}
.bulle-wrapper {
  //   border: 1px solid yellow;
  width: 100%;
  height: 90%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.bulle {
  width: 853px;
  position: unset;
  margin-left: 333px;
  //   margin-top: -100px;
  //   min-height: 315px;
  &:after {
    top: 50%;
  }
}
</style>
