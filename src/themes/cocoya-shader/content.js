// COCOYA — liquid-shader hero variant.
// Reuses the full COCOYA brand pack and copy, and only swaps the hero treatment
// from the arched image to the animated golden-hour shader
// (see .v-hero__shader in venue/pages/Home.vue).
import cocoya from "../cocoya/content";

export default {
  ...cocoya,
  hero: {
    ...cocoya.hero,
    motif: "shader",
    // Shader palette: [deep shadow, mid, highlight, base]. Golden hour, COCOYA.
    shaderColors: ["#0b2c2a", "#e0680e", "#f4b044", "#f4edde"],
    // image/caption from the arch variant are unused by the shader hero.
    image: undefined,
    caption: undefined,
  },
};
