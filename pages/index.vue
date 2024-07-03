<template>
  <div class="wrapper">
    <div>Choisir la borne</div>
    <div class="choix">
      <div @pointerdown="goToBorne(0)">
        <div class="number">1</div>
        Tous les naufrages
      </div>
      <div @pointerdown="goToBorne(1)">
        <div class="number">2</div>
        Jean Richard
      </div>
      <div @pointerdown="goToBorne(2)">
        <div class="number">3</div>
        Aigle d'océan
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToBorne(nb) {
      this.$store.commit('setBorne', nb)
      this.$router.push('/langue')
    },
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 65vw;
  height: 60vh;
  margin: auto;
  margin-top: 15vh;
  text-align: center;
}
.choix {
  margin-top: 80px;
  display: flex;
  justify-content: space-between;
  width: 100%;

  .number {
    margin-bottom: 20px;
  }
  > div {
    padding: 20px;
    border: 2px solid white;
    border-radius: 100%;
    width: 18vw;
    height: 18vw;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-top: 80px;
    flex-direction: column;
  }
}
</style>
