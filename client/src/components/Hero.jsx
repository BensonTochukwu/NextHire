import React, { useContext, useRef } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Hero = () => {
  const { setSearchFilter, setIsSearched } = useContext(AppContext);

  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const onSearch = () => {
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });
    setIsSearched(true);
  };

  return (
    <section className="container 2xl:px-20 mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <div>
          <p className="text-sm uppercase tracking-widest text-blue-600 font-semibold mb-4">
            Find your next opportunity
          </p>

          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight">
            Discover jobs that match your skills and ambition
          </h1>

          <p className="mt-5 text-gray-600 max-w-lg">
            Explore verified opportunities from growing companies and connect
            with teams looking for talent like yours.
          </p>

          {/* Search Box */}
          <div className="mt-8 bg-white border border-gray-200 shadow-lg rounded-2xl p-3 flex flex-col md:flex-row items-stretch gap-3">

            {/* Job Title */}
            <input
              ref={titleRef}
              type="text"
              placeholder="Job title or keyword"
              className="w-full md:flex-1 px-4 py-3 outline-none"
            />

            {/* Divider (mobile + desktop smart line) */}
            <div className="flex justify-center items-center md:items-stretch">
              <div className="w-4/5 md:w-px h-px md:h-auto bg-gray-200 opacity-70"></div>
            </div>

            {/* Location */}
            <input
              ref={locationRef}
              type="text"
              placeholder="Location"
              className="w-full md:flex-1 px-4 py-3 outline-none"
            />

            {/* Button */}
            <button
              onClick={onSearch}
              className="w-full md:w-auto bg-gray-900 text-white px-8 py-3 rounded-xl hover:opacity-90 transition shrink-0"
            >
              Search
            </button>

          </div>

          {/* Quick stats */}
            <div className="flex gap-8 mt-8 justify-center sm:justify-start text-center sm:text-left">

            <div>
                <h3 className="text-2xl font-semibold text-gray-900">10k+</h3>
                <p className="text-sm text-gray-500">Open roles</p>
            </div>

            <div>
                <h3 className="text-2xl font-semibold text-gray-900">2k+</h3>
                <p className="text-sm text-gray-500">Companies</p>
            </div>

            <div>
                <h3 className="text-2xl font-semibold text-gray-900">98%</h3>
                <p className="text-sm text-gray-500">Verified listings</p>
            </div>

            </div>
        </div>

        {/* Right Side Image */}
        <div className="hidden lg:flex justify-center items-center">
            <img
                src={assets.hero_img}
                alt="Hero"
                className="w-full max-w-2xl xl:max-w-3xl object-contain"
            />
        </div>
      </div>

      {/* Company logos */}
        <div className="mt-14 border-t border-gray-200 pt-8 text-center">
        <p className="text-sm text-gray-500 mb-6">
            Trusted by teams at
        </p>

        <div className="flex flex-wrap justify-center gap-10 items-center">
            <img className="h-6" src={assets.microsoft_logo} alt="" />
            <img className="h-6" src={assets.walmart_logo} alt="" />
            <img className="h-6" src={assets.adobe_logo} alt="" />
            <img className="h-6" src={assets.accenture_logo} alt="" />
            <img className="h-6" src={assets.samsung_logo} alt="" />
            <img className="h-6" src={assets.amazon_logo} alt="" />
        </div>
        </div>
    </section>
  );
};

export default Hero;