import React from 'react';

const icons = [
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d302d066a1b584a76dcb47e01363f0c98b5ba32ec2639b42b4a5932eb8ae853f?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4", alt: "Icon 1" },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/79d79bbdcd856bf0cb0e68d08e824ea2655f2b6a8d3914495441598a948707b5?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4", alt: "Icon 2" },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/5a9ea77e357080f9da19e4505a6cc4a81cbe68c4205fda7614ebfd4ea3935626?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4", alt: "Icon 3" },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/fcb3b0ce79a6f334636aec600fe57fbea457d1c039643344254cbb17be283ec4?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4", alt: "Icon 4" },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/87e0d9de835372eef916dd9396a1705c31cd1f5f17cf5fcbd99e49ba569a3418?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4", alt: "Icon 5" }
];

function IconBar() {
  return (
    <>
      <header className="icon-bar">
        <div className="divider" />
        <nav className="icon-container">
          {icons.map((icon, index) => (
            <button key={index} className="icon-button" aria-label={icon.alt}>
              <img src={icon.src} alt={icon.alt} className="icon" />
            </button>
          ))}
        </nav>
      </header>
      <style jsx>{`
        .icon-bar {
          display: flex;
          max-width: 430px;
          flex-direction: column;
        }
        .divider {
          background-color: var(--Schemes-Outline-Variant, #cac4d0);
          min-height: 1px;
          width: 100%;
          border: 1px solid rgba(202, 196, 208, 1);
          transform: rotate(8.742277657347563e-8rad);
        }
        .icon-container {
          background-color: #fff;
          display: flex;
          align-items: start;
          gap: 20px;
          justify-content: space-between;
          padding: 33px 48px;
        }
        .icon-button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }
        .icon {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 30px;
        }
        .icon-button:nth-child(4) .icon {
          aspect-ratio: 1.1;
          width: 33px;
        }
      `}</style>
    </>
  );
}

export default IconBar;
