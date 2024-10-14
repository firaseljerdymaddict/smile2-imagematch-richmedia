"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import components
const LandingPage = dynamic(() => import("@/components/LandingPage"), {
  ssr: false,
});
const ShowImageScreen = dynamic(() => import("@/components/ShowImage"), {
  ssr: false,
});
const CameraFeed = dynamic(() => import("@/components/CameraFeed"), {
  ssr: false,
});
const MatchingPage = dynamic(() => import("@/components/MatchingPage"), {
  ssr: false,
});
const TrailerPage = dynamic(() => import("@/components/TrailerPage"), {
  ssr: false,
});
const BookNowPage = dynamic(() => import("@/components/BookNowPage"), {
  ssr: false,
});

export default function Home() {
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [showImageScreen, setShowImageScreen] = useState(false);
  const [showCameraScreen, setShowCameraScreen] = useState(false);
  const [showMatchingPage, setShowMatchingPage] = useState(false);
  const [showBookNowPage, setShowBookNowPage] = useState(false); // New state for BookNowPage
  const [showTrailerPage, setShowTrailerPage] = useState(false); // State for TrailerPage
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  // Function to handle the scene change from LandingPage to ShowImageScreen
  const handleSceneChange = () => {
    setTimeout(() => {
      setShowLandingPage(false);
      setShowImageScreen(true);
    }, 1500); // Delay matches the exit animation duration of LandingPage
  };

  // Function to handle capture completion from CameraFeed
  const handleCaptureComplete = (imageData: string) => {
    setCapturedImage(imageData); // Store the captured image data
    setShowCameraScreen(false); // Hide the camera screen after image is captured
    setShowMatchingPage(true); // Show the MatchingPage
  };

  // Function to handle the transition from MatchingPage to the BookNowPage
  const handleMatchingPageExit = () => {
    setTimeout(() => {
      setShowMatchingPage(false); // Hide MatchingPage after exit animation completes
      setShowBookNowPage(true); // Show the BookNowPage
    }, 1000); // Match the duration of the exit animation
  };

  // Function to directly switch to the camera screen
  const handleSceneChangeToFuture = () => {
    setShowImageScreen(false);
    setShowCameraScreen(true);
  };

  const handleRetry = () => {
    setShowMatchingPage(false); // Hide the MatchingPage after the animation
    setShowCameraScreen(true); // Show the CameraFeed again to retake the picture
  };

  // Function to handle "Watch Trailer" button click and show TrailerPage
  const handleWatchTrailerClick = () => {
    setShowBookNowPage(false); // Hide the BookNowPage
    setShowTrailerPage(true); // Show the TrailerPage
  };

  return (
    <main>
      {showLandingPage && <LandingPage onStartClick={handleSceneChange} />}

      {showImageScreen && (
        <ShowImageScreen onTryNowClick={handleSceneChangeToFuture} />
      )}

      {showCameraScreen && (
        <CameraFeed onCaptureComplete={handleCaptureComplete} />
      )}

      {/* Show MatchingPage and pass the captured image */}
      {showMatchingPage && capturedImage && (
        <MatchingPage
          imageUrl={capturedImage}
          onExitComplete={handleMatchingPageExit} // Pass the exit function to MatchingPage
          onRetry={handleRetry} // Pass the retry function to MatchingPage
        />
      )}

      {/* Show BookNowPage after the MatchingPage */}
      {showBookNowPage && (
        <BookNowPage
          bookingUrl="https://www.fourstarfilms.me/movie/93/smile-2/" // URL that opens in new tab
          onWatchTrailerClick={handleWatchTrailerClick} // Pass the handler for watching the trailer
        />
      )}

      {/* Show TrailerPage after clicking "Watch Trailer" */}
      {showTrailerPage && (
        <TrailerPage
          videoUrl="https://maddict-videos.s3.eu-north-1.amazonaws.com/Smile+2+_+Official+Trailer+(2024+Movie)+-+Naomi+Scott%2C+Lukas+Gage.mov"
          bookingUrl="https://www.fourstarfilms.me/movie/93/smile-2/" // URL that opens in new tab
        />
      )}
    </main>
  );
}
