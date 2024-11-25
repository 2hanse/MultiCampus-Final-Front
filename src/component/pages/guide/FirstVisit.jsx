import React, { useEffect, useState } from 'react';
import MapPage from '../MapPage';
import GuidePage from './GuidePage';

const FirstVisit = () => {
  const [showGuide, setShowGuide] = useState(true);

  useEffect(() => {
    const hasSeenGuide = localStorage.getItem('hasSeenGuide');
    if (!hasSeenGuide) {
      setShowGuide(true);
      localStorage.setItem('hasSeenGuide', 'true');
    }
  }, []);

  return (
    <div>
      {showGuide ? (
        <GuidePage onClose={() => setShowGuide(false)} />
      ) : (
        <MapPage />
      )}
    </div>
  );
};

export default FirstVisit;
