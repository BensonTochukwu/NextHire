import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { Menu, X } from "lucide-react";

const NavBar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();
  const { setShowRecruiterLogin } = useContext(AppContext);

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="container px-4 2xl:px-20 mx-auto flex items-center justify-between h-20">
        {/* Logo */}
        <img
          onClick={() => navigate("/")}
          className="cursor-pointer h-10"
          src={assets.logo}
          alt="Logo"
        />

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {user ? (
            <>
              <Link
                to="/applications"
                className="text-sm text-gray-700 hover:text-blue-600 transition"
              >
                Applied Jobs
              </Link>

              <span className="h-5 w-px bg-gray-300"></span>

              <p className="text-sm text-gray-700">
                Hi, {user.firstName} {user.lastName}
              </p>

              <UserButton />
            </>
          ) : (
            <>
              <button
                onClick={() => setShowRecruiterLogin(true)}
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Employer Login
              </button>

              <span className="h-5 w-px bg-gray-300"></span>

              <button
                onClick={() => openSignIn()}
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Login
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 bg-white border-t border-gray-100">
          {user ? (
            <div className="flex flex-col gap-4 pt-4">
              <Link
                to="/applications"
                onClick={() => setMenuOpen(false)}
                className="text-gray-700"
              >
                Applied Jobs
              </Link>

              <p className="text-sm text-gray-600">
                Hi, {user.firstName} {user.lastName}
              </p>

              <UserButton />
            </div>
          ) : (
            <div className="flex flex-col gap-3 pt-4">
              <button
                onClick={() => {
                  setShowRecruiterLogin(true);
                  setMenuOpen(false);
                }}
                className="text-left text-gray-700 hover:text-blue-600"
              >
                Employer Login
              </button>

              <button
                onClick={() => {
                  openSignIn();
                  setMenuOpen(false);
                }}
                className="text-left text-gray-700 hover:text-blue-600"
              >
                Login
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;