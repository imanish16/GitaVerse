# GitaVerse Visual Bible (stub)

Use this as the art direction contract for any future illustration or AI generation.
Do not ship unrelated one-off images that break character consistency.

## Product feel

A quiet, cinematic anime storybook — modern minimal UI + expressive Indian mythology artwork.
Not a purple SaaS dashboard. Not a collage of mismatched AI images.

## Palette

| Role | Hex | Notes |
|------|-----|-------|
| Parchment | `#F7F0E4` | Page / app background |
| Ink | `#2C1A0E` | Primary text |
| Soft ink | `#5C4030` | Secondary text |
| Clay | `#C46B3A` | Accent / CTA |
| Gold | `#D4AA7D` | Soft highlight |
| Krishna blue | `#5B8FA8` | Character only |
| Sunset | `#E8A05A` → `#C46B3A` | Kurukshetra skies |

## Typography

- Display / brand: Libre Baskerville
- Body: Source Serif 4 or Libre Baskerville
- Sanskrit: Noto Serif Devanagari (or system Devanagari)
- Avoid Jersey 10 / playful display fonts in the reader

## Characters

- Krishna and Arjuna must keep the same face, proportions, clothing, jewelry, and rendering across every pose.
- Age: timeless young adult mythic figures (not hyper-chibi, not photoreal).
- Emotion states map to product moments: greeting, explaining, listening, worried, determined — not random “happy Krishna.”

## Chapter art system

Each chapter folder may contain:

- `chNN-symbol.svg` (required for nav)
- `chNN-cover.webp`, `chNN-bg.webp`, `chNN-thumb.webp`, `chNN-scene.webp` (optional)

Chapter 2 uses layered plates under `chapters/ch-02/layers/` for parallax.

## Do

- Prefer WebP/AVIF for raster; SVG for symbols and UI icons
- Use the naming convention under `public/assets/`
- Keep motion purposeful (scene breathe, verse transition)

## Don't

- Purple glow glassmorphism UI kits
- Generic 3D trophies / sparkle stickers
- Marketing copy like “Embark on a magical journey”
- Mixing unrelated art styles across chapters
