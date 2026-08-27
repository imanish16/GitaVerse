import React from 'react';
import { getChapterAssets } from '../../assets/manifest';
import './SceneStage.css';

function SceneStage({ chapterNumber, chapterTitle }) {
  const assets = getChapterAssets(chapterNumber);
  const layers = assets.sceneLayers;

  if (!layers) {
    return (
      <div className="gv-scene gv-scene--simple" aria-hidden="true">
        <div className="gv-scene__simple-symbol">
          <img src={assets.symbol} alt="" width="64" height="64" />
        </div>
        <p className="gv-scene__caption">
          Chapter {chapterNumber}
          {chapterTitle ? ` · ${chapterTitle}` : ''}
        </p>
      </div>
    );
  }

  return (
    <div className="gv-scene" role="img" aria-label={`Chapter ${chapterNumber} scene`}>
      {layers.map((layer) => (
        <div
          key={layer.id}
          className={`gv-scene__layer gv-scene__layer--${layer.motion}`}
          style={{ backgroundImage: `url(${layer.src})` }}
        />
      ))}
      <div className="gv-scene__veil" />
    </div>
  );
}

export default SceneStage;
