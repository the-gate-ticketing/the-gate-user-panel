<template>
  <main class="v-policy">
    <header class="v-policy__head">
      <router-link to="/our-policies" class="v-policy__back">
        ← Our policies
      </router-link>
      <h1 class="v-display v-policy__title">{{ title }}</h1>
    </header>

    <div class="v-rule"></div>

    <section
      v-for="(section, i) in sections"
      :key="i"
      class="v-policy__section"
    >
      <h2 v-if="section.heading">{{ section.heading }}</h2>
      <p v-for="(paragraph, j) in section.body" :key="j">{{ paragraph }}</p>
    </section>
  </main>
</template>

<script>
export default {
  name: "PolicyDocument",
  props: {
    title: { type: String, required: true },
    sections: { type: Array, required: true },
  },
};
</script>

<style scoped lang="scss">
@import "~@/venue/styles/defaults";

.v-policy {
  max-width: 720px;
  margin: 0 auto;
  padding: 7.5rem 1.5rem 2rem;
}

.v-policy__back {
  display: inline-block;
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: $venue-cta;
  margin-bottom: 1.4rem;

  &:hover,
  &:focus {
    color: $venue-cta-hover;
    text-decoration: none;
  }
}

.v-policy__head {
  margin-bottom: 2.2rem;
}

.v-policy__title {
  font-size: 2.4rem;
}

.v-policy__section {
  padding-top: 2.2rem;

  h2 {
    font-family: $venue-font-display;
    font-size: 1.35rem;
    color: $venue-ink;
    margin-bottom: 0.8rem;
  }

  p {
    font-size: 0.975rem;
    line-height: 1.75;
    color: $venue-ink-soft;
    margin-bottom: 1rem;
  }
}

@media (min-width: 768px) {
  .v-policy__title {
    font-size: 3.2rem;
  }
}
</style>
