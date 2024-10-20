import React, { useState, useEffect } from "react";
import video from "../assets/video1.mp4";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const videoElement = document.getElementById("backgroundVideo");
    videoElement.addEventListener("loadeddata", () => {
      setIsLoading(false);
    });

    return () => {
      videoElement.removeEventListener("loadeddata", () => {
        setIsLoading(false);
      });
    };
  }, []);

  return (
    <div className="relative h-[100vh] w-full overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="text-white text-2xl">Loading...</div>
        </div>
      )}
      <video
        id="backgroundVideo"
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src={video} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-50"></div>
      <div className="absolute inset-0 flex items-center justify-center"></div>
    </div>
  );
};

export default Home;
