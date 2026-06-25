# Roots Now — Project Progress

## File Architecture
```
roots/
├── index.html              (v1 — original design)
├── style.css
├── script.js
├── logo-*.png
├── v2/
├── v3/
├── v4/                     ★ v1 Design + Optimized Content ★
├── v5/                     ★ v2 Design + Optimized Content ★
├── v6/                     ★ Mixed v4 + v5 Sections ★
│   ├── index.html          All sections assembled
│   ├── style.css           Full v6 styling
│   ├── script.js           All JS features
│   ├── pexels-kampus-8931666.jpg
│   ├── pexels-kindelmedia-6868937.jpg
│   └── pexels-basil-29657646.jpg
└── progress.md
```

## v6 — Section Status

| Section | Source | Status |
|---------|--------|--------|
| Header | v4 | Done |
| Hero | v4 | Done |
| About | v5 hybrid | Done |
| How It Works | v4 + sticky CSS | Done |
| Features | v5 | Done |
| Harvest | v4 + articles CTA | Done |
| Stats bar | v5 | Done |
| Technology | v5 hybrid + SVG icons | Done |
| Pricing | v5 text + v4 cards | Done |
| Mission & Vision | v5 | Done |
| Testimonials | v5 carousel + v4 people + real photos | Done |
| CTA Band | v5 (US background image) | Done |
| Contact | v4 + Live Harvest Network canvas | Done |
| Footer | v4 | Done |
| Back to Top | v4 | Done |
| Modal | v4 | Done |

## Completed
- v6 folder structure created
- Header + Hero from v4 imported
- About section from v5 hybrid with kicker + about-grid + problem-stats
- How It Works from v4 with step-list bullets + step-art images + pure CSS sticky stacking animation
- art-1: Unsplash produce market, art-2: Unsplash hydroponic towers, art-3: pexels-kampus-8931666.jpg
- Marquee from v5 placed just before footer
- Features section from v5 with 6 cards (3-col → 2-col → 1-col responsive)
- Harvest section ("Today on the towers") from v4 with 4 hcards + "Read all our articles" CTA
- Stats bar: 6 stats with count-up animation, gradient background, responsive grid
- Technology section: 2-column layout, 5 SVG tech spec icons, image zoom on hover, badge overlay
- Pricing section: 3 cards (Nest Basket, Gastronomy Box, Atelier Palette) with billing toggle, unavail features, pricing note, plan pre-selection via CTA click
- Mission & Vision: gradient mission card, text-gradient headings, icon labels, font-weight 700
- Testimonials: 8-card carousel with auto-rotate, swipe, dots, real pravatar photos
- CTA Band: full-width background (Golden Gate Bridge, USA), overlay, button, micro-logistics copy
- Contact: 2-column layout, form with plan dropdown + billing toggle, inline captcha with refresh, field validation (red borders + error messages), Live Harvest Network canvas animation
- Contact bullets moved to right side below form
- Footer logo enlarged to 56px
- All sections responsive at 1024px and 720px breakpoints

## Design Conventions
- `.kicker` pill badge from v4 replaces v5's `.section-tag` for section labels
- `.section-h2` / `.section-body` from v5 for headings
- `.reveal-item` / `.is-visible` scroll animation from v5
- `.reveal` scroll animation from v4 for legacy sections
- CSS variables: `--brand-green`, `--brand-lime`, `--surface`, `--border`, `--text`, `--text-muted`, `--bg`, `--bg-2`, `--bg-3`
- Font: Montserrat (display/body) + Fraunces (serif accent)
- Icons: inline SVGs with `currentColor` for theme support

## Key Decisions
- Pure CSS stacking for How It Works (no JS) — position: sticky, inverted z-index, opaque backgrounds
- Billing toggle syncs between pricing section and contact form
- Pricing CTA buttons set plan selection directly via `setSelectedPlan()` (no sessionStorage)
- Captcha uses inline flex layout with text input + refresh button
- Field validation uses `checkValidity()` on blur + submit
- Live Harvest Network canvas animation from v5 hero adapted for contact section

## Next Steps
- (none — all sections complete)
