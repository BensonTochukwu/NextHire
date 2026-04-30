import React, { useEffect, useState } from "react";
import NavBar from "../components/Navbar";
import Hero from "../components/Hero";
import JobListing from "../components/JobListing";
import AppDownload from "../components/AppDownload";
import Footer from "../components/Footer";
import { ArrowUp } from "lucide-react";

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div id="top">
      <NavBar />
      <Hero />
      <JobListing />
      <AppDownload />
      <Footer />

      {/* BACK TO TOP BUTTON */}
      <button
        onClick={scrollToTop}
        className={`
          fixed bottom-6 right-6 bg-black text-white w-12 h-12 
          rounded-full flex items-center justify-center shadow-lg 
          transition-all duration-300 z-50 cursor-pointer
          ${
            isScrolled
              ? "opacity-100 translate-y-0"
              : "opacity-0 pointer-events-none translate-y-3"
          }
        `}
        aria-label="Back to top"
      >
        <ArrowUp size={18} />
      </button>
    </div>
  );
};

export default Home;