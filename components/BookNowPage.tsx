"use client";

import React, { useState } from "react";
import { FaTicketAlt, FaPlayCircle } from "react-icons/fa"; // Importing icons for the buttons
import { motion, AnimatePresence } from "framer-motion"; // Importing Framer Motion for animations
import Image from "next/image"; // Importing Image from Next.js

interface BookNowPageProps {
  bookingUrl: string; // Expecting the booking URL as a prop
  onWatchTrailerClick: () => void; // Function to handle watch trailer button click
}

const BookNowPage: React.FC<BookNowPageProps> = ({
  bookingUrl,
  onWatchTrailerClick,
}) => {
  const [isExiting, setIsExiting] = useState(false); // State to handle exit animation

  const handleWatchTrailerClick = () => {
    setIsExiting(true); // Start the exit animation
    setTimeout(() => {
      onWatchTrailerClick(); // Trigger the trailer action after 1 second
    }, 1000); // 1-second delay before triggering the trailer action
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="h-[100svh] bg-black flex flex-col items-center justify-between"
          initial={{ opacity: 0 }} // Start with opacity 0
          animate={{ opacity: 1 }} // Animate to full opacity
          exit={{ opacity: 0 }} // Fade out when exiting
          transition={{ duration: 1 }} // Smooth 1 second fade in and out
        >
          {/* Top Section: Reserved for the next image (70% of the screen height) */}
          <motion.div
            className="h-[70%] w-full flex items-center justify-center mt-16 md:mt-16 lg:mt-14"
            initial={{ y: -50, opacity: 0 }} // Image starts slightly offscreen and invisible
            animate={{ y: 0, opacity: 1 }} // Slide in to its normal position and become visible
            exit={{ y: -50, opacity: 0 }} // Slide out and fade when exiting
            transition={{ duration: 1, ease: "easeInOut" }} // Smooth transition for the image
          >
            <Image
              src="/images/poster.jpg"
              alt="Next Image"
              width={1000} // You can set the width and height for proper aspect ratio
              height={500}
              className="w-full md:w-[65%] lg:w-[50%] h-auto object-cover"
            />
          </motion.div>

          {/* Bottom Section: Two Buttons side by side (Remaining 30% of the screen) */}
          <motion.div
            className="h-[30%] w-full flex flex-row justify-center items-center space-x-4"
            initial={{ y: 50, opacity: 0 }} // Buttons start below the view and invisible
            animate={{ y: 0, opacity: 1 }} // Slide in from below and become visible
            exit={{ y: 50, opacity: 0 }} // Slide down and fade out when exiting
            transition={{ duration: 0.8, delay: 0.5, ease: "easeInOut" }} // Slight delay to start the button animation
          >
            {/* Book Now Button */}
            <button
              className="flex items-center justify-center bg-[#B60000] text-white font-gothicSerif text-lg font-bold py-3 rounded-full hover:bg-red-700 transition-all duration-300 w-[45vw] md:w-[25vw] lg:w-[20vw]"
              onClick={() => window.open(bookingUrl, "_blank")} // Open booking link in a new tab
            >
              <FaTicketAlt className="mr-2" /> {/* Book Now Icon */}
              Book Now
            </button>

            {/* Watch Trailer Button */}
            <button
              className="flex items-center justify-center bg-[#B60000] text-white font-gothicSerif text-lg font-bold py-3 rounded-full hover:bg-red-700 transition-all duration-300 w-[45vw] md:w-[25vw] lg:w-[20vw]"
              onClick={handleWatchTrailerClick} // Trigger the exit animation, then trailer action
            >
              <FaPlayCircle className="mr-2" /> {/* Watch Trailer Icon */}
              Watch Trailer
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookNowPage;
