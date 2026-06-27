// COCOYA venue content.
// Hero/essence lines follow the brand book's voice ("Golden hour starts here.",
// "Meet me at COCOYA."). Policy and about copy are PLACEHOLDERS pending the
// client's final text — replace before launch.

export default {
  brandName: 'COCOYA',
  logo: require('./assets/cocoya-wordmark.svg'),

  hero: {
    kicker: 'Mediterranean · day to night',
    title: 'Golden hour',
    titleAccent: 'starts here.',
    subtitle:
      'Coastal flavors, timeless design and vibrant energy — from the first espresso to the last dance.',
    // Decorative hero anchor. 'arch' renders the Moorish arched-window image
    // (see .v-hero__arch in venue/pages/Home.vue). Omit on other themes.
    motif: 'arch',
    // Swap this file to change the hero image — portrait/tall shots suit the arch best.
    // When `video` is set it plays (muted, looped, autoplay) inside the arch and the
    // image below is used as the poster/fallback frame. Drop `video` to revert to a still.
    image: require('./assets/hero-arch.jpg'),
    video: require('./assets/cocoya-hero.mp4'),
  },

  essence: {
    kicker: 'Our essence',
    line: 'Meet me at',
    lineAccent: 'COCOYA.',
    body:
      'Inspired by the Mediterranean and elevated by soulful hospitality, COCOYA blends coastal flavors, timeless design and vibrant energy from day to night.',
  },

  about: {
    title: 'Sabor',
    titleAccent: 'a la vida.',
    paragraphs: [
      // PLACEHOLDER — awaiting client copy.
      'COCOYA is a Mediterranean escape where golden afternoons slip into electric nights — a place built on soulful hospitality, coastal flavors and music that carries past midnight.',
      'From sun-drenched tables to the glow of the dance floor, every detail is designed for connection: organic textures, layered lighting and a welcome that feels like coming back, not arriving.',
      'Find us at golden hour. Stay for everything after.',
    ],
  },

  footerLine: 'Shake, sabor,',
  footerLineAccent: 'shine.',
  menuFootline: 'Golden hour starts here.',

  contact: {
    // PLACEHOLDER — awaiting client contact details.
    email: 'hello@cocoya.example',
    phone: '',
    instagram: 'cocoya',
  },

  // PLACEHOLDER policies — structure is final, text awaits the client's legal copy.
  purchasePolicies: [
    {
      heading: 'Tickets & payment',
      body: [
        'All tickets are sold through this website. A ticket is confirmed only after successful payment, and a confirmation email with your ticket is sent to the address provided at checkout.',
      ],
    },
    {
      heading: 'Refunds & exchanges',
      body: [
        'Tickets are non-refundable and non-transferable unless an event is cancelled or rescheduled. If an event is cancelled, ticket holders will be contacted with refund instructions.',
      ],
    },
    {
      heading: 'Entry',
      body: [
        'Entry requires a valid ticket QR code and may require a matching ID. The venue reserves the right of admission.',
      ],
    },
  ],
  privacyPolicies: [
    {
      heading: 'What we collect',
      body: [
        'We collect the details you provide when purchasing a ticket — name, email address and payment confirmation — solely to fulfil your order and admit you to the event.',
      ],
    },
    {
      heading: 'How we use it',
      body: [
        'Your information is used for ticket delivery, entry validation and essential service communication. We do not sell your data.',
      ],
    },
  ],
};
