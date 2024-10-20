import React, { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import Navbar from "./Components/Navbar";
import Navroutes from "./Routes/Navroutes";

const App = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className=" select-none font-['Onest',sans-serif]">
      <Navbar />
      <Navroutes />
    </div>
  );
};

export default App;
