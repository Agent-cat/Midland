import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Navlinks } from "../Constants/Constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navbarRef = useRef(null);
  const menuRef = useRef(null);
  const menuItemsRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  useGSAP(() => {
    const activeLink = document.querySelector(".nav-links .text-red-500");
    const underline = document.querySelector(".nav-underline");
    if (activeLink && underline) {
      gsap.to(underline, {
        width: activeLink.offsetWidth,
        x: activeLink.offsetLeft,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [location]);

  useEffect(() => {
    if (menuRef.current) {
      gsap.to(menuRef.current, {
        x: isMenuOpen ? "0%" : "100%",
        duration: 0.5,
        ease: "power3.inOut",
      });

      if (isMenuOpen) {
        gsap.fromTo(
          menuItemsRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
            delay: 0.2,
          }
        );
      }
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav
        ref={navbarRef}
        className={`flex py-6 cursor-auto md:py-0 select-none rounded-2xl m-2 font-semibold bg-[#d5dbde] text-md font-['Onest',sans-serif] justify-between items-center fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="md:ml-4 flex gap-2 text-red-400 ml-8 md:text-gray-700 text-2xl font-bold">
          Midland
          <span className="text-red-400  hidden md:flex">Real-Estate</span>
        </div>
        <div className="hidden md:flex gap-8 relative nav-links">
          {Navlinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.link}
              className={({ isActive }) =>
                `hover:text-red-500 hover:-translate-y-1 transition-all duration-300 py-6 hover:font-bold font-semibold text-gray-700 ${
                  isActive ? "text-red-500 font-bold" : ""
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <div className="absolute bottom-0 h-0.5 bg-red-500 nav-underline" />
        </div>
        <div className="hidden md:flex mt-4 h-full mr-9 gap-4">
          <NavLink
            to="/login"
            className="relative hover:scale-110 transition-all duration-300 mb-3 group"
          >
            <button className="px-4 py-2 bg-red-400 text-white rounded-md hover:bg-red-500 transition-colors duration-300">
              Login
            </button>
          </NavLink>
          <NavLink
            to="/register"
            className="relative hover:scale-110 transition-all duration-300 mb-3 group"
          >
            <button className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-colors duration-300">
              Register
            </button>
          </NavLink>
        </div>
        {/* Hamburger menu icon */}
        <button onClick={toggleMenu} className="md:hidden mr-4">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Full-width and height menu div */}
      <div
        ref={menuRef}
        className="fixed top-0 right-0 w-full h-full bg-[#d5dbde] z-40 transform translate-x-full"
      >
        <div className="flex flex-col items-center justify-center h-full">
          {Navlinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.link}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `text-3xl mb-8 hover:text-red-500 transition-all duration-300 ${
                  isActive ? "text-red-500 font-bold" : "text-gray-700"
                }`
              }
              ref={(el) => (menuItemsRef.current[index] = el)}
            >
              {link.name}
            </NavLink>
          ))}
          <div className="flex flex-row gap-6 mt-8">
            <NavLink
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="px-8 py-3 bg-red-400 text-white text-xl rounded-md hover:bg-red-500 transition-colors duration-300"
              ref={(el) => (menuItemsRef.current[Navlinks.length] = el)}
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              onClick={() => setIsMenuOpen(false)}
              className="px-8 py-3 bg-gray-400 text-white text-xl rounded-md hover:bg-gray-500 transition-colors duration-300"
              ref={(el) => (menuItemsRef.current[Navlinks.length + 1] = el)}
            >
              Register
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
