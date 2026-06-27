<template>
  <main class="v-policies">
    <header class="v-policies__head">
      <p class="v-label v-reveal">The fine print</p>
      <h1 class="v-display v-policies__title v-reveal" style="animation-delay: 0.1s">
        Our <em>policies</em>
      </h1>
    </header>

    <div class="v-policies__cards">
      <router-link
        to="/our-policies/purchase-policies"
        class="v-policies__card v-reveal"
        style="animation-delay: 0.2s"
      >
        <h2>Purchase policies</h2>
        <p>Tickets, payments, refunds and entry requirements.</p>
        <span>Read →</span>
      </router-link>
      <router-link
        to="/our-policies/privacy-policies"
        class="v-policies__card v-reveal"
        style="animation-delay: 0.3s"
      >
        <h2>Privacy policies</h2>
        <p>What we collect, why, and how we protect it.</p>
        <span>Read →</span>
      </router-link>
    </div>
  </main>
</template>

<script>
export default {
  name: "VenuePolicies",
};
</script>

<style scoped lang="scss">
@import "~@/venue/styles/defaults";

.v-policies {
  max-width: 900px;
  margin: 0 auto;
  padding: 7.5rem 1.5rem 2rem;
}

.v-policies__head {
  margin-bottom: 2.8rem;
}

.v-policies__title {
  font-size: 2.6rem;
  margin-top: 0.8rem;
}

.v-policies__cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.4rem;
}

.v-policies__card {
  display: block;
  padding: 2rem 1.8rem;
  border: 1px solid rgba(59, 49, 38, 0.22);
  border-radius: $venue-radius;
  transition: border-color 0.3s $venue-ease, transform 0.3s $venue-ease;

  h2 {
    font-family: $venue-font-display;
    font-size: 1.5rem;
    color: $venue-ink;
    margin-bottom: 0.5rem;
  }

  p {
    color: $venue-ink-soft;
    font-size: 0.95rem;
    margin-bottom: 1.2rem;
  }

  span {
    font-size: 0.8125rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: $venue-cta;
  }

  &:hover,
  &:focus {
    text-decoration: none;
    border-color: $venue-cta;
    transform: translateY(-3px);
  }
}

@media (min-width: 768px) {
  .v-policies__title {
    font-size: 3.6rem;
  }

  .v-policies__cards {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
