import React, { useEffect, useMemo, useRef, useState } from 'react';
import { fetchChapters, fetchVerse, fetchVerses, mapVerse } from '../api/gita';
import ChapterTimeline from '../components/reader/ChapterTimeline';
import SceneStage from '../components/reader/SceneStage';
import VerseReader from '../components/reader/VerseReader';
import './ChapterDetails.css';

function ChapterDetails() {
  const [chapters, setChapters] = useState([]);
  const [chapterNumber, setChapterNumber] = useState(2);
  const [verses, setVerses] = useState([]);
  const [verseNumber, setVerseNumber] = useState(47);
  const [verseData, setVerseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const landOnLastVerse = useRef(false);

  const activeChapter = useMemo(
    () => chapters.find((c) => c.chapter_number === chapterNumber),
    [chapters, chapterNumber]
  );

  const chapterTitle = activeChapter?.name_meaning || activeChapter?.name || '';

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchChapters();
        if (!cancelled) setChapters(data);
      } catch (err) {
        if (!cancelled) setError(err.message || 'Could not load chapters');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const data = await fetchVerses(chapterNumber);
        if (cancelled) return;
        setVerses(data);
        if (landOnLastVerse.current) {
          landOnLastVerse.current = false;
          setVerseNumber(data.length || 1);
        } else {
          setVerseNumber((current) =>
            data.some((v) => v.verse_number === current) ? current : 1
          );
        }
      } catch (err) {
        if (!cancelled) setError(err.message || 'Could not load verses');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [chapterNumber]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const data = await fetchVerse(chapterNumber, verseNumber);
        if (cancelled) return;
        setVerseData(mapVerse(data));
        setError(null);
      } catch (err) {
        if (!cancelled) setError(err.message || 'Could not load this verse');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [chapterNumber, verseNumber]);

  const handleSelectChapter = (n) => {
    landOnLastVerse.current = false;
    setChapterNumber(n);
    setVerseNumber(1);
  };

  const handleNextVerse = () => {
    if (verseNumber < verses.length) {
      setVerseNumber(verseNumber + 1);
      return;
    }
    const nextChapter = chapterNumber < chapters.length ? chapterNumber + 1 : 1;
    landOnLastVerse.current = false;
    setChapterNumber(nextChapter);
    setVerseNumber(1);
  };

  const handlePrevVerse = () => {
    if (verseNumber > 1) {
      setVerseNumber(verseNumber - 1);
      return;
    }
    const prevChapter = chapterNumber > 1 ? chapterNumber - 1 : chapters.length;
    landOnLastVerse.current = true;
    setChapterNumber(prevChapter);
  };

  return (
    <div className="gv-page">
      <SceneStage chapterNumber={chapterNumber} chapterTitle={chapterTitle} />

      {error && <div className="gv-page__status gv-page__status--error">Error: {error}</div>}
      {loading && !verseData && <div className="gv-page__status">Loading the verse…</div>}

      {verseData && (
        <VerseReader
          chapterTitle={chapterTitle}
          verse={verseData}
          verseIndex={verseNumber}
          verseCount={verses.length || verseNumber}
          onPrev={handlePrevVerse}
          onNext={handleNextVerse}
        />
      )}

      <ChapterTimeline
        chapters={chapters}
        activeChapter={chapterNumber}
        onSelect={handleSelectChapter}
      />
    </div>
  );
}

export default ChapterDetails;
