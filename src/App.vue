<template>
  <div class="full-size" id="app">
    <router-view name="header" />
    <div class="wrapper">
      <router-view />
    </div>
    <router-view name="footer" />
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.wrapper {
  padding-bottom: 4rem;
}
.full-size {
  min-height: 100%;
  position: relative;
}
</style>
