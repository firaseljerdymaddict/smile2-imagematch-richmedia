import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import lottieRain from "@/public/lotties/lottie-arrow.json";
import Image from "next/image"; // Import Image from next/image

interface CameraFeedProps {
  onCaptureComplete: (imageData: string) => void; // Callback to pass image data
}

const CameraFeed: React.FC<CameraFeedProps> = ({ onCaptureComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isFlashing, setIsFlashing] = useState(false);
  const [isLottieVisible, setIsLottieVisible] = useState(true); // Manage Lottie visibility
  const [flashComplete, setFlashComplete] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  // Access camera stream
  useEffect(() => {
    async function getCameraStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing the camera:", err);
      }
    }

    getCameraStream();
  }, []);

  // Function to capture a snapshot
  const takeSnapshot = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context) {
        // Capture the image from the video feed
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert canvas to image URL
        const dataURL = canvas.toDataURL("image/png");
        setCapturedImage(dataURL); // Store captured image locally

        setIsFlashing(true);
        setTimeout(() => {
          setIsFlashing(false);
          setFlashComplete(true);
          setButtonVisible(false);
          setIsLottieVisible(false); // Hide Lottie after button press

          // After capture, start showing exit animation after 2 seconds
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => {
              // Send the captured image back to the parent (Home component)
              onCaptureComplete(dataURL);
              //console.log("Captured image sent to parent");
            }, 1000); // Additional delay to let the exit animation complete
          }, 2000); // 2 seconds delay before exit starts
        }, 300); // Flash effect delay
      }
    }
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="h-[100svh] flex flex-col items-center justify-between relative"
          initial={{ backgroundColor: "#ffffff" }}
          animate={{ backgroundColor: "#000000" }}
          transition={{ duration: 1.5 }}
          exit={{
            backgroundColor: "#ffffff",
            opacity: 0, // Fade out the whole screen
            transition: { duration: 1, ease: "easeInOut" },
          }}
        >
          <motion.div
            className="w-full h-[75%] mt-8 flex justify-center md:h-[65%] md:mt-16"
            initial={{ scale: 1 }}
            animate={
              flashComplete
                ? {
                    scale: [1, 1.2, 0.9, 1],
                    transition: {
                      type: "spring",
                      stiffness: 50,
                      damping: 10,
                    },
                  }
                : { scale: 1 }
            }
            exit={{
              scale: 0, // Add scaling exit
              opacity: 0, // Fade out with scaling
              transition: { duration: 0.7, ease: "easeInOut" }, // Slower for smoother exit
            }}
          >
            {capturedImage ? (
              <Image
                src={capturedImage}
                alt="Captured snapshot"
                width={500} // Specify a width for optimization
                height={500} // Specify a height for optimization
                className="w-full h-full object-cover rounded-md md:w-[80%] md:h-full"
              />
            ) : (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover rounded-md md:w-[80%] md:h-full"
              />
            )}
          </motion.div>

          <canvas ref={canvasRef} style={{ display: "none" }} />

          <motion.div className="w-full flex items-center justify-center pb-12 md:pb-16 relative">
            {isLottieVisible && (
              <Lottie
                animationData={lottieRain}
                loop={true}
                className="w-32 h-32 md:w-24 md:h-24 absolute left-10"
                style={{ pointerEvents: "none" }}
              />
            )}

            {buttonVisible && (
              <motion.button
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                className="relative flex items-center justify-center w-20 h-20 bg-white rounded-full md:w-32 md:h-32"
                onClick={takeSnapshot}
                initial={{ opacity: 1 }}
                animate={{
                  opacity: flashComplete ? 0 : 1,
                  transition: { duration: 0.3 },
                }}
                exit={{
                  scale: 0.8, // Add exit scaling to the button
                  opacity: 0, // Fade out
                  transition: { duration: 0.5, ease: "easeInOut" },
                }}
              >
                <div className="absolute inset-1 border-4 border-black rounded-full"></div>
              </motion.button>
            )}
          </motion.div>

          <AnimatePresence>
            {isFlashing && (
              <motion.div
                className="absolute top-0 left-0 w-full h-full bg-white z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CameraFeed;
