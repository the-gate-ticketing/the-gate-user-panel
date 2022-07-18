<template>
  <div class="section pb-0">
    <div class="container">
      <div class="row">
        <div class="col-md-8 ml-auto mr-auto text-center">
          <h3 class="title">Hot Events</h3>
        </div>
      </div>
      <div v-if="events.length">
        <div class="row justify-content-center">
          <div class="col-10">
            <el-carousel height="500px">
              <el-carousel-item v-for="event in events" :key="event.shortName">
                <a :href="`/event/${event.shortName}`">
                  <img
                    class="d-block img-raised"
                    :src="`/file/${event.fileBlobId}`"
                    :alt="event.title['en']"
                  />
                </a>
                <div class="carousel-caption d-none d-md-block">
                  <h5>{{ event.title["en"] }}</h5>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </div>
      <div v-else class="col-12 text-center">
        <p>No events are available at the moment.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Carousel, CarouselItem } from "element-ui";

export default {
  components: {
    [Carousel.name]: Carousel,
    [CarouselItem.name]: CarouselItem,
  },
  computed: mapGetters({
    events: "events/events",
  }),
};
</script>
<style></style>
