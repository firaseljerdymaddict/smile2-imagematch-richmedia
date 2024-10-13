import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Define the type for the onTryNowClick prop
interface ShowImageProps {
  onTryNowClick: () => void; // This defines the prop type as a function that returns void
}

const ShowImage: React.FC<ShowImageProps> = ({ onTryNowClick }) => {
  const [isExiting, setIsExiting] = useState(false); // State to trigger exit animations

  const handleExit = () => {
    setIsExiting(true); // Trigger exit animations
    setTimeout(() => {
      onTryNowClick(); // Switch to future screen after animations
    }, 1000); // Adjust this delay to match the exit animation duration
  };

  return (
    <AnimatePresence>
      {!isExiting && ( // Only show the content while it's not exiting
        <motion.div
          className="bg-black h-screen flex flex-col"
          initial={{ opacity: 0 }} // Initial state (fully transparent)
          animate={{ opacity: 1 }} // Final state (fully visible)
          exit={{ opacity: 0 }} // Exit state (fade out)
          transition={{ duration: 1 }} // Duration of fade-in and fade-out
        >
          {/* Title section at the top (30% height on small, scales up on larger screens) */}
          <motion.div
            className="flex flex-col items-center justify-center h-[30svh] md:h-[25svh] lg:h-[20svh]"
            initial={{ y: -50, opacity: 0 }} // Initial position and opacity
            animate={{ y: 0, opacity: 1 }} // Final position and opacity
            exit={{ y: -50, opacity: 0 }} // Exit with reverse animation (slide up and fade out)
            transition={{ duration: 1.2, delay: 0.5 }} // Add delay to match entrance animation
          >
            <motion.h1
              className="text-white text-3xl md:text-4xl lg:text-5xl font-gothicSerif"
              exit={{ opacity: 0, y: -20 }} // Animate text out (slide up and fade out)
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              MATCH THE
            </motion.h1>
            <motion.h1
              className="text-white text-3xl md:text-4xl lg:text-5xl font-gothicSerif mt-1 md:mt-2 lg:mt-3"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }} // Animate out same as in
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              SMILE IN THIS
            </motion.h1>
            <motion.h1
              className="text-white text-3xl md:text-4xl lg:text-5xl font-gothicSerif mt-1 md:mt-2 lg:mt-3"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }} // Animate out same as in
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              PICTURE
            </motion.h1>
          </motion.div>

          {/* Image section (40% height) */}
          <motion.div
            className="flex items-center justify-center h-[40svh]"
            initial={{ scale: 0.8, opacity: 0 }} // Initial scale and opacity
            animate={{ scale: 1, opacity: 1 }} // Final scale and opacity
            exit={{ scale: 0.8, opacity: 0 }} // Animate out (shrink and fade)
            transition={{ duration: 1, delay: 1.2 }} // Delay for smooth sync with text
          >
            <div className="relative w-[70vw] h-[70vw] md:w-[50vw] md:h-[50vw] lg:w-[20vw] lg:h-[20vw] md:mt-16">
              <Image
                src="/images/image-to-match.jpg"
                alt="Image to match"
                layout="fill"
                objectFit="cover"
                className="object-contain border-2 rounded-xl border-[#B60000]"
              />
            </div>
          </motion.div>

          {/* Button section (fixed at the bottom with same width as image) */}
          <motion.div
            className="flex items-center justify-center mt-auto mb-8"
            initial={{ opacity: 0, y: 20 }} // Start slightly lower and transparent
            animate={{ opacity: 1, y: 0 }} // End in position and fully visible
            exit={{ opacity: 0, y: 20 }} // Animate out (fade and slide down)
            transition={{ duration: 1, delay: 1.5 }} // Delay to sync with the previous elements
          >
            <button
              className="bg-[#B60000] text-white font-gothicSerif text-lg font-bold py-3 rounded-full hover:bg-red-700 transition-all duration-300 w-[70vw] md:w-[50vw] lg:w-[20vw]"
              onClick={handleExit} // Trigger the exit animations on click
            >
              TRY NOW
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShowImage;
