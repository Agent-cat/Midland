import React, { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import Navbar from "./Components/Navbar";
import Navroutes from "./Routes/Navroutes";
import axios from "axios";

const App = () => {
  const [data, setData] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/properties");
      setProperties(response.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();

    // Lenis smooth scroll setup
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
    <div className="select-none font-['Onest',sans-serif]">
      <Navbar
        data={data}
        setData={setData}
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
      />
      <Navroutes
        data={data}
        setData={setData}
        loggedIn={loggedIn}
        properties={properties}
        loading={loading}
        refreshProperties={fetchProperties}
      />
    </div>
  );
};

export default App;
