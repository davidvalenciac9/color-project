import React from 'react';
import './styles/page.css';

export default function Page({children}) {
  return (
    <section className="page">
      {children}
    </section>
  );
}
