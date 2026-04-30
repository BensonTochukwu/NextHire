import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="container px-4 2xl:px-20 mx-auto mt-20 py-6 border-t border-gray-100">

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

        {/* Logo */}
        <img
          onClick={() => navigate("/")}
          className="cursor-pointer"
          width={150}
          src={assets.logo}
          alt=""
        />

        {/* Copyright */}
        <p className="text-sm text-gray-500 text-center sm:text-left">
          © {new Date().getFullYear()} InsiderJobs. All rights reserved.
        </p>

        <div className="w-full sm:w-auto flex justify-center sm:justify-end mt-3 sm:mt-0">
          <a
            href="https://bensons-portfolio.vercel.app/"
            target="_blank"
            className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1 transition"
          >
            Developed by <span className="font-medium">Benson</span>
            <span className="text-gray-400">{`</>`}</span>
          </a>
        </div>

        {/* Socials */}
        <div className="flex gap-3">
          <a href="" target="_blank">
            <img className="w-9 h-9 opacity-80 hover:opacity-100 transition" src={assets.facebook_icon} alt="" />
          </a>

          <a href="https://www.instagram.com/its.teco_/" target="_blank">
            <img className="w-9 h-9 opacity-80 hover:opacity-100 transition" src={assets.instagram_icon} alt="" />
          </a>

          <a href="" target="_blank">
            <img className="w-9 h-9 opacity-80 hover:opacity-100 transition" src={assets.twitter_icon} alt="" />
          </a>
        </div>

      </div>

    </div>
  );
};

export default Footer;