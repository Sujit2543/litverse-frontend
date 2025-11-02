import React from 'react';

// --- CSS Animations & Global Styles ---
// We define the animations and global dark mode styles here.
const GlobalStyles = () => (
  <style>{`
    @keyframes blinkBackground {
      0%   { background-color: #FFADAD; } /* Light Red */
      20%  { background-color: #ADFFAD; } /* Light Green */
      40%  { background-color: #ADADFF; } /* Light Blue */
      60%  { background-color: #FFFFAD; } /* Light Yellow */
      80%  { background-color: #ADFFFF; } /* Light Cyan */
      100% { background-color: #FFADFF; } /* Light Magenta */
    }

    @keyframes safeFade {
      0%   { background-color: #e0f7fa; } /* Light Cyan */
      50%  { background-color: #e8eaf6; } /* Light Indigo */
      100% { background-color: #e0f7fa; } /* Light Cyan */
    }
    
    .blinking-bg { animation: blinkBackground 10s infinite step-end; }
    .safe-bg { animation: safeFade 30s infinite ease-in-out; }

    /* Dark mode backgrounds */
    .dark .blinking-bg {
      animation-name: none; /* Blinking is too harsh in dark mode */
      background-color: #1a202c;
    }
    
    @keyframes safeFadeDark {
      0%   { background-color: #1a202c; } /* Dark Gray */
      50%  { background-color: #2d3748; } /* Darker Gray */
      100% { background-color: #1a202c; } /* Dark Gray */
    }
    
    .dark .safe-bg {
      animation-name: safeFadeDark;
    }
    
    /* Simple toggle switch styles */
    .toggle-switch {
      position: relative;
      display: inline-block;
      width: 50px;
      height: 24px;
    }
    .toggle-switch input { opacity: 0; width: 0; height: 0; }
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      transition: .4s;
      border-radius: 24px;
    }
    .slider:before {
      position: absolute;
      content: "";
      height: 16px;
      width: 16px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }
    input:checked + .slider { background-color: #dc2626; }
    input:checked + .slider:before { transform: translateX(26px); }

    /* Star Rating Styles */
    .star-rating span {
      cursor: pointer;
      font-size: 1.75rem;
      color: #ccc;
    }
    .star-rating span.filled,
    .star-rating span.hover {
      color: #f59e0b; /* Amber 500 */
    }
  `}</style>
);

export default GlobalStyles;