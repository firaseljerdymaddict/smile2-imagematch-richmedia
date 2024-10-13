import React from "react";
import { motion } from "framer-motion";

interface TrailerPageProps {
  videoUrl: string; // Expecting the video URL as a prop
  bookingUrl: string; // URL to open when button is clicked
}

const TrailerPage: React.FC<TrailerPageProps> = ({ videoUrl, bookingUrl }) => {
  const handleBookNowClick = () => {
    window.open(bookingUrl, "_blank"); // Opens the URL in a new tab
  };

  return (
    <motion.div
      className="h-[100svh] bg-black flex flex-col justify-between items-center"
      initial={{ opacity: 0 }} // Background starts as transparent
      animate={{ opacity: 1 }} // Fades in to full opacity
      transition={{ duration: 1 }} // Animation duration for background
    >
      {/* Video section taking up 50% of the screen height, centered */}
      <motion.div
        className="flex-grow flex justify-center items-center w-full"
        initial={{ scale: 0.8 }} // Video starts scaled down
        animate={{ scale: 1 }} // Scales up to full size
        transition={{ duration: 1, delay: 0.5 }} // Delay video animation until after background
      >
        <div className="w-[80%] h-[50%] flex justify-center items-center">
          <video
            src={videoUrl}
            controls
            className="w-full h-full object-contain" // Ensures the video scales well and is centered
          />
        </div>
      </motion.div>

      {/* Button section at the bottom */}
      <motion.div
        className="w-full flex justify-center items-center pb-12"
        initial={{ y: 100, opacity: 0 }} // Button starts off-screen and transparent
        animate={{ y: 0, opacity: 1 }} // Moves up into place and fades in
        transition={{ duration: 0.8, delay: 1 }} // Delays after video scales in
      >
        <motion.button
          className="bg-[#B60000] text-white font-gothicSerif text-lg font-bold py-3 rounded-full hover:bg-red-700 transition-all duration-300 w-[60vw] md:w-[60vw] lg:w-[60vw]"
          onClick={handleBookNowClick}
          whileHover={{ scale: 1.1 }} // Slightly scale up on hover
          animate={{
            scale: [1, 1.05, 1], // Pulse effect (grow and shrink)
          }}
          transition={{
            repeat: Infinity, // Repeat the animation infinitely
            repeatType: "reverse", // Reverse the animation after each cycle
            duration: 1.5, // Pulse duration
            ease: "easeInOut", // Smooth transition
            delay: 2, // Delay until after initial animation
          }}
        >
          Book Ticket Now
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default TrailerPage;
