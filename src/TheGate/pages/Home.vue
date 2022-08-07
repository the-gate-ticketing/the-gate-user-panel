<template>
  <div>
    <div class="page-header page-header-small" filter-color="orange">
      <parallax class="page-header-image" :style="backgroundImageStyle">
      </parallax>
      <div class="container">
        <div class="content-center brand">
          <h1 class="h1-seo">THE GATE</h1>
          <h3>Your enterance to happiness.</h3>
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
import { version } from "../../../package.json";

export default {
  bodyClass: "index-page",
  components: {
    EventsCarousel,
    HomeEvents,
  },
  data() {
    return { version };
  },
  computed: {
    currentEnv() {
      return process.env.NODE_ENV;
    },
    backgroundImageStyle() {
      return this.currentEnv === "development"
        ? "background-image: url('/home-bg.jpeg');"
        : `background-image: url('webjars/the-gate-user-panel/v${this.version}/home-bg.jpeg');`;
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
