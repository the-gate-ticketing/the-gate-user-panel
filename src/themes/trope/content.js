// TROPÉ Beach Club venue content. Voice from the brand book: vintage Riviera,
// old-money, sun-drenched. Tagline "Sun. Style. Spritz. Saint-Tropez."

export default {
  brandName: 'Tropé',
  logo: require('./assets/trope-logo.svg'),
  logoHeight: 64, // palm + wordmark lockup; sized up for presence in the navbar

  hero: {
    kicker: 'Tropé · Saint-Tropez',
    title: 'Sip slow,',
    titleAccent: 'stay salty.',
    subtitle:
      'Sun, style, spritz — a vintage Riviera beach club where the day stretches long and the rosé stays cold.',
    // Golden-hour Riviera photo in the Moorish arch (see .v-hero__arch).
    // Swap this file to change the image; portrait/tall shots suit the arch best.
    motif: 'arch',
    image: require('./assets/trope-hero.jpg'),
    imagePosition: '50% 50%',
    // Size the arch to the photo's 4:5 ratio so the full branded shot shows uncropped.
    mediaAspect: '4 / 5',
  },

  essence: {
    kicker: 'Our essence',
    line: 'Sun. Style.',
    lineAccent: 'Spritz.',
    body:
      'Tropé is the Riviera the way it was meant to be — striped parasols, long lunches and golden evenings, all old-money ease and sun-drenched style on the edge of Saint-Tropez.',
  },

  about: {
    title: 'Vintage Riviera,',
    titleAccent: 'in full bloom.',
    paragraphs: [
      'Tropé Beach Club is built for the slow hours: a swim before lunch, a spritz that never quite empties, an afternoon that drifts into a long, golden night.',
      'Striped canopies and tasselled umbrellas, botanical linens and barefoot glamour — every detail is vintage Riviera, polished to a sun-bleached shine.',
      'Sip slow. Stay salty. See you under the palms.',
    ],
  },

  // Daytime beach club — the calendar runs on long sun-soaked days, not nights.
  upcoming: { title: 'Upcoming', accent: 'days' },

  footerLine: 'Sip slow,',
  footerLineAccent: 'stay salty.',
  menuFootline: 'Sun. Style. Spritz. Saint-Tropez.',

  contact: {
    // PLACEHOLDER — awaiting client contact details.
    email: 'hello@trope.example',
    phone: '',
    instagram: 'trope',
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
