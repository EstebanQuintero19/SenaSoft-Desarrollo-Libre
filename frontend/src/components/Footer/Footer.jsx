import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <span className="footer-logo" aria-hidden="true">#</span>
        <p className="footer-text">Copyright © 2025 - All rights reserved</p>
        <div className="footer-social">
          <a href="#" aria-label="Twitter" className="social-link">
            <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
              <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.27 4.27 0 001.88-2.36 8.45 8.45 0 01-2.7 1.04 4.24 4.24 0 00-7.3 3.87A12.03 12.03 0 013 4.8a4.24 4.24 0 001.31 5.66 4.21 4.21 0 01-1.92-.53v.05a4.24 4.24 0 003.4 4.16 4.27 4.27 0 01-1.91.07 4.25 4.25 0 003.96 2.94A8.5 8.5 0 012 19.54a12 12 0 006.49 1.9c7.79 0 12.05-6.46 12.05-12.06 0-.18 0-.35-.01-.53A8.59 8.59 0 0022.46 6z" />
            </svg>
          </a>
          <a href="#" aria-label="YouTube" className="social-link">
            <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
              <path d="M21.58 7.2a2.66 2.66 0 00-1.88-1.9C18.06 5 12 5 12 5s-6.06 0-7.7.3a2.66 2.66 0 00-1.88 1.9A27.86 27.86 0 002.1 12a27.86 27.86 0 00.52 4.8 2.66 2.66 0 001.88 1.9C5.94 19 12 19 12 19s6.06 0 7.7-.3a2.66 2.66 0 001.88-1.9A27.86 27.86 0 0021.9 12a27.86 27.86 0 00-.32-4.8zM10 15.27V8.73L15.18 12 10 15.27z" />
            </svg>
          </a>
          <a href="#" aria-label="Facebook" className="social-link">
            <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
              <path d="M13.5 22v-7h2.39l.36-2.8H13.5V10.2c0-.81.22-1.36 1.38-1.36h1.48V6.3A19.22 19.22 0 0013.83 6c-2.1 0-3.54 1.28-3.54 3.63v2.03H8v2.8h2.29v7h3.21z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
