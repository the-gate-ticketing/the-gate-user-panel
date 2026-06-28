<template>
  <main>
    <section class="v-hero">
      <figure
        v-if="content.hero.motif === 'arch'"
        class="v-hero__arch"
        :class="{ 'v-hero__arch--fit': content.hero.mediaAspect }"
        :style="content.hero.mediaAspect ? { '--v-arch-aspect': content.hero.mediaAspect } : null"
        aria-hidden="true"
      >
        <video
          v-if="content.hero.video"
          ref="heroArchVideo"
          class="v-hero__arch-img v-hero__arch-video"
          :poster="content.hero.image"
          :style="content.hero.imagePosition ? { objectPosition: content.hero.imagePosition } : null"
          autoplay
          muted
          loop
          playsinline
          preload="metadata"
        >
          <source :src="content.hero.video" type="video/mp4" />
        </video>
        <img
          v-else
          class="v-hero__arch-img"
          :src="content.hero.image"
          :style="content.hero.imagePosition ? { objectPosition: content.hero.imagePosition } : null"
          alt=""
        />
        <!-- iOS WebKit won't clip a <video> to the arch (paints a full rectangle).
             On mobile we paint the video's frames into this canvas, clipped to the
             arch in raster space, with the cream page showing through the corners.
             Desktop keeps the raw <video> above (Blink clips it fine). -->
        <canvas
          v-if="content.hero.video"
          ref="heroArchCanvas"
          class="v-hero__arch-canvas"
          aria-hidden="true"
        ></canvas>
        <span class="v-hero__arch-frame"></span>
        <figcaption v-if="content.hero.caption" class="v-hero__arch-cap">
          <span class="v-hero__arch-dot"></span>{{ content.hero.caption }}
        </figcaption>
      </figure>

      <span
        v-if="content.hero.motif === 'arch'"
        class="v-hero__topscrim"
        aria-hidden="true"
      ></span>

      <canvas
        v-if="content.hero.motif === 'shader'"
        ref="heroShader"
        class="v-hero__shader"
        aria-hidden="true"
      ></canvas>
      <span
        v-if="content.hero.motif === 'shader'"
        class="v-hero__shader-scrim"
        aria-hidden="true"
      ></span>

      <div
        v-if="content.hero.motif === 'awning'"
        class="v-hero__awning"
        aria-hidden="true"
      >
        <span class="v-hero__awning-rod"></span>
        <span class="v-hero__awning-canopy"></span>
        <svg
          class="v-hero__awning-valance"
          viewBox="0 0 440 32"
          preserveAspectRatio="none"
        >
          <path
            d="M0 0 H440 V16 a20 16 0 0 1 -40 0 a20 16 0 0 1 -40 0 a20 16 0 0 1 -40 0 a20 16 0 0 1 -40 0 a20 16 0 0 1 -40 0 a20 16 0 0 1 -40 0 a20 16 0 0 1 -40 0 a20 16 0 0 1 -40 0 a20 16 0 0 1 -40 0 a20 16 0 0 1 -40 0 a20 16 0 0 1 -40 0 Z"
          />
        </svg>
        <span class="v-hero__awning-crest">
          <svg viewBox="0 0 40 40" fill="none">
            <path d="M20 13 V34" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" />
            <path d="M20 15 C13 9 7 10 3.5 13.5 C9.5 12 15 13 20 16 C25 13 30.5 12 36.5 13.5 C33 10 27 9 20 15Z" fill="currentColor" />
            <path d="M20 16 C15.5 8 10 5 5.5 5 C9.5 9 14.5 13 20 18 C25.5 13 30.5 9 34.5 5 C30 5 24.5 8 20 16Z" fill="currentColor" />
            <circle cx="20" cy="12.5" r="2.2" />
          </svg>
          <span class="v-hero__awning-mono">t</span>
          <span class="v-hero__awning-place">Saint-Tropez</span>
        </span>
        <span class="v-hero__awning-fringe">
          <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
        </span>
      </div>

      <p class="v-label v-reveal">{{ content.hero.kicker }}</p>
      <h1 class="v-display v-hero__title v-reveal" style="animation-delay: 0.12s">
        {{ content.hero.title }} <em>{{ content.hero.titleAccent }}</em>
      </h1>
      <p class="v-editorial v-hero__sub v-reveal" style="animation-delay: 0.24s">
        {{ content.hero.subtitle }}
      </p>
      <div class="v-reveal" style="animation-delay: 0.36s">
        <router-link class="v-btn" to="/events">See what's on</router-link>
      </div>
    </section>

    <section v-if="events.length" class="v-upcoming">
      <div class="v-upcoming__head">
        <p class="v-label">On the calendar</p>
        <h2 class="v-display v-upcoming__title">{{ upcomingHeading.title }} <em>{{ upcomingHeading.accent }}</em></h2>
      </div>
      <div class="v-upcoming__grid">
        <div
          v-for="event in upcoming"
          :key="event.shortName"
          class="v-upcoming__item"
        >
          <event-card :event="event" />
        </div>
      </div>
      <div class="v-upcoming__more">
        <router-link class="v-btn v-btn--ghost" to="/events">
          All events
        </router-link>
      </div>
    </section>

    <section class="v-essence">
      <div class="v-rule"></div>
      <div class="v-essence__inner">
        <p class="v-label">{{ content.essence.kicker }}</p>
        <p class="v-display v-essence__line">
          {{ content.essence.line }} <em>{{ content.essence.lineAccent }}</em>
        </p>
        <p class="v-editorial">{{ content.essence.body }}</p>
        <router-link class="v-essence__link" to="/about-us">
          More about {{ content.brandName }} →
        </router-link>
      </div>
    </section>
  </main>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import content from "@theme/content";
import EventCard from "@/venue/components/EventCard";

// Liquid golden-hour shader (opt-in via content.hero.motif === 'shader').
// A domain-warped fbm noise field coloured from the theme palette. Lives in the
// shared venue shell so any theme can switch its hero to the shader by setting
// motif: 'shader' (+ an optional hero.shaderColors = [deep, mid, light, base]).
const SHADER_VERT = "attribute vec2 p;void main(){gl_Position=vec4(p,0.0,1.0);}";
const SHADER_FRAG = `
precision highp float;
uniform float u_time;
uniform vec2 u_res;
uniform vec3 u_deep;
uniform vec3 u_mid;
uniform vec3 u_light;
uniform vec3 u_base;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){
  vec2 i=floor(p),f=fract(p);
  vec2 u=f*f*(3.0-2.0*f);
  return mix(mix(hash(i+vec2(0.0,0.0)),hash(i+vec2(1.0,0.0)),u.x),
             mix(hash(i+vec2(0.0,1.0)),hash(i+vec2(1.0,1.0)),u.x),u.y);
}
float fbm(vec2 p){
  float v=0.0,a=0.55;
  mat2 m=mat2(1.6,1.2,-1.2,1.6);
  for(int i=0;i<5;i++){v+=a*noise(p);p=m*p;a*=0.5;}
  return v;
}
void main(){
  vec2 uv=gl_FragCoord.xy/u_res.xy;
  vec2 p=uv*2.2;
  p.x*=u_res.x/u_res.y;
  float t=u_time*0.05;
  vec2 q=vec2(fbm(p+t),fbm(p+vec2(5.2,1.3)-t));
  vec2 r=vec2(fbm(p+3.5*q+vec2(1.7,9.2)+1.2*t),
              fbm(p+3.5*q+vec2(8.3,2.8)-1.1*t));
  float f=fbm(p+3.5*r);
  vec3 col=u_deep;
  col=mix(col,u_mid,smoothstep(0.05,0.65,f));
  col=mix(col,u_light,smoothstep(0.45,0.95,f));
  col=mix(col,u_base,smoothstep(0.55,1.05,length(r)));
  col=mix(col,u_base,0.10);
  col+=0.04*(f-0.5);
  gl_FragColor=vec4(col,1.0);
}`;

const DEFAULT_SHADER_COLORS = ["#0b2c2a", "#e0680e", "#f4b044", "#f4edde"];

function hexToRgb(hex) {
  const h = String(hex).replace("#", "");
  const full =
    h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

export default {
  name: "VenueHome",
  components: { EventCard },
  data() {
    return { content };
  },
  computed: {
    ...mapGetters({ events: "events/events" }),
    upcoming() {
      return this.events.slice(0, 3);
    },
    // Section heading is theme-driven so each venue sets its own tempo
    // (TROPÉ is a daytime beach club → "days"; COCOYA runs day-to-night → "nights").
    // Falls back to the original wording for themes that don't override it.
    upcomingHeading() {
      const u = this.content.upcoming || {};
      return { title: u.title || "Upcoming", accent: u.accent || "nights" };
    },
  },
  methods: {
    ...mapActions({ fetchEvents: "events/fetchEvents" }),
    initHeroShader() {
      const canvas = this.$refs.heroShader;
      if (!canvas) return;
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        canvas.style.display = "none"; // fall back to the hero gradient
        return;
      }
      const compile = (type, src) => {
        const s = gl.createShader(type);
        gl.shaderSource(s, src);
        gl.compileShader(s);
        return s;
      };
      const prog = gl.createProgram();
      gl.attachShader(prog, compile(gl.VERTEX_SHADER, SHADER_VERT));
      gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, SHADER_FRAG));
      gl.linkProgram(prog);
      gl.useProgram(prog);

      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
        gl.STATIC_DRAW
      );
      const loc = gl.getAttribLocation(prog, "p");
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

      const palette = (this.content.hero.shaderColors || DEFAULT_SHADER_COLORS).slice(
        0,
        4
      );
      while (palette.length < 4) palette.push(DEFAULT_SHADER_COLORS[palette.length]);
      ["u_deep", "u_mid", "u_light", "u_base"].forEach((name, i) => {
        gl.uniform3fv(gl.getUniformLocation(prog, name), hexToRgb(palette[i]));
      });

      const uTime = gl.getUniformLocation(prog, "u_time");
      const uRes = gl.getUniformLocation(prog, "u_res");

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = Math.floor(canvas.clientWidth * dpr);
        const h = Math.floor(canvas.clientHeight * dpr);
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
        }
        gl.viewport(0, 0, canvas.width, canvas.height);
      };
      const draw = (tSec) => {
        gl.uniform1f(uTime, tSec);
        gl.uniform2f(uRes, canvas.width, canvas.height);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      };

      const state = { gl, raf: 0, start: 0, reduce: false };
      const loop = (now) => {
        if (!state.start) state.start = now;
        draw((now - state.start) / 1000);
        state.raf = window.requestAnimationFrame(loop);
      };
      const onVisibility = () => {
        if (document.hidden) {
          window.cancelAnimationFrame(state.raf);
          state.raf = 0;
        } else if (!state.reduce && !state.raf) {
          state.raf = window.requestAnimationFrame(loop);
        }
      };

      resize();
      window.addEventListener("resize", resize);
      document.addEventListener("visibilitychange", onVisibility);

      state.reduce =
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (state.reduce) {
        draw(0); // single static frame
      } else {
        state.raf = window.requestAnimationFrame(loop);
      }

      this.$_heroShader = { state, resize, onVisibility };
    },
    teardownHeroShader() {
      const s = this.$_heroShader;
      if (!s) return;
      window.cancelAnimationFrame(s.state.raf);
      window.removeEventListener("resize", s.resize);
      document.removeEventListener("visibilitychange", s.onVisibility);
      const ext = s.state.gl && s.state.gl.getExtension("WEBGL_lose_context");
      if (ext) ext.loseContext();
      this.$_heroShader = null;
    },
    initHeroVideo() {
      const video = this.$refs.heroArchVideo;
      if (!video) return;
      // Vue 2 doesn't reflect the template `muted` attribute to the DOM property,
      // and browsers block autoplay unless the property is muted — set it here.
      video.muted = true;
      // Honour reduced-motion: keep the poster frame, don't autoplay.
      const reduce =
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        video.removeAttribute("autoplay");
        return;
      }
      const play = video.play();
      if (play && typeof play.catch === "function") play.catch(() => {});
    },
    // iOS WebKit (Safari + iOS Chrome) refuses to clip a <video> to a rounded/
    // arch shape — the video composites as a full rectangle and spills past the
    // curve, leaving the arch outline floating over a rectangle. A <canvas>,
    // however, clips fine: we draw the playing <video>'s frames into a canvas,
    // clipping inside the raster to the arch path, and let the canvas's cream
    // CSS background show through the transparent corners. Mobile only — desktop
    // (Blink) clips the raw <video> correctly, so we leave it untouched.
    initHeroArchCanvas() {
      if (this.$_heroArchCanvas) return; // already running
      const canvas = this.$refs.heroArchCanvas;
      const video = this.$refs.heroArchVideo;
      if (!canvas || !video) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const state = { raf: 0, reduce: false, w: 0, h: 0, dpr: 1, poster: null };

      // Arch silhouette matching .v-hero__arch border-radius (9999/9999/14/14 →
      // a semicircle dome on top, near-square base). Built in raster space so the
      // clip never touches the <video> element (which iOS would mis-clip).
      const archPath = (w, h) => {
        const r = w / 2;
        ctx.beginPath();
        ctx.arc(w / 2, r, r, Math.PI, 2 * Math.PI); // dome across the top
        ctx.lineTo(w, h); // right edge down
        ctx.lineTo(0, h); // base
        ctx.lineTo(0, r); // left edge back up to the dome
        ctx.closePath();
      };

      // object-fit: cover — fill the arch box, centre-cropped.
      const drawCover = (media, mw, mh) => {
        if (!mw || !mh) return;
        const scale = Math.max(state.w / mw, state.h / mh);
        const dw = mw * scale;
        const dh = mh * scale;
        ctx.drawImage(media, (state.w - dw) / 2, (state.h - dh) / 2, dw, dh);
      };

      const paint = (media, mw, mh) => {
        ctx.clearRect(0, 0, state.w, state.h); // corners → transparent → CSS cream
        ctx.save();
        archPath(state.w, state.h);
        ctx.clip();
        drawCover(media, mw, mh);
        ctx.restore();
      };

      const size = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        if (w === state.w && h === state.h && dpr === state.dpr) return;
        state.w = w;
        state.h = h;
        state.dpr = dpr;
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // draw in CSS pixels
      };

      const loop = () => {
        size();
        if (video.readyState >= 2) {
          paint(video, video.videoWidth, video.videoHeight);
        }
        state.raf = window.requestAnimationFrame(loop);
      };

      const onResize = () => {
        if (state.reduce && state.poster) {
          size();
          paint(state.poster, state.poster.naturalWidth, state.poster.naturalHeight);
        }
      };

      const onVisibility = () => {
        if (document.hidden) {
          window.cancelAnimationFrame(state.raf);
          state.raf = 0;
        } else if (!state.reduce && !state.raf) {
          state.raf = window.requestAnimationFrame(loop);
        }
      };

      size();
      state.reduce =
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (state.reduce) {
        // No autoplay under reduced motion — paint the still poster once.
        const img = new Image();
        img.onload = () => {
          state.poster = img;
          size();
          paint(img, img.naturalWidth, img.naturalHeight);
        };
        img.src = this.content.hero.image;
      } else {
        state.raf = window.requestAnimationFrame(loop);
      }

      window.addEventListener("resize", onResize);
      document.addEventListener("visibilitychange", onVisibility);
      this.$_heroArchCanvas = { state, onResize, onVisibility };
    },
    teardownHeroArchCanvas() {
      const s = this.$_heroArchCanvas;
      if (!s) return;
      window.cancelAnimationFrame(s.state.raf);
      window.removeEventListener("resize", s.onResize);
      document.removeEventListener("visibilitychange", s.onVisibility);
      this.$_heroArchCanvas = null;
    },
  },
  async created() {
    await this.fetchEvents();
  },
  mounted() {
    if (this.content.hero.motif === "shader") this.initHeroShader();
    this.initHeroVideo();
    // Mobile arch + video → drive the iOS-safe canvas (and follow the breakpoint).
    if (
      this.content.hero.motif === "arch" &&
      this.content.hero.video &&
      window.matchMedia
    ) {
      const mql = window.matchMedia("(max-width: 767.98px)");
      this.$_archMql = mql;
      this.$_archMqlHandler = (e) => {
        if (e.matches) this.initHeroArchCanvas();
        else this.teardownHeroArchCanvas();
      };
      if (mql.matches) this.initHeroArchCanvas();
      if (mql.addEventListener) mql.addEventListener("change", this.$_archMqlHandler);
      else mql.addListener(this.$_archMqlHandler);
    }
  },
  beforeDestroy() {
    this.teardownHeroShader();
    this.teardownHeroArchCanvas();
    if (this.$_archMql && this.$_archMqlHandler) {
      if (this.$_archMql.removeEventListener) {
        this.$_archMql.removeEventListener("change", this.$_archMqlHandler);
      } else {
        this.$_archMql.removeListener(this.$_archMqlHandler);
      }
    }
  },
};
</script>

<style scoped lang="scss">
@import "~@/venue/styles/defaults";

.v-hero {
  position: relative;
  min-height: 92vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 7rem 1.5rem 4rem;
  overflow: hidden;

  // Golden-hour horizon: amber glow rising from the lower edge into warm paper.
  background:
    radial-gradient(
      120% 75% at 50% 108%,
      rgba(244, 176, 68, 0.5) 0%,
      rgba(224, 104, 14, 0.18) 38%,
      rgba(244, 237, 222, 0) 70%
    ),
    $venue-paper;

  // Grain, so the gradient reads as paper rather than plastic.
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.35;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3CfeColorMatrix values='0 0 0 0 0.23 0 0 0 0 0.19 0 0 0 0 0.15 0 0 0 0.05 0'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)'/%3E%3C/svg%3E");
  }

  > * {
    position: relative;
    z-index: 1;
    max-width: 680px;
  }
}

// Arched window — golden-hour image in a Moorish arch that fills the empty
// right/bottom. Sits behind the text + grain. Hidden on small screens (the
// stacked hero already fills them). Opt-in via content.hero.motif === 'arch'.
.v-hero__arch {
  display: none; // shown from the tablet breakpoint up
  position: absolute;
  z-index: 0;
  max-width: none; // override .v-hero > * { max-width: 680px }
  margin: 0;
  right: 5%;
  top: -3%;
  bottom: -3%;
  width: 33%;
  border-radius: 9999px 9999px 14px 14px; // arch: round top, soft base
  overflow: hidden;
  box-shadow:
    0 30px 60px -30px rgba(60, 30, 10, 0.55),
    inset 0 0 0 1px rgba(255, 255, 255, 0.25);

  // brand-cohesion scrim so any photo settles into the palette (theme-driven)
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 1;
    background: linear-gradient(
      180deg,
      rgba($venue-deep, 0.1) 0%,
      rgba($venue-cta, 0.14) 60%,
      rgba($venue-ink, 0.4) 100%
    );
    mix-blend-mode: multiply;
  }
}

// Opt-in (theme sets hero.mediaAspect): size the arch to the media's aspect ratio
// so the full photo/video shows uncropped — object-fit: cover then fills exactly.
.v-hero__arch--fit {
  aspect-ratio: var(--v-arch-aspect);
}

// Soft cream wash over the top band so the transparent navbar's dark links
// stay legible where they overlap the arch image. Sits above the arch
// (z-index 0) but below the hero text (z-index 1).
.v-hero__topscrim {
  display: none; // desktop-only — see breakpoint below
  position: absolute;
  z-index: 0;
  max-width: none; // override .v-hero > * { max-width: 680px }
  top: 0;
  left: 0;
  right: 0;
  height: 160px;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    rgba($venue-paper, 0.92) 0%,
    rgba($venue-paper, 0.55) 38%,
    rgba($venue-paper, 0) 100%
  );
}

.v-hero__arch-img {
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(1.06) contrast(1.02);
  animation: v-arch-kb 24s ease-in-out infinite alternate;
}

// The video supplies its own motion, so drop the slow Ken Burns pan/zoom.
.v-hero__arch-video {
  animation: none;
}

// iOS-safe arch video: desktop clips the raw <video> fine, so the canvas is
// hidden there and only switched on at the mobile breakpoint below.
.v-hero__arch-canvas {
  display: none;
}

.v-hero__arch-frame {
  position: absolute;
  inset: 0;
  z-index: 2;
  border-radius: inherit;
  border: 1px solid rgba($venue-cta, 0.45);
  pointer-events: none;
}

.v-hero__arch-cap {
  position: absolute;
  z-index: 3;
  left: 50%;
  bottom: 6%;
  transform: translateX(-50%);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
  padding: 0.5rem 0.85rem;
  border-radius: 999px;
  background: rgba($venue-paper, 0.9);
  border: 1px solid rgba($venue-ink, 0.12);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: $venue-ink;
}

.v-hero__arch-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: $venue-cta;
  box-shadow: 0 0 0 4px rgba($venue-cta, 0.18);
}

@keyframes v-arch-kb {
  from {
    transform: scale(1.03);
  }
  to {
    transform: scale(1.12);
  }
}

@media (prefers-reduced-motion: reduce) {
  .v-hero__arch-img {
    animation: none;
  }
}

// Liquid shader — fills the hero behind the text (falls back to the hero
// gradient if WebGL is unavailable). Opt-in via content.hero.motif === 'shader'.
.v-hero__shader {
  position: absolute;
  z-index: 0;
  inset: 0;
  max-width: none; // override .v-hero > * { max-width: 680px }
  width: 100%;
  height: 100%;
  display: block;
}

// Legibility wash over the shader: cream toward the text rail, a soft top for
// the transparent navbar's dark links, and a faint warm base. Theme-driven.
.v-hero__shader-scrim {
  position: absolute;
  z-index: 0;
  inset: 0;
  max-width: none;
  pointer-events: none;
  background:
    linear-gradient(
      90deg,
      $venue-paper 4%,
      rgba($venue-paper, 0.82) 28%,
      rgba($venue-paper, 0.25) 50%,
      rgba($venue-paper, 0) 66%
    ),
    linear-gradient(
      180deg,
      rgba($venue-paper, 0.5) 0%,
      rgba($venue-paper, 0) 22%
    ),
    linear-gradient(0deg, rgba($venue-cta, 0.14) 0%, rgba($venue-paper, 0) 26%);
}

// Striped parasol awning — TROPÉ's vintage-Riviera hero motif. A scalloped,
// tasselled canopy hanging below the nav on the right, with an apothecary oval
// crest. Pure CSS/SVG. Hidden on small screens (the stacked hero fills them).
// Opt-in via content.hero.motif === 'awning'.
.v-hero__awning {
  display: none; // shown from the tablet breakpoint up
  position: absolute;
  z-index: 0;
  max-width: none; // override .v-hero > * { max-width: 680px }
  right: 0;
  top: 96px;
  width: 42%;
  height: 54%;
  transform-origin: top center;
  animation: v-awning-sway 9s ease-in-out infinite;
}

.v-hero__awning-rod {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 7px;
  z-index: 2;
  border-radius: 3px;
  background: $venue-deep-ink;
}

.v-hero__awning-canopy {
  position: absolute;
  inset: 0;
  border-radius: 6px 6px 0 0;
  // Cabana stripes: olive bars over a cream ground. A single (non-repeating)
  // gradient tiled via background-size — repeating-linear-gradient gets its
  // leading "0" stripped by the CSS minifier, collapsing the olive band.
  background-color: mix(#fff, $venue-paper, 30%);
  background-image: linear-gradient(
    90deg,
    $venue-deep 50%,
    transparent 50%
  );
  background-size: 52px 100%;
  box-shadow:
    0 18px 36px -22px rgba(47, 55, 32, 0.55),
    inset 0 0 0 1px rgba(255, 255, 255, 0.18);
}

// Solid scalloped valance trim hanging off the canopy's bottom edge.
.v-hero__awning-valance {
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  bottom: -14px;
  width: 100%;
  height: 34px;
  color: $venue-deep;
  fill: currentColor;
  filter: drop-shadow(0 8px 8px rgba(47, 55, 32, 0.28));
}

.v-hero__awning-crest {
  position: absolute;
  z-index: 3;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 92px;
  height: 122px;
  border-radius: 999px;
  background: $venue-paper;
  border: 1.5px solid $venue-deep;
  box-shadow: 0 8px 18px -10px rgba(47, 55, 32, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;

  svg {
    width: 30px;
    height: 30px;
    color: $venue-deep;

    circle {
      fill: $venue-cta;
    }
  }
}

.v-hero__awning-mono {
  font-family: $venue-font-display;
  font-style: italic;
  font-weight: 600;
  font-size: 1.7rem;
  line-height: 0.7;
  color: $venue-deep;
}

.v-hero__awning-place {
  font-size: 0.5rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: $venue-deep;
}

.v-hero__awning-fringe {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -38px;
  z-index: 1;
  height: 26px;
  display: flex;
  justify-content: space-around;
  padding: 0 14px;

  i {
    position: relative;
    width: 4px;
    height: 16px;
    border-radius: 2px;
    background: $venue-cta;
    animation: v-tassel-sway 9s ease-in-out infinite;

    &::before {
      content: "";
      position: absolute;
      top: -4px;
      left: 50%;
      transform: translateX(-50%);
      width: 9px;
      height: 7px;
      border-radius: 50% 50% 40% 40%;
      background: $venue-cta;
    }
    &::after {
      content: "";
      position: absolute;
      bottom: -5px;
      left: 50%;
      transform: translateX(-50%);
      width: 9px;
      height: 11px;
      border-radius: 0 0 45% 45%;
      background: $venue-cta;
    }
  }
}

@keyframes v-awning-sway {
  0%,
  100% {
    transform: rotate(-0.45deg);
  }
  50% {
    transform: rotate(0.45deg);
  }
}

@keyframes v-tassel-sway {
  0%,
  100% {
    transform: rotate(3deg);
  }
  50% {
    transform: rotate(-3deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .v-hero__awning,
  .v-hero__awning-fringe i {
    animation: none;
  }
}

.v-hero__title {
  font-size: 3.1rem;
  margin: 1.1rem 0 1.2rem;
}

.v-hero__sub {
  margin-bottom: 2.2rem;
}

.v-upcoming {
  padding: 4.5rem 1.5rem 1rem;
  max-width: 1140px;
  margin: 0 auto;
}

.v-upcoming__head {
  margin-bottom: 2.4rem;
}

.v-upcoming__title {
  font-size: 2.1rem;
  margin-top: 0.8rem;
}

.v-upcoming__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.6rem;
  max-width: 420px;
}

.v-upcoming__more {
  margin: 3rem 0 0;
  text-align: center;
}

.v-essence {
  max-width: 1140px;
  margin: 5.5rem auto 0;
  padding: 0 1.5rem;
}

.v-essence__inner {
  padding-top: 3rem;
  max-width: 640px;
}

.v-essence__line {
  font-size: 1.9rem;
  margin: 1rem 0 1.2rem;
}

.v-essence__link {
  display: inline-block;
  margin-top: 1.2rem;
  font-weight: 600;
  font-size: 0.875rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: $venue-cta;

  &:hover,
  &:focus {
    color: $venue-cta-hover;
    text-decoration: none;
  }
}

@media (min-width: 768px) {
  .v-hero {
    padding: 8rem 3rem 5rem;
  }

  .v-hero__title {
    font-size: 5.2rem;
  }

  .v-hero__arch {
    display: block;
  }

  // Fit variant: a centered arched card sized by the media aspect (no full-height
  // crop). Height derives from the 33% width via aspect-ratio.
  .v-hero__arch--fit {
    top: 50%;
    bottom: auto;
    transform: translateY(-50%);
    height: auto;
  }

  .v-hero__topscrim {
    display: block;
  }

  .v-hero__awning {
    display: block;
  }

  .v-upcoming__grid {
    grid-template-columns: repeat(3, 1fr);
    max-width: none;
    align-items: stretch;
  }

  .v-essence__line {
    font-size: 2.6rem;
  }
}

// ── Mobile (< tablet): the arch is hidden as an absolute side-panel up top, so
// bring the hero media back as a centered, portrait arched "window" that leads
// the stacked hero. Same Moorish silhouette as desktop — keeps the brand mark on
// phones — holding the theme's media (COCOYA video / TROPÉ photo) via the shared
// .v-hero__arch markup, then the headline reads below it.
@media (max-width: 767.98px) {
  .v-hero {
    justify-content: flex-start; // media-first stack flows from the top
  }

  .v-hero__arch {
    display: block;
    position: relative;
    right: auto;
    top: auto;
    bottom: auto;
    width: 100%;
    max-width: 300px;
    height: min(52vh, 420px);
    margin: 0 auto 2.25rem; // centered portal, breathing room before the title
    opacity: 0;
    animation: v-fade-up 0.9s $venue-ease 0.04s forwards; // joins the hero's reveal cadence
  }

  // Fit variant: drop the fixed height so the media aspect ratio sizes the arch.
  .v-hero__arch--fit {
    height: auto;
  }

  // iOS WebKit can't clip the <video> to the arch, so on mobile the canvas
  // (which CAN be clipped, in raster space) paints the video frames over it.
  // Its cream background fills the corners opaquely so the arch reads as
  // floating on the page. See initHeroArchCanvas() in <script>.
  .v-hero__arch-canvas {
    display: block;
    position: absolute;
    inset: 0;
    z-index: 1; // above the raw <video> (z 0), below the frame (z 2)
    width: 100%;
    height: 100%;
    background: $venue-paper; // opaque cream surround behind the arch raster
  }

  // The brand-cohesion scrim would multiply over the cream corners and tint
  // them off-page; the canvas owns the media box on mobile, so drop it.
  .v-hero__arch::after {
    display: none;
  }
}

@media (max-width: 767.98px) and (prefers-reduced-motion: reduce) {
  .v-hero__arch {
    opacity: 1;
    animation: none;
  }
}
</style>
