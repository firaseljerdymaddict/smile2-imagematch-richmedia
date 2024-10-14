"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import lottieRain from "@/public/lotties/lottie-animation.json"; // Adjust path if needed

interface LandingPageProps {
  onStartClick: () => void; // onStartClick is a function that returns nothing (void)
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartClick }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [showLottie, setShowLottie] = useState(false);
  const [showButton, setShowButton] = useState(false);

  // Animation Variants
  const containerVariants = {
    visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 1 } }, // Container exit animation
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

  const lottieVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
    exit: { opacity: 0, y: 50, transition: { duration: 0.8 } }, // Lottie exit animation
  };

  const bgVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.5 } },
    exit: { opacity: 0, transition: { duration: 1.5 } }, // Background exit animation, fades out over 1.5 seconds
  };

  // Handle button press to trigger exit animations
  const handleStartClick = () => {
    setIsExiting(true);
    setTimeout(() => onStartClick(), 1000); // Trigger the scene change in the parent component after the animation starts
  };

  // Trigger Lottie after a 1-second delay, then trigger the button after Lottie starts
  useEffect(() => {
    const lottieTimeout = setTimeout(() => {
      setShowLottie(true);
    }, 1000); // Delay Lottie by 1 second

    const buttonTimeout = setTimeout(() => {
      setShowButton(true);
    }, 2500); // Delay the button appearance by 1.5 seconds after the Lottie starts (total 2.5 seconds)

    return () => {
      clearTimeout(lottieTimeout);
      clearTimeout(buttonTimeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="relative h-[100svh] w-full flex flex-col justify-between items-center overflow-hidden"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={containerVariants}
        >
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

          {/* Text Overlay - Now at the top */}
          <motion.div
            className="relative text-center w-full text-[#B6292E] font-bold font-gothicSerif z-20 mt-12"
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

          {/* Lottie Animation - Starts after a 1-second delay */}
          <AnimatePresence>
            {showLottie && (
              <motion.div
                className="relative w-full flex flex-col items-center justify-center z-20 ml-16 mb-16"
                style={{ flexGrow: 1 }}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={lottieVariants}
              >
                <div className="w-full h-auto flex justify-center items-center z-10 pointer-events-none">
                  <Lottie
                    animationData={lottieRain}
                    loop={false}
                    className="w-full h-auto max-w-[800px]" // Ensures the Lottie animation scales responsively and is centered
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Button appears after Lottie starts */}
          <AnimatePresence>
            {showButton && (
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
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LandingPage;
