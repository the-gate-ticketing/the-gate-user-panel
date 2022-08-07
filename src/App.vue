<template>
  <div class="full-size" id="app">
    <router-view name="header" />
    <div class="wrapper">
      <router-view />
    </div>
    <router-view name="footer" />
  </div>
</template>
<style scoped>
.wrapper {
  padding-bottom: 16rem;
}
@media (max-width: 480px) and (min-width: 320px) {
  .wrapper {
    padding-bottom: 32rem;
  }
}
.full-size {
  min-height: 100%;
  position: relative;
}
</style>
