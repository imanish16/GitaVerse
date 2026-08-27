import React, { useEffect, useState } from 'react';
import { UI_ICONS } from '../../assets/manifest';
import './ListenButton.css';

function ListenButton({ text, label = 'Listen' }) {
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    // Stop speech when verse text changes
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
  }, [text]);

  const toggle = () => {
    if (!text || typeof window === 'undefined' || !window.speechSynthesis) return;

    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.92;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <button
      type="button"
      className={`gv-listen${speaking ? ' is-speaking' : ''}`}
      onClick={toggle}
      disabled={!text}
      aria-pressed={speaking}
    >
      <img src={UI_ICONS.listen} alt="" width="20" height="20" aria-hidden="true" />
      <span>{speaking ? 'Stop' : label}</span>
    </button>
  );
}

export default ListenButton;
