import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorNotFound404.css';

export default function ErrorNotFound404() {
  return (
    <div className="gv-404">
      <p className="gv-404__code">404</p>
      <h1 className="gv-404__title">This page isn’t here</h1>
      <p className="gv-404__text">Go back to reading, or pick a chapter from the timeline.</p>
      <Link className="gv-404__link" to="/chapter-verse">
        Start reading
      </Link>
    </div>
  );
}
