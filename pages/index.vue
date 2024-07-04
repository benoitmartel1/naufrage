<template>
  <div class="wrapper">
    <!-- {{ settings }} -->
    <div>Choisir la borne</div>
    <div class="choix">
      <div @pointerdown="goToBorne(1)">
        <div class="number">1</div>
        Tous les naufrages
      </div>
      <div @pointerdown="goToBorne(2)">
        <div class="number">2</div>
        Jean Richard
      </div>
      <div @pointerdown="goToBorne(3)">
        <div class="number">3</div>
        Aigle d'océan
      </div>
    </div>
  </div>
</template>

<script>
const qs = require('qs')

export default {
  async created() {
    try {
      const { data } = qs.parse(location.search.slice(1))
      const { path } = qs.parse(location.search.slice(1))
      const { settings } = JSON.parse(data)
      console.log(settings)
      //   settings.videoPath = path + '\\extraResources\\' + settings.videoPath
      this.$store.commit('setSettings', settings)
    } catch (error) {
      //   let baseURL =
      //     // process.env.NODE_ENV == 'development'
      //     //   ? 'http://localhost:3000'
      //     //   : 'file:///opt/par/resources'
      //     window.location.origin + process.env.NODE_ENV == 'development'
      //       ? '/vj'
      //       : ''
      //   await this.$axios
      //     .get('extraResources/settings.json', { baseURL: baseURL })
      //     .then((res) => {
      //       res.data.settings.videoPath =
      //         'extraResources/' + res.data.settings.videoPath
      //       this.$store.commit('setSettings', res.data.settings)
      //       console.log(this.$store.state.settings)
      //     })
    }
  },
  methods: {
    goToBorne(nb) {
      this.$store.commit('setBorne', nb)
      this.$router.push('/langue')
    },
  },
  mounted() {
    if (this.$store.state.borne) {
      this.$router.push('/langue')
    }
  },
  computed: {
    borneIndex() {
      return this.$store.state.borne
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
  line-height: 1em;
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
