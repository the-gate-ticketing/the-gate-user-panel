<template>
  <footer class="v-footer">
    <div class="v-footer__inner">
      <p class="v-footer__line v-display">
        {{ content.footerLine }} <em>{{ content.footerLineAccent }}</em>
      </p>

      <div class="v-footer__cols">
        <div>
          <p class="v-footer__heading">Explore</p>
          <ul>
            <li><router-link to="/events">Events</router-link></li>
            <li><router-link to="/about-us">About us</router-link></li>
          </ul>
        </div>
        <div>
          <p class="v-footer__heading">Policies</p>
          <ul>
            <li>
              <router-link to="/our-policies/purchase-policies">
                Purchase policies
              </router-link>
            </li>
            <li>
              <router-link to="/our-policies/privacy-policies">
                Privacy policies
              </router-link>
            </li>
          </ul>
        </div>
        <div v-if="content.contact">
          <p class="v-footer__heading">Contact</p>
          <ul>
            <li v-if="content.contact.email">
              <a :href="`mailto:${content.contact.email}`">
                {{ content.contact.email }}
              </a>
            </li>
            <li v-if="content.contact.phone">
              <a :href="`tel:${content.contact.phone}`">
                {{ content.contact.phone }}
              </a>
            </li>
            <li v-if="content.contact.instagram">
              <a
                :href="`https://www.instagram.com/${content.contact.instagram}/`"
                target="_blank"
                rel="noopener"
              >
                @{{ content.contact.instagram }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="v-footer__base">
        <span>© {{ year }} {{ content.brandName }}. All rights reserved.</span>
        <span>Ticketing by The Gate.</span>
      </div>
    </div>
  </footer>
</template>

<script>
import content from "@theme/content";

export default {
  name: "VenueFooter",
  data() {
    return { content };
  },
  computed: {
    year() {
      return new Date().getFullYear();
    },
  },
};
</script>

<style scoped lang="scss">
@import "~@/venue/styles/defaults";

.v-footer {
  background: linear-gradient(180deg, $venue-deep 0%, $venue-deep-ink 100%);
  color: $venue-on-deep;
  margin-top: 6rem;
}

.v-footer__inner {
  max-width: 1140px;
  margin: 0 auto;
  padding: 4rem 1.5rem 2rem;
}

.v-footer__line {
  font-size: 2rem;
  color: $venue-on-deep;
  margin-bottom: 3rem;

  em {
    color: $venue-accent;
  }
}

.v-footer__cols {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.2rem;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li + li {
    margin-top: 0.45rem;
  }

  a {
    color: rgba(239, 230, 210, 0.78);
    font-size: 0.95rem;

    &:hover,
    &:focus {
      color: $venue-accent;
      text-decoration: none;
    }
  }
}

.v-footer__heading {
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: $venue-accent;
  margin-bottom: 0.9rem;
}

.v-footer__base {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-top: 3.5rem;
  padding-top: 1.4rem;
  border-top: 1px solid rgba(239, 230, 210, 0.18);
  font-size: 0.8125rem;
  color: rgba(239, 230, 210, 0.55);
}

@media (min-width: 768px) {
  .v-footer__line {
    font-size: 2.8rem;
  }

  .v-footer__cols {
    grid-template-columns: repeat(3, 1fr);
  }

  .v-footer__base {
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
