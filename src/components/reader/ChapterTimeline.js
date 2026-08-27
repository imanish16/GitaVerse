import React, { useEffect, useRef } from 'react';
import { getChapterAssets } from '../../assets/manifest';
import './ChapterTimeline.css';

function ChapterTimeline({ chapters = [], activeChapter, onSelect }) {
  const listRef = useRef(null);
  const activeRef = useRef(null);

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [activeChapter]);

  return (
    <section className="gv-timeline" aria-label="Chapters">
      <div className="gv-timeline__header">
        <h2 className="gv-timeline__title">Chapters</h2>
        <p className="gv-timeline__hint">Choose where to read</p>
      </div>
      <div className="gv-timeline__track" ref={listRef} role="list">
        {chapters.map((chapter) => {
          const n = chapter.chapter_number;
          const assets = getChapterAssets(n);
          const isActive = n === activeChapter;
          return (
            <button
              key={n}
              type="button"
              role="listitem"
              ref={isActive ? activeRef : null}
              className={`gv-timeline__node${isActive ? ' is-active' : ''}`}
              onClick={() => onSelect(n)}
              aria-current={isActive ? 'true' : undefined}
            >
              <span className="gv-timeline__symbol" aria-hidden="true">
                <img src={assets.symbol} alt="" width="28" height="28" />
              </span>
              <span className="gv-timeline__num">{String(n).padStart(2, '0')}</span>
              <span className="gv-timeline__name">
                {chapter.name_meaning || chapter.name || `Chapter ${n}`}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default ChapterTimeline;
