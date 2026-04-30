import React from "react";
import { assets } from "../assets/assets";

const AppDownload = () => {
  return (
    <div className="container px-4 2xl:px-20 mx-auto my-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden">

        {/* LEFT */}
        <div className="p-8 sm:p-10 lg:p-12">

          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
            Apply faster, track jobs anywhere
          </h1>

          <p className="text-gray-600 text-sm mb-5 max-w-md">
            Get job alerts, apply quickly, and track applications directly from your phone.
          </p>

          <div className="space-y-1 text-sm text-gray-600 mb-5">
            <p>✔ Real-time alerts</p>
            <p>✔ One-tap applications</p>
            <p>✔ Application tracking</p>
          </div>

          {/* TRUST (compact) */}
          <div className="flex gap-6 text-sm text-gray-500 mb-5">
            <div>
              <p className="font-semibold text-gray-900">10k+</p>
              <p>Users</p>
            </div>

            <div>
              <p className="font-semibold text-gray-900">4.8★</p>
              <p>Rating</p>
            </div>
          </div>

          {/* STORES */}
          <div className="flex gap-3">
            <a href="#">
              <img className="h-10" src={assets.play_store} alt="" />
            </a>

            <a href="#">
              <img className="h-10" src={assets.app_store} alt="" />
            </a>
          </div>

        </div>

        {/* RIGHT */}
        <div className="flex justify-center lg:justify-center bg-gray-100 p-6 lg:p-10">
          
          <div className="relative w-[240px] sm:w-[200px] lg:w-[220px] h-[440px] bg-black rounded-[2.5rem] border border-gray-800 shadow-lg">
            
            <div className="absolute top-4 left-3 right-3 bottom-4 bg-white rounded-[2rem] overflow-hidden">

              <img
                src={assets.app_main_img}
                className="w-full h-full object-contain bg-white p-1"
                alt=""
              />

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AppDownload;