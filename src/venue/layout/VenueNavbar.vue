<template>
  <header>
    <nav class="v-nav" :class="{ 'v-nav--solid': solid, 'v-nav--open': menuOpen }">
      <router-link class="v-nav__brand" to="/" @click.native="closeMenu">
        <img
          :src="content.logo"
          :alt="content.brandName"
          :class="{ 'v-nav__brand--invert': content.logoInvert }"
          :style="{ height: (content.logoHeight || 22) + 'px' }"
        />
      </router-link>

      <button
        class="v-nav__toggle"
        :aria-expanded="menuOpen ? 'true' : 'false'"
        aria-label="Menu"
        @click="menuOpen = !menuOpen"
      >
        <span></span>
        <span></span>
      </button>

      <ul class="v-nav__links">
        <li v-for="link in links" :key="link.to">
          <router-link :to="link.to">{{ link.label }}</router-link>
        </li>
        <li>
          <router-link class="v-btn v-nav__cta" to="/events">Tickets</router-link>
        </li>
      </ul>
    </nav>

    <transition name="v-menu">
      <div v-if="menuOpen" class="v-menu">
        <ul>
          <li
            v-for="(link, i) in menuLinks"
            :key="link.to"
            class="v-reveal"
            :style="{ animationDelay: 0.08 * i + 's' }"
          >
            <router-link :to="link.to" @click.native="closeMenu">
              {{ link.label }}
            </router-link>
          </li>
        </ul>
        <p class="v-menu__foot">{{ content.menuFootline }}</p>
      </div>
    </transition>
  </header>
</template>

<script>
import content from "@theme/content";

export default {
  name: "VenueNavbar",
  data() {
    return {
      content,
      menuOpen: false,
      solid: false,
    };
  },
  computed: {
    links() {
      return [
        { to: "/events", label: "Events" },
        { to: "/about-us", label: "About" },
        { to: "/our-policies", label: "Policies" },
      ];
    },
    menuLinks() {
      return [{ to: "/", label: "Home" }, ...this.links];
    },
  },
  methods: {
    closeMenu() {
      this.menuOpen = false;
    },
    onScroll() {
      this.solid = window.scrollY > 24;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll, { passive: true });
    this.onScroll();
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  watch: {
    menuOpen(open) {
      document.body.style.overflow = open ? "hidden" : "";
    },
  },
};
</script>

<style scoped lang="scss">
@import "~@/venue/styles/defaults";

.v-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1030;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  transition: background 0.35s $venue-ease, box-shadow 0.35s $venue-ease,
    padding 0.35s $venue-ease;

  &--solid {
    background: rgba($venue-paper, 0.96);
    box-shadow: 0 1px 0 rgba($venue-ink, 0.12);
    padding: 0.65rem 1.25rem;
  }
}

.v-nav__brand img {
  display: block; // height comes from content.logoHeight (square lockups need more than wordmarks)
}

// Dark-ink wordmarks (e.g. COCOYA) sit on a dark surface in night themes —
// lift the flat ink to cream. Opt-in via content.logoInvert.
.v-nav__brand--invert {
  filter: brightness(0) invert(0.94);
}

// The wordmark is dark ink; lift it to near-white over the open menu's deep surface.
.v-nav--open .v-nav__brand img {
  filter: brightness(0) invert(0.94);
}

.v-nav__toggle {
  display: block;
  background: none;
  border: 0;
  padding: 0.5rem 0;
  width: 34px;
  cursor: pointer;

  span {
    display: block;
    height: 2px;
    background: $venue-ink;
    transition: transform 0.3s $venue-ease, width 0.3s $venue-ease;

    & + span {
      margin-top: 7px;
      width: 70%;
      margin-left: auto;
    }
  }

  .v-nav--open & span {
    background: $venue-on-deep;

    &:first-child {
      transform: translateY(4.5px) rotate(45deg);
    }

    & + span {
      width: 100%;
      transform: translateY(-4.5px) rotate(-45deg);
    }
  }
}

.v-nav__links {
  display: none;
}

.v-menu {
  position: fixed;
  inset: 0;
  z-index: 1020;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(180deg, $venue-deep 0%, $venue-deep-ink 100%);

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li + li {
    margin-top: 0.5rem;
  }

  a {
    font-family: $venue-font-display;
    font-size: 2.6rem;
    line-height: 1.25;
    color: $venue-on-deep;

    &:hover,
    &:focus {
      color: $venue-accent;
      text-decoration: none;
    }
  }
}

.v-menu__foot {
  margin: 3rem 0 0;
  font-family: $venue-font-editorial;
  font-style: italic;
  font-size: 1.15rem;
  color: rgba(239, 230, 210, 0.6);
}

.v-menu-enter-active,
.v-menu-leave-active {
  transition: opacity 0.35s $venue-ease, transform 0.35s $venue-ease;
}

.v-menu-enter,
.v-menu-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}

@media (min-width: 768px) {
  .v-nav {
    padding: 1.25rem 3rem;

    &--solid {
      padding: 0.75rem 3rem;
    }
  }

  .v-nav__toggle,
  .v-menu {
    display: none;
  }

  .v-nav__links {
    display: flex;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;

    li + li {
      margin-left: 2.2rem;
    }

    a:not(.v-btn) {
      position: relative;
      font-family: $venue-font-body;
      font-size: 0.8125rem;
      font-weight: 600;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: $venue-ink;
      padding-bottom: 4px;

      &::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 0;
        height: 1px;
        background: $venue-cta;
        transition: width 0.3s $venue-ease;
      }

      &:hover,
      &:focus,
      &.router-link-active {
        text-decoration: none;
        color: $venue-ink;

        &::after {
          width: 100%;
        }
      }
    }
  }

  .v-nav__cta {
    padding: 0.65rem 1.6rem;
  }
}
</style>
