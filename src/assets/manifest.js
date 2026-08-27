/**
 * Asset manifest — components resolve art through this file, never hardcoded paths.
 * Optional WebP/MP3 files can be dropped into public/assets/ later; UI will pick them up
 * when you register them here (or when optionalSrc resolves).
 */

const pad = (n) => String(n).padStart(2, '0');

const CHAPTER_SYMBOL_KEYS = [
  'bow',
  'lotus',
  'flame',
  'book',
  'meditation',
  'moon',
  'cosmos',
  'stars',
  'light',
  'sun',
  'cosmic-form',
  'devotion',
  'field',
  'gunas',
  'tree',
  'qualities',
  'faith',
  'liberation',
];

export const UI_ICONS = {
  lotus: '/assets/ui/lotus.svg',
  bow: '/assets/ui/bow.svg',
  book: '/assets/ui/book.svg',
  flute: '/assets/ui/flute.svg',
  scroll: '/assets/ui/scroll.svg',
  lamp: '/assets/ui/lamp.svg',
  peacockFeather: '/assets/ui/peacock-feather.svg',
  conch: '/assets/ui/conch.svg',
  mountain: '/assets/ui/mountain.svg',
  sun: '/assets/ui/sun.svg',
  moon: '/assets/ui/moon.svg',
  star: '/assets/ui/star.svg',
  journal: '/assets/ui/journal.svg',
  chakra: '/assets/ui/chakra.svg',
  listen: '/assets/ui/listen.svg',
};

/** Layered Kurukshetra scene for Chapter 2 (SVG stand-ins; swap for WebP later). */
export const CH2_SCENE_LAYERS = [
  { id: 'sky', src: '/assets/chapters/ch-02/layers/01-sky.svg', motion: 'parallax-slow' },
  { id: 'mountains', src: '/assets/chapters/ch-02/layers/02-mountains.svg', motion: 'parallax-slow' },
  { id: 'battlefield', src: '/assets/chapters/ch-02/layers/03-battlefield.svg', motion: 'still' },
  { id: 'chariot', src: '/assets/chapters/ch-02/layers/04-chariot.svg', motion: 'still' },
  { id: 'arjuna', src: '/assets/chapters/ch-02/layers/05-arjuna.svg', motion: 'breathe' },
  { id: 'krishna', src: '/assets/chapters/ch-02/layers/06-krishna.svg', motion: 'breathe' },
  { id: 'foreground', src: '/assets/chapters/ch-02/layers/07-foreground.svg', motion: 'parallax-fast' },
  { id: 'particles', src: '/assets/chapters/ch-02/layers/08-particles.svg', motion: 'float' },
];

export function getChapterAssets(chapterNumber) {
  const n = Number(chapterNumber) || 1;
  const id = pad(n);
  const base = `/assets/chapters/ch-${id}`;

  return {
    number: n,
    symbolKey: CHAPTER_SYMBOL_KEYS[n - 1] || 'lotus',
    symbol: `${base}/ch${id}-symbol.svg`,
    // Optional raster slots — register when files exist
    cover: null,
    background: null,
    thumb: null,
    scene: null,
    sceneLayers: n === 2 ? CH2_SCENE_LAYERS : null,
    listenFallback: 'tts',
    verseAudio: (verseNumber) => `/assets/audio/verses/ch${id}-v${pad(verseNumber)}.mp3`,
  };
}

export function getAllChapterSymbols() {
  return Array.from({ length: 18 }, (_, i) => getChapterAssets(i + 1));
}
