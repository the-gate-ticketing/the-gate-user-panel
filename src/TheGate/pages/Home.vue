<template>
  <div>
    <div class="page-header page-header-small" filter-color="orange">
      <parallax class="page-header-image" :style="backgroundImageStyle">
      </parallax>
      <div class="container">
        <div class="content-center brand">
          <img
            class="n-logo"
            :src="
              currentEnv === 'development'
                ? 'img/now-logo.png'
                : 'webjars/the-gate-user-panel/v1.0.3/img/now-logo.png'
            "
            alt=""
          />
          <h1 class="h1-seo">THE GATE</h1>
          <h3>Your way to parties.</h3>
        </div>
      </div>
    </div>
    <events-carousel></events-carousel>
    <home-events></home-events>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { EventsCarousel, HomeEvents } from "@/TheGate/components";

export default {
  bodyClass: "index-page",
  components: {
    EventsCarousel,
    HomeEvents,
  },
  computed: {
    currentEnv() {
      return process.env.NODE_ENV;
    },
    backgroundImageStyle() {
      return this.currentEnv === "development"
        ? "background-image: url('img/header.jpg');"
        : "background-image: url('webjars/the-gate-user-panel/v1.0.3/img/header.jpg');";
    },
  },
  methods: {
    ...mapActions({
      fetchEvents: "events/fetchEvents",
    }),
  },
  async created() {
    await this.fetchEvents();
  },
};
</script>
