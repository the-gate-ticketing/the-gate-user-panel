<template>
  <div class="section">
    <div class="container">
      <div class="row">
        <div class="col-md-12 ml-auto mr-auto text-center">
          <h2 class="title">All available tickets</h2>
        </div>
        <div
          v-for="event in events"
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
              <span class="d-block mt-2">
                {{ event.formattedBeginDate["en"] }} -
                {{ event.formattedEndDate["en"] }}
              </span>
              <span class="d-block font-weight-bold mt-2">
                {{ event.location }}
              </span>
              <!-- <span class="d-block mt-2">
                600 <i class="el-icon-right"></i> 800 EGP
              </span> -->
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
import { mapActions, mapGetters } from "vuex";
import { Button } from "@/components";
import { Card } from "element-ui";

export default {
  components: {
    [Button.name]: Button,
    [Card.name]: Card,
  },
  computed: mapGetters({
    events: "events/events",
  }),
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
