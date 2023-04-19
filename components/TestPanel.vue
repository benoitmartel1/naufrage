<template>
  <div class="testPanel">
    <div class="video">
      <label for="">Temps avant la vidéo</label>
      <input id="videoInput" type="text" value="10" />
      <button @click="startVideo()">Lancer vidéo</button>
    </div>

    <div class="volume">
      <button @click="setVolume(0)">Volume 0</button>
      <button @click="setVolume(0.5)">Volume 0.5</button>
      <button @click="setVolume(1)">Volume 1</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    setVolume(value) {
      this.$parent.onWsMessage({ type: 'volume', value: value })
    },
    startVideo() {
      let value = document.querySelector('#videoInput').value
      this.$parent.onWsMessage({ type: 'start', value: value })
    },
  },
}
</script>

<style lang="scss" scoped>
.testPanel {
  color: white;
  //   position: absolute;
  display: flex;
  z-index: 200;
  width: $width;
  align-items: center;
  justify-content: space-between;
  opacity: 0.4;
  margin-top: 50px;
}
button,
input {
  font-size: 0.8em;
}
input {
  width: 80px;
}
button {
  width: 150px;
  height: 150px;
}
</style>
