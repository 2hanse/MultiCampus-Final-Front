import React from 'react';

export default function Footer() {
  return (
    <footer className="footer-container">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/736ac1aa27ad8f949e50ba8f925d49388dfa94ac68a35a17932cf80f7b9d61ed?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4"
        alt=""
        className="footer-image"
      />
      <style jsx>{`
        .footer-container {
          margin-top: auto;
        }

        .footer-image {
          aspect-ratio: 4.29;
          object-fit: cover;
          width: 100%;
          margin-top: 46px;
        }
      `}</style>
    </footer>
  );
}
