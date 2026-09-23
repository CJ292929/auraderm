export type Product = {
  slug: string;
  name: string;
  size: string;
  priceMinor: number | null;
  currency: "PHP" | "USD" | null;
  shopifyHandle: string | null;
  shortDescription: string;
};

export type Ingredient = {
  order: number;
  word: string;
  name: string;
  benefit: string;
  image: string | null;
};

export type Benefit = {
  title: string;
  body: string;
  linkLabel: string;
  href: string;
};

export type Active = {
  badge: string;
  name: string;
  oneLiner: string;
  image: string | null;
};

export type RoutineStep = {
  slot: "AM" | "SPF REAPPLY" | "PM";
  title: string;
  body: string;
};

export type SustainabilityItem = {
  title: string;
  body: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type Site = {
  brand: string;
  commerce: boolean;
  hero: {
    eyebrow: string;
    headlineLine1: string;
    headlineLine2: string;
    accentWord: string;
    subcopy: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    trustBadges: { label: string }[];
    featuredProductSlug: string;
  };
  statement: {
    line1: string;
    line2: string;
    accentWord: string;
    subcopy: string;
  };
  ingredientsPanel: {
    title: string;
    sideLabelLeft: string;
    sideLabelRight: string;
  };
  products: Product[];
  ingredients: Ingredient[];
  benefits: Benefit[];
  actives: Active[];
  activesIntro: {
    eyebrow: string;
    headline: string;
    accentWord: string;
    body: string;
    cta: { label: string; href: string };
  };
  routine: RoutineStep[];
  routineIntro: {
    eyebrow: string;
    headline: string;
    body: string;
  };
  sustainability: SustainabilityItem[] | null;
  givesBackHeadline: string;
  social: SocialLink[];
};

const CONTENT = (what: string) => `[CONTENT: ${what}]`;

export const site: Site = {
  brand: "AuraDerm Botanicals",
  commerce: false,
  hero: {
    eyebrow: CONTENT("eyebrow line, e.g. brand tagline"),
    headlineLine1: CONTENT("headline copy line 1"),
    headlineLine2: CONTENT("headline copy line 2"),
    accentWord: CONTENT("the one gold accent word"),
    subcopy: CONTENT("subcopy"),
    primaryCta: {
      label: CONTENT("CTA label, e.g. Shop the routine"),
      href: CONTENT("primary CTA destination"),
    },
    secondaryCta: {
      label: CONTENT("secondary link label"),
      href: CONTENT("secondary CTA destination"),
    },
    trustBadges: [
      { label: CONTENT("trust badge 1") },
      { label: CONTENT("trust badge 2") },
      { label: CONTENT("trust badge 3") },
    ],
    featuredProductSlug: CONTENT("featured product slug"),
  },
  statement: {
    line1: CONTENT("statement copy line 1"),
    line2: CONTENT("statement copy line 2"),
    accentWord: CONTENT("statement accent word"),
    subcopy: CONTENT("statement subcopy"),
  },
  ingredientsPanel: {
    title: CONTENT("panel title, e.g. The botanicals"),
    sideLabelLeft: CONTENT("side label left"),
    sideLabelRight: CONTENT("side label right"),
  },
  products: [],
  ingredients: [
    { order: 1, word: CONTENT("ingredient 1 short-name"), name: CONTENT("botanical name 1"), benefit: CONTENT("benefit line 1"), image: null },
    { order: 2, word: CONTENT("ingredient 2 short-name"), name: CONTENT("botanical name 2"), benefit: CONTENT("benefit line 2"), image: null },
    { order: 3, word: CONTENT("ingredient 3 short-name"), name: CONTENT("botanical name 3"), benefit: CONTENT("benefit line 3"), image: null },
    { order: 4, word: CONTENT("ingredient 4 short-name"), name: CONTENT("botanical name 4"), benefit: CONTENT("benefit line 4"), image: null },
    { order: 5, word: CONTENT("ingredient 5 short-name"), name: CONTENT("botanical name 5"), benefit: CONTENT("benefit line 5"), image: null },
  ],
  benefits: [
    { title: CONTENT("benefit title 1"), body: CONTENT("benefit description 1"), linkLabel: CONTENT("link label 1"), href: CONTENT("link destination 1") },
    { title: CONTENT("benefit title 2"), body: CONTENT("benefit description 2"), linkLabel: CONTENT("link label 2"), href: CONTENT("link destination 2") },
    { title: CONTENT("benefit title 3"), body: CONTENT("benefit description 3"), linkLabel: CONTENT("link label 3"), href: CONTENT("link destination 3") },
  ],
  actives: [
    { badge: CONTENT("active 1 short-name"), name: CONTENT("active 1 full name"), oneLiner: CONTENT("active 1 one-liner"), image: null },
    { badge: CONTENT("active 2 short-name"), name: CONTENT("active 2 full name"), oneLiner: CONTENT("active 2 one-liner"), image: null },
    { badge: CONTENT("active 3 short-name"), name: CONTENT("active 3 full name"), oneLiner: CONTENT("active 3 one-liner"), image: null },
    { badge: CONTENT("active 4 short-name"), name: CONTENT("active 4 full name"), oneLiner: CONTENT("active 4 one-liner"), image: null },
  ],
  activesIntro: {
    eyebrow: CONTENT("actives eyebrow"),
    headline: CONTENT("actives headline, up to 4 lines"),
    accentWord: CONTENT("actives accent word"),
    body: CONTENT("actives paragraph — claims-reviewed"),
    cta: { label: CONTENT("actives CTA label"), href: CONTENT("actives CTA destination") },
  },
  routine: [
    { slot: "AM", title: CONTENT("AM step title"), body: CONTENT("AM step copy") },
    { slot: "SPF REAPPLY", title: CONTENT("SPF reapply step title"), body: CONTENT("SPF reapply step copy") },
    { slot: "PM", title: CONTENT("PM step title"), body: CONTENT("PM step copy") },
  ],
  routineIntro: {
    eyebrow: CONTENT("routine eyebrow"),
    headline: CONTENT("routine headline, 3 lines"),
    body: CONTENT("routine paragraph"),
  },
  sustainability: null,
  givesBackHeadline: CONTENT("gives back headline, up to 4 lines"),
  social: [],
};
