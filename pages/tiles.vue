<template>
  <div>
    <NuxtLink to="/panier/">Child</NuxtLink>
    <div class="tile">
      <NuxtChild />
    </div>
  </div>
</template>

<script>
//Load local JSON content

export default {
  //   layout: 'print',
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
}
</script>

<style>
:root {
  --appro-scale: 2;
}

.casier .appro {
  width: var(--app-width);
  height: var(--app-height);
  /* float: left; */
  overflow: hidden;
  display: block;
  /* height: 192px;
  width: 120px; */
  transform: scale(calc(var(--appro-scale) / 10));
  zoom: 1;
  /* border: 1px yellow solid; */
}
.casier .main-wrapper {
  /* width: 1180px;
  margin: auto;
  margin-top: 47px; */

  width: 1180px;
  height: 1810px;
  margin: 47px auto auto;
}

.casier {
  margin: 5px 5px;
  width: calc(var(--app-width) / 10 * var(--appro-scale));
  height: calc(var(--app-height) / 10 * var(--appro-scale));
  float: left;
  overflow: hidden;
}

h1 {
  text-transform: uppercase;
  font-weight: 900;
  font-size: 50px;
}
button {
  font-size: 96px;
}
#main > div:not(.back) {
  z-index: 1;
  width: 100%;
}
#main {
  margin: 0;
  top: 104px;
  padding: 0;
  height: 1704px;
}
.experience {
  padding: 10px;
  height: 180px;
}
.experience img {
  width: 70%;

  margin: auto;
  display: block;
  /* margin: auto; */
}
#pdf {
  overflow: auto;
}
#pdf .controls {
  display: flex;
  justify-content: center;
  width: 100%;
}
#pdf .approMode {
  margin-right: 0 !important;
  font-size: 18px;
  padding: 5px;
  min-width: 200px;
  justify-content: center;
}
@page {
  size: A4;
  margin: 0;
}
@media print {
  #pdf .controls {
    display: none !important;
  }
  body {
    background-color: white;
  }
  #pdf {
    /* width: 100%; */
    /* min-height: 29.7cm !important; */
  }
  .casier {
    margin: auto;
    margin-top: 0.3in;
    float: none;
    width: 7.5in !important;
    height: 11in !important;
    page-break-after: always;
  }
  .casier .appro {
    /* width: 210mm !important;
    height: 297mm !important; */
    /* float: left; */
    display: block;
    /* height: 192px;
  width: 120px; */
    /* transform-origin: 50% 50%; */
    transform: scale(0.54);
    margin: 0.12in 0 0 0.12in;
    /* zoom: 1; */
    /* border: 3px yellow solid; */
  }
}
</style>
