<template>
  <div class="header title">{{ text.toUpperCase() }}</div>
</template>

<script>
export default {
  props: ['text'],
}
</script>

<style lang="scss" scoped>
.header {
  text-align: center;
  margin-bottom: 30px;
  min-height: 50px;
}
</style>
