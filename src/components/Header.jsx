import React from 'react';
import '../styles/header.css';

export default function Header() {
  return (
    <header className="header">
        <a href='/' className="header_link">
            <h1 className="header_title">The Peak Store</h1>
        </a>
    </header>
  );
}