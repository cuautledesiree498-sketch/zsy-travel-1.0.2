# Infinite Travel DESIGN.md v1

> Project: Infinite Travel / 无限旅途国际旅行社  
> Domain: `https://www.infinitravel.net`  
> Purpose: AI-readable visual direction for future design and coding agents.  
> Status: v1, based on current site direction plus selected lessons from Airbnb, Apple, Mastercard/Wise, and Notion/Mintlify-style reading systems.

---

## 1. Brand Atmosphere

Infinite Travel is a premium tailor-made China travel advisory site for overseas travelers.

The interface should feel:

- **Clear before beautiful**: the site exists to help visitors understand whether a route, destination, payment step, or planning decision makes sense.
- **Premium but warm**: refined, spacious, trustworthy, and human; not cold luxury, not bargain-tourism noise.
- **Travel-advisor-like**: the tone should feel like a calm expert helping a family, private group, study group, or business guest make practical decisions.
- **Photography-led**: destinations should be felt through real images, not generic gradient decorations.
- **Bilingual-aware**: English and Chinese must switch cleanly. Do not stack English first and Chinese after it on the same visible page.

Borrowed direction:

- From **Airbnb**: warm destination browsing, photography-first cards, approachable rounded surfaces.
- From **Apple**: restraint, whitespace, image confidence, fewer but stronger statements.
- From **Mastercard / Wise**: trust, payment clarity, low-friction financial/process explanation.
- From **Notion / Mintlify**: readable long-form guides, clear hierarchy, calm documentation-like structure where useful.

Do not imitate any single brand. The result should be recognizably Infinite Travel.

---

## 2. Visual Theme

### Core feeling

A soft premium travel editorial system:

- light canvas
- deep navy structure
- misty blue-gray panels
- warm off-white surfaces
- restrained gold/sand accents where needed
- real destination photography
- rounded but not childish cards
- low, soft shadows

### Current base tokens

The current site already uses:

```css
--color-background: #f7f9fc;
--color-foreground: #10233d;
--color-night: #081321;
--color-navy: #10233d;
--color-navy-soft: #173053;
--color-panel: #ffffff;
--color-panel-2: #eef3f9;
--color-soft-white: #fbfdff;
--color-ink: #10233d;
--color-slate: #233954;
--color-muted: #6f829d;
--color-line: rgba(16,35,61,0.1);
--color-accent: #dfe9f7;
--color-accent-strong: #ffffff;
```

Keep this base. Extend carefully rather than replacing everything.

### Recommended semantic palette

| Role | Token idea | Hex | Use |
|---|---|---:|---|
| Deep Navy | `--color-navy` | `#10233d` | primary text, buttons, navigation emphasis |
| Night Navy | `--color-night` | `#081321` | dark overlays, hero gradients, premium contrast |
| Soft Sky | `--color-background` | `#f7f9fc` | page background |
| Panel White | `--color-panel` | `#ffffff` | cards, content blocks |
| Mist Blue | `--color-panel-2` | `#eef3f9` | secondary panels, process blocks |
| Muted Slate | `--color-muted` | `#6f829d` | body support text, metadata |
| Warm Sand | optional | `#d8c49a` | tiny premium accent, not dominant |
| Soft Gold | optional | `#b9965b` | payment/trust highlights, use sparingly |
| Line | `--color-line` | `rgba(16,35,61,0.1)` | borders, section separation |

Avoid:

- bright orange promo travel colors
- random purple/blue AI gradients
- neon green/black developer SaaS themes
- too many accent colors

---

## 3. Typography

### Current issue

The current site is functional but still leans on default/system typography in places. Future improvements should make typography feel more intentional.

### Direction

Use a refined sans-serif system with good English readability and decent Chinese fallback.

Recommended hierarchy:

| Use | Style |
|---|---|
| Hero titles | large, restrained, high line-height control; avoid overly tight Chinese text |
| Section titles | strong navy, clear weight, not all sections centered |
| Body text | readable, 1.7–1.9 line height for articles and guides |
| Metadata | small uppercase tracking for English only; Chinese should not be over-letter-spaced |
| CTAs | compact uppercase in English; natural short labels in Chinese |

### Rules

- Long article pages should prioritize reading comfort over visual drama.
- Chinese pages should not inherit aggressive English uppercase/letter-spacing patterns.
- Avoid making every heading huge. Luxury comes from proportion, not shouting.
- Avoid dense paragraphs inside cards. Split into scannable sections.

---

## 4. Layout Principles

### General page structure

Use:

- generous top/bottom spacing
- max-width content containers
- card grids only when they help comparison
- asymmetric rhythm where possible
- clear primary CTA, softer secondary CTA

Avoid:

- endless identical three-card sections
- centered hero + three features + CTA template repetition
- cramped legal/payment text
- placing too many buttons in one viewport

### Recommended spacing

| Context | Rule |
|---|---|
| Page shell | `max-w-6xl` or `max-w-7xl`, `px-6`, `py-20/24` |
| Card padding | `p-6` to `p-8`; `p-10` for editorial blocks |
| Section gaps | `mt-10`, `mt-14`, `gap-6/8` |
| Article body | narrower readable column, not full 7xl width for paragraphs |
| Hero | image-led where useful, but content must remain readable |

### Page-specific layout

#### Home

- Should quickly explain what Infinite Travel does.
- Hero should feel travel-premium, not SaaS landing page.
- Featured destinations and route cases should be image-led.
- Avoid too many abstract claims before showing routes or destinations.

#### Destinations

- Destination cards need strong, correctly cropped images.
- Cards should answer: why this place, who it suits, how it connects to a route.
- Avoid generic stock-looking destination cards.

#### Tours / Route Cases

- Treat routes as planning references, not fixed products.
- Explain route logic, suitable travelers, pacing, and modification options.
- Do not overpromise exact price or availability unless confirmed.

#### Insights / Articles

- Must support clean language switching.
- English and Chinese should not appear sequentially on one page.
- Reading experience should be calm: clear headings, comfortable line length, visible CTA after the argument.

#### Contact / Payment / Refund / Terms

- Must feel trustworthy and plain-spoken.
- Use warm panels and process steps.
- Avoid legal overclaiming; prefer “subject to final confirmation / supplier rules / written agreement”.

---

## 5. Components

### Buttons

Primary CTA:

- deep navy background
- white text
- rounded full pill
- medium weight
- no neon glow

Secondary CTA:

- white or transparent background
- navy border
- navy text
- hover can invert to navy background

Avoid:

- too many competing CTA colors
- giant button stacks
- aggressive urgency copy like “BOOK NOW!!!”

### Cards

Destination / route cards:

- rounded `1.5rem–2rem`
- real image on top or as background
- subtle shadow
- clear title
- short explanation
- one primary action

Information cards:

- warm white or mist-blue surface
- thin border
- soft shadow only if needed
- concise labels

Avoid:

- generic icon-only feature cards everywhere
- cards with no concrete destination/route information
- excessive gradient cards

### Navigation

- Keep simple: Services, Destinations, Insights, Payment, About, Contact.
- Language switch should be visible but not dominant.
- On detail pages, keep “Back to Insights/Destinations” clear.

### Hero sections

- Use full-bleed or wide images when they add emotional value.
- Always add readable overlay gradient if text sits on image.
- Do not use an image if it has bad crop, weak focal point, or unclear destination identity.

---

## 6. Photography Rules

Photography is a core brand asset.

### Good images

- real destination-specific feeling
- clear subject
- enough negative space for cropping
- natural colors
- premium but not fake
- works in card crop and hero crop

### Bad images

- wrong city/country
- AI-looking fantasy scenes
- over-saturated tourism poster look
- ultra-wide panoramas that crop badly in cards
- tiny low-resolution images
- generic passport/globe/travel icons as destination images

### Practical rule

Before using an image for a card, check:

1. Does it still work at card ratio?
2. Is the destination recognizable or at least believable?
3. Is the focal point not cut off?
4. Is file size reasonable?
5. Does it match the page’s emotional tone?

The Chengdu fix on 2026-04-26 is the model: crop and optimize the existing appropriate image rather than blindly replacing it with a random external image.

---

## 7. Content Tone and Microcopy

### English tone

- calm
- advisory
- specific
- non-hype
- route-judgment oriented

Good:

> “This route works best when the trip needs a softer middle section.”

Bad:

> “Discover the magic of China with unforgettable memories!”

### Chinese tone

- natural Chinese, not translated English
- clear judgment
- less marketing fluff
- more route logic and practical explanation

Good:

> “这条路线适合想把节奏放慢一点的家庭或私人小团。”

Bad:

> “探索神奇中国，开启难忘旅程。”

### Bilingual rule

- UI should switch language, not show both languages stacked.
- If content is stored as bilingual fields, render current language only.
- If legacy PortableText has English section followed by Chinese section, split by language at render time or migrate content into proper bilingual structure.

---

## 8. Trust and Conversion Rules

Trust should come from clarity, not pressure.

Use:

- clear process steps
- what happens before payment
- what information users should send
- what is confirmed later
- refund/cancellation boundaries
- realistic route advice

Avoid:

- fake urgency
- unverified guarantees
- hard legal promises without business confirmation
- hiding uncertainty
- over-polished but vague claims

Payment pages should feel like Mastercard/Wise-inspired clarity: warm, safe, direct, and easy to understand.

---

## 9. Responsive Behavior

Mobile is important because travel users often browse casually.

Rules:

- Cards stack cleanly.
- Tap targets must be comfortable.
- Hero text must not be hidden behind fixed nav.
- Large images should not create awkward face/landmark crops.
- Long articles should keep readable line-height and spacing.
- Language switch should remain accessible on detail pages.

Avoid:

- desktop-only visual assumptions
- huge fixed hero heights that bury content on mobile
- dense three-column text on tablet

---

## 10. Do / Don’t

### Do

- Use real travel images with strong crop.
- Keep route logic visible.
- Make articles easy to read.
- Use navy/white/mist-blue as the structural system.
- Use warm accents sparingly.
- Make legal/payment language calm and clear.
- Keep bilingual UX as a switch.

### Don’t

- Don’t use black-neon developer aesthetics.
- Don’t copy Airbnb/Apple/Mastercard/Notion directly.
- Don’t use random gradients to make pages “look designed”.
- Don’t mix English and Chinese full text on the same page.
- Don’t use placeholder-feeling cards.
- Don’t overpromise prices, refunds, or legal guarantees.
- Don’t use wrong-location images.

---

## 11. Agent Prompt Guide

When asking an AI coding/design agent to work on Infinite Travel, use this type of instruction:

> Read `DESIGN.md` first. Keep the Infinite Travel visual direction: premium warm China travel advisory, deep navy, warm white, mist-blue panels, real photography, calm route-judgment copy, no SaaS neon, no cheap tour-agency promo style. Maintain bilingual switching instead of stacking English and Chinese.

For article pages:

> Improve readability using the Infinite Travel DESIGN.md. Keep long-form guide structure clear, use current language only, add route-judgment CTA without making the page feel salesy.

For destination pages:

> Prioritize image crop, destination-specific context, suitable traveler type, route pairing, and inquiry CTA. Avoid generic tourism-card styling.

For payment/legal pages:

> Make the page feel trustworthy and clear. Use warm process panels, conservative wording, and avoid unverified guarantees.

---

## 12. Current Known Design Debt

- Typography can be upgraded beyond default Arial/system feel.
- Some Chinese UI strings in source files may appear garbled in terminal display; verify with reliable file reads before editing.
- Article body bilingual structure should eventually be migrated to proper localized content fields rather than relying on render-time splitting.
- More destination images should be audited for crop quality and authenticity.
- The site should eventually have a more deliberate mobile navigation system.

---

## 13. Success Criteria

A future page change is successful if:

- it feels like the same brand as the rest of Infinite Travel;
- it improves clarity or conversion without adding noise;
- it uses images responsibly;
- it does not introduce generic AI landing-page patterns;
- it works in English and Chinese cleanly;
- it builds successfully and can be verified on the live site.
