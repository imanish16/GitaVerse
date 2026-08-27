import React from 'react';
import ListenButton from './ListenButton';
import MeaningPanel from './MeaningPanel';
import './VerseReader.css';

function VerseReader({
  chapterTitle,
  verse,
  verseIndex,
  verseCount,
  onPrev,
  onNext,
}) {
  if (!verse) return null;

  const { chapterNumber, verseNumber, sanskrit, transliteration, translation } = verse;

  return (
    <article className="gv-reader">
      <div className="gv-reader__chrome">
        <button type="button" className="gv-reader__nav" onClick={onPrev} aria-label="Previous verse">
          ←
        </button>
        <p className="gv-reader__progress">
          {verseIndex} / {verseCount}
        </p>
        <button type="button" className="gv-reader__nav" onClick={onNext} aria-label="Next verse">
          →
        </button>
      </div>

      <header className="gv-reader__header">
        <p className="gv-reader__chapter">
          Chapter {chapterNumber}
          {chapterTitle ? ` · ${chapterTitle}` : ''}
        </p>
        <h1 className="gv-reader__ref">
          {chapterNumber}.{verseNumber}
        </h1>
      </header>

      {sanskrit && (
        <p className="gv-reader__sanskrit" lang="sa">
          {sanskrit}
        </p>
      )}

      {transliteration && (
        <p className="gv-reader__translit">{transliteration}</p>
      )}

      {translation && (
        <p className="gv-reader__translation">{translation}</p>
      )}

      <div className="gv-reader__actions">
        <ListenButton text={translation || sanskrit} />
      </div>

      <MeaningPanel
        chapterNumber={chapterNumber}
        verseNumber={verseNumber}
        meaning={verse.meaning}
        meaningAuthor={verse.meaningAuthor}
      />
    </article>
  );
}

export default VerseReader;
