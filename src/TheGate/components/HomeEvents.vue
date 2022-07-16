<template>
  <div class="section pt-0">
    <div class="container">
      <div class="row">
        <div class="col-md-12 ml-auto mr-auto text-center">
          <h4 class="title">Available tickets</h4>
          <router-link
            :to="EVENTS_PATH"
            class="btn btn-simple btn-primary btn-round"
          >
            See More
          </router-link>
        </div>
        <div
          v-for="event in events.slice(0, 6)"
          :key="event.shortName"
          class="col-md-4 mt-2"
        >
          <el-card class="h-100">
            <img
              :src="`https://thegateticket.herokuapp.com/file/${event.fileBlobId}`"
            />
            <div class="p-3">
              <span class="d-block font-weight-bold">
                {{ event.title["en"] }}
              </span>
              <span class="mt-2">
                {{ event.formattedBeginDate["en"] }} -
                {{ event.formattedEndDate["en"] }}
              </span>
              <a
                class="btn btn-primary"
                :href="`https://thegateticket.herokuapp.com/event/${event.shortName}`"
              >
                Book Now
              </a>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Button } from "@/components";
import { Card } from "element-ui";
import { EVENTS_PATH } from "../router";

export default {
  components: {
    [Button.name]: Button,
    [Card.name]: Card,
  },
  data() {
    return { EVENTS_PATH };
  },
  computed: mapGetters({
    events: "events/events",
  }),
};
</script>
