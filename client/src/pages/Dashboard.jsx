import React, { useEffect, useContext, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Dashboard = () => {
  const navigate = useNavigate();

  const { companyData, setCompanyData, setCompanyToken } =
    useContext(AppContext);

  const [showMenu, setShowMenu] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const logout = () => {
    setCompanyToken(null);
    localStorage.removeItem("companyToken");
    setCompanyData(null);
    navigate("/");
  };

  useEffect(() => {
    if (companyData) {
      navigate("/dashboard/manage-jobs");
    }
  }, [companyData]);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ================= TOP BAR ================= */}
      <div className="border-b bg-white">
        <div className="px-5 flex items-center justify-between py-4">

          {/* LEFT (mobile only) */}
          <div className="flex items-center gap-3">

            {/* Hamburger (mobile only) */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-2xl text-gray-700"
            >
              ☰
            </button>

            {/* LOGO (ALL DEVICES NOW) */}
            <img
              onClick={() => navigate("/dashboard/manage-jobs")}
              className="w-32 cursor-pointer"
              src={assets.logo}
              alt=""
            />

          </div>

          {/* RIGHT SIDE */}
          {companyData && (
            <div className="flex items-center gap-4 ml-auto">
              <div className="relative">
                <img
                  onClick={() => setShowMenu(!showMenu)}
                  className="w-9 h-9 object-cover border rounded-full cursor-pointer"
                  src={companyData.image}
                  alt=""
                />

                {showMenu && (
                  <div className="absolute right-0 mt-2 z-20">
                    <ul className="bg-white rounded-xl border shadow-md text-sm min-w-[140px] overflow-hidden">
                      <li
                        onClick={logout}
                        className="py-2 px-3 cursor-pointer hover:bg-gray-50"
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
              </div>

            </div>
          )}
        </div>
      </div>

      <div className="flex">

        {/* ================= DESKTOP SIDEBAR ================= */}
        <aside className="hidden lg:flex flex-col w-56 bg-white border-r min-h-screen">
          <ul className="flex flex-col text-gray-700 pt-4">

            <NavLink
              to={"/dashboard/add-job"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-3 ${
                  isActive ? "bg-gray-100 border-r-4 border-black" : ""
                }`
              }
            >
              <img className="w-5" src={assets.add_icon} alt="" />
              <p className="text-sm">Add Job</p>
            </NavLink>

            <NavLink
              to={"/dashboard/manage-jobs"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-3 ${
                  isActive ? "bg-gray-100 border-r-4 border-black" : ""
                }`
              }
            >
              <img className="w-5" src={assets.home_icon} alt="" />
              <p className="text-sm">Manage Jobs</p>
            </NavLink>

            <NavLink
              to={"/dashboard/view-applications"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-3 ${
                  isActive ? "bg-gray-100 border-r-4 border-black" : ""
                }`
              }
            >
              <img className="w-5" src={assets.person_tick_icon} alt="" />
              <p className="text-sm">Applications</p>
            </NavLink>

          </ul>
        </aside>

        {/* ================= MOBILE DRAWER ================= */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          />
        )}

        <div
          className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-xl transition-transform duration-300 lg:hidden ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-4 py-4 border-b">
            <img src={assets.logo} className="w-36" alt="" />
            <button onClick={() => setSidebarOpen(false)} className="text-xl">
              ✕
            </button>
          </div>

          <ul className="flex flex-col pt-4 text-gray-700">

            <NavLink
              to={"/dashboard/add-job"}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50"
            >
              <img className="w-5" src={assets.add_icon} alt="" />
              <p className="text-sm">Add Job</p>
            </NavLink>

            <NavLink
              to={"/dashboard/manage-jobs"}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50"
            >
              <img className="w-5" src={assets.home_icon} alt="" />
              <p className="text-sm">Manage Jobs</p>
            </NavLink>

            <NavLink
              to={"/dashboard/view-applications"}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50"
            >
              <img className="w-5" src={assets.person_tick_icon} alt="" />
              <p className="text-sm">Applications</p>
            </NavLink>

          </ul>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="flex-1 p-4 sm:p-6">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;