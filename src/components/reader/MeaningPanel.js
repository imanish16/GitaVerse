import React, { useState } from 'react';
import { getEverydayExample } from './examples';
import './MeaningPanel.css';

function MeaningPanel({ chapterNumber, verseNumber, meaning, meaningAuthor }) {
  const [open, setOpen] = useState(false);
  const [showExample, setShowExample] = useState(false);

  const example = getEverydayExample(chapterNumber, verseNumber);
  const shortMeaning = meaning
    ? meaning.length > 420
      ? `${meaning.slice(0, 420).trim()}…`
      : meaning
    : 'No commentary is available for this verse yet.';

  return (
    <div className="gv-meaning">
      <button
        type="button"
        className={`gv-meaning__toggle${open ? ' is-open' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        What does this mean?
      </button>

      {open && (
        <div className="gv-meaning__body">
          <p className="gv-meaning__text">{shortMeaning}</p>
          {meaningAuthor && (
            <p className="gv-meaning__author">— {meaningAuthor}</p>
          )}

          <button
            type="button"
            className="gv-meaning__example-toggle"
            onClick={() => setShowExample((v) => !v)}
            aria-expanded={showExample}
          >
            {showExample ? 'Hide example' : 'An everyday example'}
          </button>

          {showExample && <p className="gv-meaning__example">{example}</p>}
        </div>
      )}
    </div>
  );
}

export default MeaningPanel;
