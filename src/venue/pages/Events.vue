<template>
  <main class="v-events">
    <header class="v-events__head">
      <p class="v-label v-reveal">{{ content.brandName }}</p>
      <h1 class="v-display v-events__title v-reveal" style="animation-delay: 0.1s">
        What's <em>on</em>
      </h1>
    </header>

    <div v-if="events.length" class="v-events__grid">
      <div
        v-for="(event, i) in events"
        :key="event.shortName"
        class="v-reveal"
        :style="{ animationDelay: 0.08 * Math.min(i, 6) + 's' }"
      >
        <event-card :event="event" />
      </div>
    </div>

    <div v-else class="v-events__empty">
      <p class="v-editorial">
        Nothing on sale right now — the next one is never far away.
      </p>
      <a
        v-if="content.contact && content.contact.instagram"
        class="v-btn v-btn--ghost"
        :href="`https://www.instagram.com/${content.contact.instagram}/`"
        target="_blank"
        rel="noopener"
      >
        Follow @{{ content.contact.instagram }}
      </a>
    </div>
  </main>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import content from "@theme/content";
import EventCard from "@/venue/components/EventCard";

export default {
  name: "VenueEvents",
  components: { EventCard },
  data() {
    return { content };
  },
  computed: mapGetters({ events: "events/events" }),
  methods: {
    ...mapActions({ fetchEvents: "events/fetchEvents" }),
  },
  async created() {
    await this.fetchEvents();
  },
};
</script>

<style scoped lang="scss">
@import "~@/venue/styles/defaults";

.v-events {
  max-width: 1140px;
  margin: 0 auto;
  padding: 7.5rem 1.5rem 2rem;
}

.v-events__head {
  margin-bottom: 2.8rem;
}

.v-events__title {
  font-size: 2.8rem;
  margin-top: 0.8rem;
}

.v-events__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.8rem;
  max-width: 420px;
  margin: 0 auto;
}

.v-events__empty {
  padding: 4rem 0 6rem;
  max-width: 460px;

  .v-btn {
    margin-top: 1.6rem;
  }
}

@media (min-width: 576px) {
  .v-events__grid {
    grid-template-columns: repeat(2, 1fr);
    max-width: none;
    margin: 0;
  }
}

@media (min-width: 992px) {
  .v-events__grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .v-events__title {
    font-size: 4rem;
  }
}
</style>
