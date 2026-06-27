<template>
  <main class="v-about">
    <header class="v-about__head">
      <p class="v-label v-reveal">About</p>
      <h1 class="v-display v-about__title v-reveal" style="animation-delay: 0.1s">
        {{ content.about.title }} <em>{{ content.about.titleAccent }}</em>
      </h1>
    </header>

    <div class="v-rule"></div>

    <div class="v-about__body">
      <p
        v-for="(paragraph, i) in content.about.paragraphs"
        :key="i"
        :class="i === 0 ? 'v-editorial v-about__lead' : 'v-about__text'"
      >
        {{ paragraph }}
      </p>

      <router-link class="v-btn v-about__cta" to="/events">
        See what's on
      </router-link>
    </div>
  </main>
</template>

<script>
import content from "@theme/content";

export default {
  name: "VenueAbout",
  data() {
    return { content };
  },
};
</script>

<style scoped lang="scss">
@import "~@/venue/styles/defaults";

.v-about {
  max-width: 760px;
  margin: 0 auto;
  padding: 7.5rem 1.5rem 2rem;
}

.v-about__head {
  margin-bottom: 2.4rem;
}

.v-about__title {
  font-size: 2.6rem;
  margin-top: 0.8rem;
}

.v-about__body {
  padding-top: 2.6rem;
}

.v-about__lead {
  font-size: 1.45rem;
  color: $venue-ink;
  margin-bottom: 1.6rem;
}

.v-about__text {
  font-size: 1rem;
  line-height: 1.75;
  color: $venue-ink-soft;
  margin-bottom: 1.4rem;
}

.v-about__cta {
  margin-top: 1.4rem;
}

@media (min-width: 768px) {
  .v-about__title {
    font-size: 3.6rem;
  }
}
</style>
