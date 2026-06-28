// COCOYA — NIGHT MODE content.
// Reuses the full COCOYA brand pack (logo, policies, contact, footer voice) and
// only pivots the hero / essence / upcoming copy from the daytime "golden hour"
// framing to an after-dark, resto-bar mood. The dark hero treatment + warm arch
// glow are switched on by `hero.night` (see .v-hero--night in venue/pages/Home.vue).
import cocoya from "../cocoya/content";

export default {
  ...cocoya,

  // The COCOYA wordmark is dark ink (made for the cream theme); invert it to
  // cream so it reads on the night surface.
  logoInvert: true,

  hero: {
    ...cocoya.hero,
    // Night treatment: dark ember background + warm light spilling from the arch.
    night: true,
    kicker: "Mediterranean · after dark",
    title: "When the sun sets,",
    titleAccent: "COCOYA lights up.",
    subtitle:
      "Coastal flavors, candlelit tables and a rhythm that carries past midnight.",
    // Keep the COCOYA arch video/image — it's dimmed and lit from within at night.
  },

  essence: {
    ...cocoya.essence,
    body:
      "Inspired by the Mediterranean and elevated by soulful hospitality, COCOYA blends coastal flavors, timeless design and a vibrant energy that only truly comes alive once the lights go down.",
  },

  upcoming: { title: "Upcoming", accent: "nights" },
};
