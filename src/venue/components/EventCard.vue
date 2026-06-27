<template>
  <article class="v-event">
    <a :href="bookingUrl" class="v-event__arch" :aria-label="title">
      <img v-if="event.fileBlobId" :src="`/file/${event.fileBlobId}`" :alt="title" />
      <div v-else class="v-event__arch-fallback">
        <span>{{ title }}</span>
      </div>
    </a>
    <div class="v-event__body">
      <h3 class="v-event__title">{{ title }}</h3>
      <p class="v-event__meta">
        <span>{{ dates }}</span>
        <span v-if="event.location" class="v-event__loc">{{ event.location }}</span>
      </p>
      <a class="v-btn v-event__cta" :href="bookingUrl">Book now</a>
    </div>
  </article>
</template>

<script>
export default {
  name: "EventCard",
  props: {
    event: { type: Object, required: true },
  },
  computed: {
    title() {
      return (this.event.title && this.event.title.en) || this.event.shortName;
    },
    dates() {
      const begin =
        this.event.formattedBeginDate && this.event.formattedBeginDate.en;
      const end = this.event.formattedEndDate && this.event.formattedEndDate.en;
      return begin === end ? begin : `${begin} — ${end}`;
    },
    bookingUrl() {
      return `/event/${this.event.shortName}`;
    },
  },
};
</script>

<style scoped lang="scss">
@import "~@/venue/styles/defaults";

// Full-height column so siblings in a stretched grid row align their CTAs,
// even when a title or date wraps to a different number of lines.
.v-event {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.v-event__arch {
  display: block;
  border-radius: $venue-arch;
  overflow: hidden;
  background: $venue-cream;
  // Keeps the portal proportions steady regardless of the uploaded artwork.
  aspect-ratio: 4 / 5;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.7s $venue-ease;
  }

  &:hover img,
  &:focus img {
    transform: scale(1.045);
  }
}

// aspect-ratio fallback for older mobile browsers
@supports not (aspect-ratio: 4 / 5) {
  .v-event__arch {
    position: relative;
    padding-top: 125%;

    img,
    .v-event__arch-fallback {
      position: absolute;
      inset: 0;
    }
  }
}

.v-event__arch-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 2.5rem 1rem;
  background: linear-gradient(180deg, $venue-accent 0%, $venue-cta 100%);

  span {
    font-family: $venue-font-display;
    font-size: 1.3rem;
    color: #fff;
    text-align: center;
  }
}

.v-event__body {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.1rem 0.25rem 0;
  text-align: center;
}

.v-event__title {
  font-family: $venue-font-display;
  font-size: 1.35rem;
  font-weight: 600;
  color: $venue-ink;
  margin: 0 0 0.35rem;
}

.v-event__meta {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  font-size: 0.875rem;
  color: $venue-ink-soft;
  margin-bottom: 0.9rem;
}

.v-event__loc {
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-size: 0.75rem;
}

.v-event__cta {
  margin-top: auto; // pin to the bottom so CTAs align across cards
  padding: 0.7rem 1.8rem;
}
</style>
