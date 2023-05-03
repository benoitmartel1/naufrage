<template>
  <div>
    <div class="main">
      <div class="btn panier">
        <NuxtLink to="/panier">
          <div class="title">
            <span v-if="lang == 'fr'">Dans mon p'tit panier...</span>
            <span v-else>EN Dans mon p'tit panier...</span>
          </div>
          <div class="icon"></div>
        </NuxtLink>
      </div>
      <div class="btn vore">
        <NuxtLink to="/vore">
          <div class="title">
            <span v-if="lang == 'fr'">Quel <i>vore</i> es-tu ?</span>
            <span v-else>EN Dans mon p'tit panier...</span>
          </div>
          <div class="icon"></div>
        </NuxtLink>
      </div>
      <div class="btn croire">
        <NuxtLink to="/croire">
          <div class="title">
            <span v-if="lang == 'fr'">J'sais pas si tu vas m'croire?</span>
            <span v-else>EN Dans mon p'tit panier...</span>
          </div>
          <div class="icon"></div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'default',
  data() {
    return {}
  },
  async created() {
    let baseURL =
      process.env.NODE_ENV == 'development'
        ? 'http://localhost:8080'
        : 'file:///opt/par/resources'
    // this.approMode = process.env.NODE_ENV == 'development';

    //For web export appro
    baseURL = window.location.origin + '/vj'

    //Load settings in external json file
    this.settings = await this.$axios
      .get('extraResources/settings.json', { baseURL: baseURL })
      .then((res) => {
        console.log(76)
        console.log(res.data.settings)
        return res.data.settings
      })
  },
  computed: {
    lang() {
      return this.$store.state.lang
    },
  },

  beforeMount() {
    this.$store.commit('resetGameData')
  },
}
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  width: 80%;
  margin: auto;
  gap: 30px;
  padding: 30px;

  justify-content: space-between;
  .btn {
    flex: 1;
    display: flex;
    padding: 30px;
    text-align: center;
    height: 600px;
    border: 2px solid black;
    background-color: white;
  }
  .btn:active {
    flex: 1;
    display: flex;
    padding: 30px;
    // margin-right: 30px;
    height: 600px;
    border: 2px solid black;
    background-color: #ddd;
  }
}
</style>
