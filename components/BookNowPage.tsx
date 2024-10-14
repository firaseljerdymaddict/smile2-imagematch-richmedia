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

    // Trigger the "watch_trailer" event in Google Analytics
    if (typeof window.gtag === "function") {
      window.gtag("event", "watch_trailer", {
        event_category: "User Actions",
        event_label: "Watch Trailer Button",
        value: 1,
      });
    }

    setTimeout(() => {
      onWatchTrailerClick(); // Trigger the trailer action after 1 second
    }, 1000); // 1-second delay before triggering the trailer action
  };

  const handleBookNowClick = () => {
    // Trigger the "book_now_first" event in Google Analytics
    if (typeof window.gtag === "function") {
      window.gtag("event", "book_now_first", {
        event_category: "User Actions",
        event_label: "Book Now Button",
        value: 1,
      });
    }

    window.open(bookingUrl, "_blank"); // Open booking link in a new tab
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="h-[100svh] bg-black flex flex-col justify-between items-center"
          initial={{ opacity: 0 }} // Start with opacity 0
          animate={{ opacity: 1 }} // Animate to full opacity
          exit={{ opacity: 0 }} // Fade out when exiting
          transition={{ duration: 1 }} // Smooth 1-second fade in and out
        >
          {/* Top Section for the Image */}
          <motion.div
            className="flex-grow-0 flex-shrink-0 h-[60%] w-[90%] flex items-center justify-center mt-16 md:mt-16 lg:mt-14"
            initial={{ y: -50, opacity: 0 }} // Image starts slightly offscreen and invisible
            animate={{ y: 0, opacity: 1 }} // Slide in to its normal position and become visible
            exit={{ y: -50, opacity: 0 }} // Slide out and fade when exiting
            transition={{ duration: 1, ease: "easeInOut" }} // Smooth transition for the image
          >
            <Image
              src="/images/poster.jpg"
              alt="Next Image"
              width={500} // Set the width and height for proper aspect ratio
              height={250}
              className="w-full md:w-[65%] lg:w-[50%] h-auto object-cover"
            />
          </motion.div>

          {/* Bottom Section for the Buttons */}
          <motion.div
            className="flex-grow-0 mt-12 sm:mt-16 flex-shrink-0 h-[30%] w-full flex flex-row justify-center items-center space-x-4"
            initial={{ y: 50, opacity: 0 }} // Buttons start below the view and invisible
            animate={{ y: 0, opacity: 1 }} // Slide in from below and become visible
            exit={{ y: 50, opacity: 0 }} // Slide down and fade out when exiting
            transition={{ duration: 0.8, delay: 0.5, ease: "easeInOut" }} // Slight delay to start the button animation
          >
            {/* Book Now Button */}
            <button
              className="flex items-center justify-center bg-[#B60000] text-white font-gothicSerif text-lg font-bold py-3 rounded-full hover:bg-red-700 transition-all duration-300 w-[45vw] md:w-[25vw] lg:w-[20vw]"
              onClick={handleBookNowClick} // Call the event tracking and open booking link
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
