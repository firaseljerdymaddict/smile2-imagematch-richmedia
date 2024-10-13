import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MatchingPageProps {
  imageUrl: string; // Expecting the image URL as a prop
  onExitComplete: () => void; // Callback to trigger when exit animation is done
}

const MatchingPage: React.FC<MatchingPageProps> = ({
  imageUrl,
  onExitComplete,
}) => {
  const [isExiting, setIsExiting] = useState(false); // State to trigger exit animations

  const handleExit = () => {
    setIsExiting(true); // Trigger exit animations
    setTimeout(() => {
      onExitComplete(); // Call the exit complete function after animations
    }, 1000); // Adjust this delay to match the exit animation duration
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="h-[100svh] bg-black flex flex-col"
          initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
          animate={{ backgroundColor: "rgba(0, 0, 0, 1)" }}
          exit={{ opacity: 0 }} // Fade out the background opacity
          transition={{ duration: 1 }} // Background fades out over 1 second
        >
          {/* Top Image (Next Image) */}
          <motion.div
            className="flex justify-center items-center h-[25%] md:h-[25%]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }} // Title slides up and fades out
            transition={{ duration: 1, delay: 0.2 }}
          >
            <img
              src="/images/feariscoming.png"
              alt="Next Image"
              className="w-[70%] h-auto md:w-[50%] object-contain"
            />
          </motion.div>

          {/* Full width container with 50% for each image */}
          <div className="w-full h-[45%] md:h-[50%] flex">
            {/* Left side: Image to match */}
            <motion.div
              className="w-1/2 h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }} // Slide the left image out to the left
              transition={{ duration: 1, delay: 0.5 }}
            >
              <img
                src="/images/image-to-match.jpg"
                alt="Image to Match"
                className="w-full h-full object-cover"
              />
            </motion.div>
            {/* Right side: Captured Image */}
            <motion.div
              className="w-1/2 h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }} // Slide the right image out to the right
              transition={{ duration: 1, delay: 0.7 }}
            >
              <img
                src={imageUrl}
                alt="Captured Image"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          {/* Button at the bottom */}
          <motion.div
            className="flex justify-center items-center h-[25%] md:h-[25%]"
            initial={{ y: 100, scale: 0.8, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 100, scale: 0.8, opacity: 0 }} // Button slides down and fades out
            transition={{ duration: 0.8, delay: 1 }} // Button animates out last
          >
            <button
              className="bg-[#B60000] text-white font-gothicSerif text-lg font-bold py-3 rounded-full hover:bg-red-700 transition-all duration-300 w-[60vw] md:w-[60vw] lg:w-[60vw]"
              onClick={handleExit}
            >
              Watch Trailer
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MatchingPage;
