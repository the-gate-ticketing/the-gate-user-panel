<template>
  <div>
    <div class="page-header page-header-small" filter-color="orange">
      <parallax
        class="page-header-image"
        style="background-image: url('img/header.jpg')"
      >
      </parallax>
      <div class="container">
        <div class="content-center brand">
          <img class="n-logo" src="img/now-logo.png" alt="" />
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
