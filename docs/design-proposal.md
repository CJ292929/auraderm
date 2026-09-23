# AuraDerm Botanicals — Design Proposal (P1-P1)

Status: reference-to-spec only. No code, no packages, no framework scaffold, nothing pushed or deployed.

All facts below are either taken directly from the OWNER FACTS / BRAND IDENTITY / LAYOUT REFERENCE
supplied for this phase, or explicitly marked `[CONTENT: ...]` where the owner has not yet supplied
something. Nothing about products, actives, botanicals, prices, or sustainability claims is invented.

---

## a. Colour tokens and contrast

### Token table

| Token        | Hex       | Role                                                        |
|--------------|-----------|---------------------------------------------------------------|
| forest-deep  | `#15231A` | Page base, darkest state of pinned background                |
| forest       | `#2F4A2A` | Borders, secondary buttons, text on cream                     |
| gold         | `#C39E3A` | Primary buttons, ONE accent word per headline, prices only    |
| gold-deep    | `#8A6D1F` | Gold text on cream ONLY                                       |
| cream        | `#FBF8EE` | Text on dark, light sections                                  |
| sage-muted   | `#A8B59C` | Secondary text on dark                                        |
| glass fill   | `rgba(47,74,42,0.35)`  | Panel translucency (forest tint)                |
| glass border | `rgba(195,158,58,0.15)`| Panel hairline (gold tint)                       |

**Hard rule carried over from brand identity: `gold` (#C39E3A) is never used as text directly on
`cream`.** Only `gold-deep` (#8A6D1F) is used as gold-toned text on cream.

### Measured contrast (WCAG relative luminance, sRGB)

Because the actual hero video isn't available in this phase, contrast is measured against two
solid-colour proxies already defined by the brand system itself, so nothing is invented:

- **Darkest background frame** — `forest-deep` (#15231A), representing the fully blurred +
  darkened state the background reaches as the user scrolls.
- **Lightest background frame** — `forest` (#2F4A2A), representing the natural mid-tone of the
  unblurred water/greenery hero video (a true video luminance sample isn't available; `forest` is
  the closest existing token and is used as a conservative stand-in, not an invented colour).

Both frames are then composited with the glass fill (`forest` @ 35% opacity) before checking text
contrast, since all body copy in sections 3–8 sits on a glass panel, not on raw background.

| Text colour  | On glass over **darkest** frame | On glass over **lightest** frame | 4.5:1 AA? |
|--------------|:--------------------------------:|:---------------------------------:|:---------:|
| cream        | 13.0 : 1                         | 9.3 : 1                           | ✅ both |
| sage-muted   | 6.4 : 1                          | **4.57 : 1**                      | ⚠️ lightest frame is *just* over the line — treat as fragile |
| gold         | 5.4 : 1                          | **3.84 : 1**                      | 🚫 **fails** on the lightest frame |
| gold-deep on flat cream (#FBF8EE) | 4.60 : 1 (only cream case) | — | ⚠️ passes but marginal |

**Flags and recommended handling:**

1. **`gold` on glass fails contrast (3.84:1) whenever the background hasn't blurred/darkened
   yet** — i.e. in the hero itself, and briefly during the scroll transition before the darkening
   overlay is fully applied. Two compliant options, owner to choose in review:
   - Restrict `gold` **text** to contexts guaranteed to sit over the darkened background (nav pill,
     sections 3 onward) and never use it for body-weight text in the hero; the hero's "one gold
     word per headline" should be set at large-text size (≥24px / ≥18.66px bold), where the AA
     threshold drops to 3:1 and the pairing passes.
   - Or: give the hero's floating glass card (which already sits over the product, not raw video)
     a slightly higher-opacity fill so gold text always renders over glass-darkened video, not the
     sharp lightest frame directly.
2. **`sage-muted` is only 0.07 above the AA cut-off on the lightest frame.** Treat it as
   large-text/secondary-label use only (eyebrows, captions, icon labels) — never body paragraphs —
   so that if actual video luminance samples darker than the `forest` proxy in places, it still
   holds.
3. **`gold-deep` on `cream` (4.60:1) is technically compliant but has almost no margin.** Recommend
   reserving it for headline-weight text (display serif, larger sizes) rather than small print, and
   re-measuring once the real logo/photography palette is available.

No pairing is used below AA at normal text weight without a flag above.

---

## b. Type

| Role              | Family                        | Notes |
|-------------------|--------------------------------|-------|
| Display           | **Cormorant Garamond** (Google Font, free) | High-contrast serif, used title case or true small caps — never condensed all-caps. Headlines, hero copy, section titles. |
| Labels / eyebrows | **Jost** (Google Font, free)   | Geometric sans, wide letter-spacing, caps — echoes the "BOTANICALS" wordmark treatment. Eyebrows, micro-labels ("01 / WORD"), nav links, buttons. |
| Body              | **Jost**, regular weight        | Same family as labels at regular tracking/weight for readability; keeps the sans pairing to one family total. |

**Size scale** (rem, mobile → desktop via clamp, base 16px):
- Display / H1: `clamp(2.25rem, 5vw, 4rem)`
- Display / H2 (section titles): `clamp(1.75rem, 3.2vw, 2.75rem)`
- Display / H3 (card titles): `clamp(1.25rem, 2vw, 1.625rem)`
- Eyebrow / micro-label: `0.75rem`, letter-spacing `0.18em`, uppercase
- Body: `1rem`, line-height `1.6`
- Body small (captions): `0.875rem`

**Body line length:** target 55–75 characters per line; two-column body copy blocks (Actives Split,
Routine) are capped at `max-width: 34ch`–`42ch` so paragraphs don't stretch full glass-panel width
on wide screens.

---

## c. Section-by-section spec (SKINCARE)

Every item the owner hasn't supplied is marked `[CONTENT: ...]`. No product names, ingredient
names, percentages, prices, or claims are invented anywhere below.

### 1. Nav
Floating glass pill, sticky, side margins (not edge-to-edge). Left: menu icon + horizontal logo
lockup `[CONTENT: vector logo — horizontal lockup variant]`. Centre: 4 links —
`[CONTENT: final nav labels, e.g. Shop / Ingredients / Routine / About — owner to confirm]`.
Right: see variant A/B in section **g**.

### 2. Hero
100vh, pinned video background (see **h** for shot spec). Left column: eyebrow (thin rule + small
caps line, `[CONTENT: eyebrow line, e.g. brand tagline]`), 2-line display headline with one word in
gold (`[CONTENT: headline copy]`), 2-line subcopy `[CONTENT: subcopy]`, gold primary button
`[CONTENT: CTA label, e.g. "Shop the routine" — depends on Sells-on-site decision]` + plain text
link `[CONTENT: secondary link label]`. Right edge: vertical glass rail, 3 icon + label trust
badges `[CONTENT: 3 trust claims — cannot draft until actives/botanicals/sustainability facts are
supplied, since generic trust badges risk implying unverified claims]`. Floating glass card over
the product: "Featured" label, `[CONTENT: product name]`, `[CONTENT: size]`, price
(variant A only, see **g**) `[CONTENT: price]`.

### 3. Statement
Centred, 2-line display headline `[CONTENT: statement copy]`, one line of subcopy
`[CONTENT: subcopy]`. Rises as a glass-free (or very-low-opacity) panel while the background
blurs behind it — this section marks the transition point from "sharp hero video" to "blurred pinned
background."

### 4. Ingredients panel
Wide glass panel. Centred title `[CONTENT: panel title, e.g. "The botanicals"]` flanked by small
side labels `[CONTENT: side labels]`. 5 equal columns, each: ingredient image
`[CONTENT: 5 ingredient cut-out photos — see shot list]`, "01 / WORD" micro-label
`[CONTENT: 5 ingredient short-names]`, name `[CONTENT: 5 botanical names]`, one-line benefit
`[CONTENT: 5 benefit lines — must clear CLAIMS REVIEW, see i]`.

### 5. Benefits
3 glass cards, each: icon (thin-line, gold or cream), "01" micro-label, title
`[CONTENT: 3 benefit titles]`, 2-line copy `[CONTENT: 3 benefit descriptions — claims-reviewed]`,
text link with arrow `[CONTENT: link label + destination]`.

### 6. Actives split
Left: eyebrow `[CONTENT]`, 4-line headline `[CONTENT]`, paragraph `[CONTENT — claims-reviewed]`,
gold button `[CONTENT: CTA]`. Right: 4 tall image strips `[CONTENT: 4 active-ingredient photos]`,
each with a circular badge showing the active's short name `[CONTENT: 4 active short-names]` + name
`[CONTENT: 4 active full names]` + one-liner `[CONTENT: 4 one-liners — claims-reviewed]`.

### 7. Routine
Left card: eyebrow `[CONTENT]`, 3-line headline `[CONTENT]`, paragraph `[CONTENT]`, 3 icon rows
`[CONTENT: 3 routine steps]`. Right card: dim product photo `[CONTENT]`, horizontal timeline with
3 nodes, 3 glass mini-cards: **AM**, **SPF REAPPLY**, **PM** — copy for each
`[CONTENT: step copy per node]`.

### 8. Gives back — OPTIONAL, gated on real sustainability facts
Wide glass panel, 4-line headline left `[CONTENT]`, 2×2 icon grid right (items blur in with a
stagger) `[CONTENT: 4 sustainability facts]`. **Per owner facts, "Sustainability: NOT YET
SUPPLIED" — this section is speculatively laid out but must not ship with placeholder claims. If
the owner ultimately has nothing verifiable to say here, the section is cut entirely rather than
filled with soft/generic language ("eco-friendly", "clean", "sustainable") that reads as a claim
without being one.**

---

## d. Scroll-motion spec

| # | Animation | Trigger | Duration / easing | `prefers-reduced-motion` fallback |
|---|-----------|---------|--------------------|-------------------------------------|
| 1 | Hero video autoplay + slow push-in | Page load | Continuous, 8–12s loop, `ease-in-out` push-in over the loop | Poster still image shown, no playback, no push-in |
| 2 | Hero text/nav-content scroll-away | Scroll past hero | Native scroll (no JS-driven parallax) | Unchanged — this is just normal scroll, always on |
| 3 | Background crossfade: sharp hero video → pre-blurred/darkened video | Scroll begins leaving hero (~0–100vh scroll range) | 400–600ms opacity crossfade, `linear`, tied to scroll position (scrubbed, not time-based) | Background is pinned but **static** on the pre-blurred poster/video first frame — no crossfade, no motion |
| 4 | Background pin | Scroll past hero through end of page | `position: sticky` / pinned, no filter changes at runtime | Same pin, but the layer is the pre-blurred **still image** (see Core Design Rule), never live video |
| 5 | Glass panels rise (sections 3–8) | Section enters viewport (IntersectionObserver) | 500–700ms translateY(16–24px)+opacity, `ease-out` | Panels appear in place, no translate, opacity fade only (or instant) |
| 6 | Gives-back 2×2 icon grid stagger | Section 8 enters viewport | 4× 300ms opacity/blur-in, 80ms stagger | Icons appear instantly, no stagger, no blur-in |
| 7 | Nav pill `backdrop-filter` blur | Always on, ≥768px only | N/A (static CSS, not scroll-driven) | Unchanged (not a motion effect) — but see Core Design Rule for the ≥768px gate |

General rule: nothing above ever re-computes a CSS `filter: blur()` on the live video during scroll
(see Core Design Rule). All "blur" the user perceives while scrolling is a **crossfade between two
pre-rendered assets** (#3), not a runtime filter.

---

## e. Mobile layout — ASCII wireframes (390px)

### Hero (section 2)
```
┌──────────────────────────────────┐
│ [≡]        AURADERM        [ ]   │  <- nav pill, variant-dependent right side
├──────────────────────────────────┤
│                                   │
│      (pinned video, sharp,       │
│       product on stone)          │
│                                   │
│  ── EYEBROW LINE ──              │
│  Headline line one                │
│  Headline **gold word**           │
│                                   │
│  Subcopy line one                 │
│  Subcopy line two                 │
│                                   │
│  [  Gold CTA button  ]            │
│   Plain text link                 │
│                                   │
│  ┌ Featured ───────────┐          │
│  │ [Product name]       │          │
│  │ [Size]                │          │
│  │ [Price]  (variant A)  │          │
│  └───────────────────────┘          │
│                                   │
│  (trust-badge rail moves below    │
│   hero content on mobile,         │
│   stacked horizontally, scrollable)│
└──────────────────────────────────┘
```

### Ingredients panel (section 4)
```
┌──────────────────────────────────┐
│         [Panel title]            │
│     side label · side label      │
├──────────────────────────────────┤
│  ┌─────────────────────────────┐ │
│  │ [ingredient image]          │ │
│  │ 01 / WORD                   │ │
│  │ [Ingredient name]           │ │
│  │ [One-line benefit]          │ │
│  └─────────────────────────────┘ │
│  (5 columns collapse to a         │
│   single-column stack, OR a       │
│   horizontal snap-scroll row —    │
│   owner/dev to pick one; snap-    │
│   scroll keeps the "5 equal       │
│   columns" feel better on 390px)  │
│  ┌─────────────────────────────┐ │
│  │           ...  (4 more)      │ │
│  └─────────────────────────────┘ │
└──────────────────────────────────┘
```

### Actives split (section 6)
```
┌──────────────────────────────────┐
│  EYEBROW                         │
│  Headline line 1                 │
│  Headline line 2                 │
│  Headline line 3                 │
│  Headline line 4                 │
│  Paragraph text...               │
│  [ Gold button ]                 │
├──────────────────────────────────┤
│  ┌───────────┐ ┌───────────┐     │
│  │ image      │ │ image      │    │
│  │ (SHORT)    │ │ (SHORT)    │    │
│  │ Name        │ │ Name        │   │
│  │ One-liner   │ │ One-liner   │   │
│  └───────────┘ └───────────┘     │
│  (4 strips become a 2×2 grid;     │
│   text/CTA stack above, image      │
│   grid below — full-bleed          │
│   left/right split isn't viable    │
│   under ~600px)                    │
│  ┌───────────┐ ┌───────────┐     │
│  │ ...        │ │ ...        │    │
│  └───────────┘ └───────────┘     │
└──────────────────────────────────┘
```

---

## f. Components list

| Component | server / client | Notes |
|-----------|:---:|-------|
| `NavPill` | client | Sticky positioning + `backdrop-filter` state, scroll listener |
| `LogoLockup` | server | Static markup/image, no interactivity |
| `HeroVideoBackground` | client | Controls play/pause, `prefers-reduced-motion` + Save-Data checks, poster fallback |
| `HeroContent` | server | Static text/CTA; can be server-rendered and hydrated only for the button |
| `TrustBadgeRail` | server | Static icons + labels |
| `PinnedBackgroundLayer` | client | Owns the crossfade between sharp/pre-blurred assets, scroll-scrubbed opacity |
| `StatementSection` | server | Static, motion handled by a shared `RevealOnScroll` wrapper |
| `RevealOnScroll` (shared wrapper) | client | IntersectionObserver-based rise/fade-in, used by sections 3, 5, 6, 7, 8 |
| `GlassPanel` (shared primitive) | server | Pure styling wrapper, no state |
| `IngredientsPanel` | server | Data-driven list, server-rendered |
| `BenefitCard` ×3 | server | Static per card |
| `ActivesSplit` | server | Static content + image strips |
| `RoutineTimeline` | client | Only if the AM/SPF/PM nodes are interactive (e.g. click to expand); otherwise server |
| `GivesBackGrid` | server | Optional section, gated on real sustainability content |
| `PriceCard` (hero) | server | Content differs by variant A/B, not by interactivity |

---

## g. Nav / hero variants — Sells-on-site: UNDECIDED

### Variant A — Shopify checkout enabled

**Nav right side:** search icon, account icon, cart icon (with count badge).
**Hero price card:** shows `[CONTENT: price]` and an "Add to cart" or "Shop now" CTA tied to
checkout.

```
Nav (A):  [≡] AURADERM        [search] [account] [cart •2]
Hero card:
  Featured
  [Product name]
  [Size]
  [Price]
  [ Add to cart ]
```

### Variant B — No commerce on site

**Nav right side:** icons removed entirely — no search/account/cart. Optionally a single text link
("Where to buy") replaces them.
**Hero price card:** no price field; replaced with a "Where to buy" link/button pointing to
retailers `[CONTENT: retailer list/links, if applicable]`.

```
Nav (B):  [≡] AURADERM             Where to buy
Hero card:
  Featured
  [Product name]
  [Size]
  [ Where to buy → ]
```

Owner decision needed: **A or B**. Nothing downstream (cart logic, Shopify integration, checkout)
is built in this phase regardless of the answer — this is layout-only so the owner can compare.

---

## h. Video + photography shot list

No images or video are generated or hotlinked in this phase. This is a shot list for the owner /
a photographer to fulfill.

1. **Hero background video** — 8–12 second seamless loop. Lush water-and-greenery scene: waterfall
   and pool with visible movement, drifting mist, slow continuous camera push-in (no cut, loops back
   to start cleanly). Product placed on natural stone within the scene, in frame for the duration of
   the loop. Shot at final delivery resolution per the breakpoint budget in the Core Design Rule
   section, and re-encoded into a second, pre-blurred + pre-darkened version at build time (not
   generated at runtime).
2. **5 ingredient cut-outs** — one per botanical column in section 4. Clean, consistent lighting and
   background across all 5 so the column grid reads as a set. `[CONTENT: which 5 ingredients —
   depends on Botanicals: NOT YET SUPPLIED]`.
3. **4 active-ingredient strips** — tall-format shots, one per active in section 6.
   `[CONTENT: which 4 actives — depends on Actives: NOT YET SUPPLIED]`.
4. **Routine shot** — dim/moody product photo for the right card of section 7, styled to sit behind
   the AM/SPF/PM timeline overlay without competing with it.

**Video technical budget** (see Core Design Rule for the rationale):
- Loop length: 8–12s
- Resolution: desktop ≤1920×1080, tablet ≤1280×720, mobile: **no second video** — pre-blurred
  layer is a static image on screens under 768px (only one video decodes at a time)
- File size ceiling: target ≤6MB for the sharp hero loop, ≤3MB for the pre-blurred loop (shorter
  visual complexity compresses smaller); hard ceiling 8MB each before further compression is required
- Poster image: required, extracted from the first frame, served immediately while video loads
- `prefers-reduced-motion`: video does not autoplay; poster still shown; crossfade animation (#3
  in the motion spec) is skipped entirely — background renders directly in its final blurred/dark
  still state with no transition
- Save-Data header / `navigator.connection.saveData`: same fallback as reduced-motion — poster
  still only, no video fetched

---

## i. Claims review

The brand name contains **"Derm"**, and the product category is skincare — both raise the bar for
avoiding language that implies medical/drug claims rather than cosmetic ones. This applies to every
`[CONTENT]` slot above that becomes real copy (ingredient benefits, active one-liners, benefit
card copy, trust badges).

| Avoid | Why | Cosmetic-safe alternative |
|-------|-----|---------------------------|
| "treats", "treatment for [condition]" | Implies drug/medical intervention | "supports the look of", "formulated for" |
| "cures", "heals" | Medical claim | "helps skin appear calmer/smoother" |
| "repairs" (barrier, skin, etc.) | Implies restoring damaged tissue — a physiological/medical claim | "helps support the look of your skin barrier" |
| "clinically proven", "clinically tested" | Requires actual clinical trial data the owner hasn't supplied | Only usable if the owner has real trial data to cite; otherwise omit entirely rather than soften it |
| "anti-acne", "acne treatment" | Drug claim (acne is a medical condition) | "formulated for clarity-prone skin", "for visibly clearer-looking skin" |
| "prescription-strength" | Directly implies drug-level efficacy | Remove entirely — no cosmetic-safe equivalent exists |
| "anti-aging" (used carelessly) | Borderline; regulators in some markets treat this as a claim needing substantiation | "visibly firms", "supports skin's natural elasticity" — still needs owner-verified substantiation |
| "%[active] concentration" without the real number | Implies a specific, verifiable formulation fact | Do not state a percentage until the owner supplies actives/percentages |

**This entire table is an owner decision, not a copywriting default.** No benefit copy, ingredient
line, or trust badge in sections 4–8 should be drafted with real wording until (a) actives and
botanicals are supplied and (b) the owner confirms which claim category each product falls into
(cosmetic vs. requiring substantiation). Until then those slots stay `[CONTENT]`.

---

## j. Self-review

Going through each non-trivial choice above and asking "would any similar skincare brief produce
this same thing?" — i.e., is it actually derived from *this* brand's stated identity, or is it a
generic template default that happens to fit:

- **Initial draft risk: treating "gives back" as a mandatory section.** A generic brief would
  default to including a sustainability section because "skincare brands usually have one." Revised
  to explicitly gate section 8 on the owner actually having verifiable sustainability facts, and to
  state that soft, unverifiable eco-language is worse than cutting the section — this follows
  directly from "Sustainability: NOT YET SUPPLIED" plus the claims-review logic in **i**, not from a
  generic template.
- **Initial draft risk: picking Montserrat as the labels/eyebrows font without checking it against
  the specific wordmark description.** Montserrat was offered as an example in the brief, but Jost
  reads closer to the "widely letter-spaced geometric sans" used in "BOTANICALS" in the actual logo
  description (more geometric, less humanist than Montserrat). Revised to specify **Jost** as the
  primary recommendation, Montserrat noted only as the brief's own fallback example — this is a
  choice tied to the specific logo description, not an arbitrary swap.
- **Initial draft risk: generic trust badges ("Dermatologist tested", "Cruelty-free", "Vegan") to
  fill the hero rail placeholder.** These are the default trio almost any skincare template reaches
  for. Revised to leave all 3 as `[CONTENT]` with an explicit note that they can't be drafted until
  actives/botanicals/sustainability are supplied — inventing even "plausible" trust badges would
  violate the "never invent claims" rule and risks the exact "Derm = implied medical claim" problem
  flagged in **i**.
- **Initial draft risk: silently picking Variant A (commerce) as "the real design" and treating B as
  an afterthought.** Since "Sells on site" is genuinely undecided, both variants are specified at
  equal weight, side by side, with the same level of detail (nav + hero card), so the owner is
  choosing between two finished options rather than a primary design and a stub.
- **Initial draft risk: generic scroll-reveal specs ("fade in on scroll") without tying each one to
  the Core Design Rule's ban on live blur.** Revised the motion spec (**d**) so every entry that
  touches the background explicitly states it's a pre-rendered crossfade, not a runtime filter —
  otherwise a future implementer could "fill in" the spec with `filter: blur()` and violate the
  one non-negotiable constraint in the brief.
- **Kept as-is after review: the contrast measurements using `forest` as the "lightest frame"
  proxy.** Considered inventing a lighter proxy color to make gold-on-glass pass cleanly, but that
  would hide a real risk rather than surface it — kept the measurement honest and flagged the
  failure instead, since the whole point of this section is to catch this before real video assets
  exist.

---

## [CONTENT] checklist — everything the owner must still supply

- Vector logo files: full emblem (cream bg), reversed emblem (forest-deep bg), horizontal nav
  lockup, monogram-only favicon
- Product name(s), size(s), price(s) (price only relevant if Variant A is chosen)
- Actives (which ones, names for section 6 — 4 needed)
- Botanicals (which ones, names for section 4 — 5 needed)
- Sells on site: **A (Shopify checkout) or B (no commerce)** decision
- Sustainability facts, if any exist and are verifiable (section 8 is cut otherwise)
- Photography/video: hero loop, 5 ingredient cut-outs, 4 active strips, 1 routine shot (see **h**)
- All headline/subcopy/CTA/benefit copy throughout sections 1–8 (drafting blocked on claims review
  in **i** until actives/botanicals are known)
- Nav link labels (4)
- Trust badge content for the hero rail (3) — blocked on the same claims-review + facts dependency
- Confirmation on which claim category ("cosmetic" vs. "needs substantiation") applies before any
  benefit/active/ingredient copy is finalized
