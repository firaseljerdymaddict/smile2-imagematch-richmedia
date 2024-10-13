"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import LandingPage
const LandingPage = dynamic(() => import("@/components/LandingPage"), {
  ssr: false,
});

const ShowImageScreen = dynamic(() => import("@/components/ShowImage"), {
  ssr: false,
});

export default function Home() {
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [showImageScreen, setShowImageScreen] = useState(false);
  const [showFutureScreen, setShowFutureScreen] = useState(false);

  // Function to handle the scene change from LandingPage to ShowImageScreen
  const handleSceneChange = () => {
    setTimeout(() => {
      setShowLandingPage(false);
      setShowImageScreen(true);
    }, 1500); // Delay matches the exit animation duration of LandingPage
  };

  // Function to directly switch to the future screen
  const handleSceneChangeToFuture = () => {
    setShowImageScreen(false);
    setShowFutureScreen(true);
  };

  return (
    <main>
      {showLandingPage && (
        // Show LandingPage and pass handleSceneChange as onStartClick
        <LandingPage onStartClick={handleSceneChange} />
      )}

      {showImageScreen && (
        // Show Image Screen and pass the scene change function
        <ShowImageScreen onTryNowClick={handleSceneChangeToFuture} />
      )}

      {showFutureScreen && (
        // Future screen placeholder (replace this with the actual future screen)
        <h1>Hey</h1>
      )}
    </main>
  );
}
