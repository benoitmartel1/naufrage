<template>
  <div class="wrapper panier-full">
    <div>
      <Boucher />
      <div class="bulle">
        <div class="message">
          <div class="total">{{ total.replace('.', ',') + ' $' }}</div>
          <span v-if="lang == 'fr'"
            >Lorem! ipsum occati illum estotas dolupi- et laut que repudandant.
            Cipsam faccatur reperum vollum incidebis dollamus inustias este
            vendell uptasperchil int estiatur ma.</span
          >
          <span v-else>EN</span>
        </div>

        <ContinueButton @click.native="$emit('continue')" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['total'],
  computed: {
    lang() {
      return this.$store.state.lang
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
