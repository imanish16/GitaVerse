import axios from 'axios';

const API_HOST = 'bhagavad-gita3.p.rapidapi.com';
const API_BASE = `https://${API_HOST}/v2`;

/** Prefer env key; fall back to existing project key for local continuity. */
const API_KEY =
  process.env.REACT_APP_RAPIDAPI_KEY ||
  '6930282ed7msh4faa8ee1c6ab1bfp192912jsn2bf8ca1ae65d';

const client = axios.create({
  baseURL: API_BASE,
  headers: {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': API_HOST,
  },
});

export async function fetchChapters() {
  const { data } = await client.get('/chapters/');
  return data;
}

export async function fetchVerses(chapterNumber) {
  const { data } = await client.get(`/chapters/${chapterNumber}/verses/`);
  return data;
}

export async function fetchVerse(chapterNumber, verseNumber) {
  const { data } = await client.get(`/chapters/${chapterNumber}/verses/${verseNumber}/`);
  return data;
}

/**
 * Normalize RapidAPI verse payload into UI-friendly fields.
 * `text` from the API is Sanskrit (Devanagari), not English.
 */
export function mapVerse(verse) {
  if (!verse) return null;

  const translations = verse.translations || [];
  const commentaries = verse.commentaries || [];

  const englishTranslation =
    translations.find((t) => (t.language || '').toLowerCase() === 'english') ||
    translations[0];

  const englishCommentary =
    commentaries.find((c) => (c.language || '').toLowerCase() === 'english') ||
    null;

  const hindiCommentary =
    commentaries.find((c) => (c.language || '').toLowerCase() === 'hindi') ||
    null;

  const transliteration =
    verse.transliteration ||
    verse.transliterations?.[0]?.description ||
    verse.slug?.replace(/-/g, ' ') ||
    null;

  return {
    chapterNumber: verse.chapter_number,
    verseNumber: verse.verse_number,
    sanskrit: verse.text,
    transliteration,
    translation: englishTranslation?.description || '',
    translationAuthor: englishTranslation?.author_name || '',
    meaning: englishCommentary?.description || hindiCommentary?.description || '',
    meaningAuthor: englishCommentary?.author_name || hindiCommentary?.author_name || '',
    meaningLanguage: englishCommentary ? 'english' : hindiCommentary ? 'hindi' : null,
    raw: verse,
  };
}
