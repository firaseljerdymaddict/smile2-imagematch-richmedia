"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import lottieRain from "@/public/lotties/lottie-rain.json"; // Adjust path if needed

interface LandingPageProps {
  onStartClick: () => void; // onStartClick is a function that returns nothing (void)
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartClick }) => {
  const [isExiting, setIsExiting] = useState(false);

  // Animation Variants
  const containerVariants = {
    visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.3 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.8 } }, // Text exit animation
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.6 } },
    pulse: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
    },
    exit: { opacity: 0, y: 50, transition: { duration: 0.8 } }, // Button exit animation
  };

  const bgVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.5 } },
    exit: { opacity: 0, transition: { duration: 1.5 } }, // Background exit animation, fades out over 1.5 seconds
  };

  // Handle button press to trigger exit animations
  const handleStartClick = () => {
    setIsExiting(true);
    onStartClick(); // Trigger the scene change in the parent component after the animation starts
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="relative h-[100svh] w-full flex flex-col justify-center items-center overflow-hidden"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={containerVariants}
        >
          {/* Lottie Animation Overlay */}
          <div className="absolute top-0 w-full h-[50vh] z-10 flex justify-center items-start">
            <Lottie
              animationData={lottieRain}
              loop={true}
              className="w-full h-auto" // Ensures the Lottie animation stretches to cover the top part of the screen
              style={{
                position: "absolute",
                zIndex: 10,
                pointerEvents: "none", // Ensures it doesn't block other UI elements
              }}
            />
          </div>

          {/* Background Image */}
          <motion.div className="absolute inset-0" variants={bgVariants}>
            <Image
              src="/images/background.jpg"
              alt="Background Image"
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Text Overlay */}
          <motion.div
            className="absolute text-center w-full text-[#B6292E] font-bold font-gothicSerif mt-40 sm:mt-40 md:mt-24 z-20"
            variants={textVariants}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl leading-none tracking-widest w-[100%]">
              TAKE A SELFIE
            </h1>
            <h1 className="text-4xl md:text-6xl lg:text-7xl leading-none tracking-[0.3em] w-[100%] mt-2 pl-1 md:pl-1 lg:pl-2">
              MATCH THE
            </h1>
            <h1 className="text-7xl md:text-8xl lg:text-9xl leading-none tracking-[0.3em] md:tracking-[0.55em] lg:tracking-[0.42em] w-[100%] mt-16 pl-4 md:pl-8 lg:pl-8">
              SMILE
            </h1>
          </motion.div>

          {/* Button with pulsing animation only when not exiting */}
          <motion.div
            className="absolute bottom-10 w-full flex justify-center z-20"
            variants={buttonVariants}
            initial="hidden"
            animate={isExiting ? "visible" : ["visible", "pulse"]} // Stop pulsing when exiting
            exit="exit" // This enables the button to animate out
          >
            <motion.button
              className="bg-[#B60000] text-white font-gothicSerif font-bold text-lg rounded-[70px] w-[75%] md:w-[70%] lg:w-[60%] max-w-[1000px] py-3 md:py-4 lg:py-5"
              whileHover={{ scale: 1.2 }} // Button scales up on hover for additional interactivity
              whileTap={{
                scale: 0.95,
                boxShadow: "0px 0px 15px rgba(0,0,0,1)",
              }} // Button scales down on press with a shadow effect
              onClick={handleStartClick}
            >
              START
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LandingPage;
