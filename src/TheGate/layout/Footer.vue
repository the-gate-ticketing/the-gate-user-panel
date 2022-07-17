<template>
  <footer
    class="footer fixed-footer"
    :class="{ [`footer-${type}`]: type }"
    :data-background-color="backgroundColor"
  >
    <div class="container">
      <div class="text-center">
        Copyright &#169; {{ year }} THE GATE. All Rights Reserved.
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  props: {
    backgroundColor: String,
    type: String,
  },
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>
<style scoped>
.fixed-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 4rem;
}
</style>
