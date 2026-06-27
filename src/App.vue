<template>
  <div class="full-size" :class="themeClass" id="app">
    <router-view name="header" />
    <div class="wrapper">
      <router-view />
    </div>
    <router-view name="footer" />
  </div>
</template>
<script>
export default {
  computed: {
    themeClass() {
      return `theme-${process.env.VUE_APP_THEME || "the-gate"}`;
    },
  },
};
</script>
<style scoped>
/* The bottom padding compensates for THE GATE footer; venue themes use a normal-flow footer. */
.theme-the-gate .wrapper {
  padding-bottom: 16rem;
}
@media (max-width: 480px) and (min-width: 320px) {
  .theme-the-gate .wrapper {
    padding-bottom: 32rem;
  }
}
.full-size {
  min-height: 100%;
  position: relative;
}
</style>
