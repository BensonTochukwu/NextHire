import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RecruiterLogin = () => {
  const navigate = useNavigate();

  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(false);
  const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false);

  const { setShowRecruiterLogin, backendUrl, setCompanyToken, setCompanyData } =
    useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (state === "Sign Up" && !isTextDataSubmitted) {
      return setIsTextDataSubmitted(true);
    }

    try {
      if (state === "Login") {
        const { data } = await axios.post(backendUrl + "/api/company/login", {
          email,
          password,
        });

        if (data.success) {
          setCompanyData(data.company);
          setCompanyToken(data.token);
          localStorage.setItem("companyToken", data.token);
          setShowRecruiterLogin(false);
          navigate("/dashboard");
        } else {
          toast.error(data.message);
        }
      } else {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("password", password);
        formData.append("email", email);
        formData.append("image", image);

        const { data } = await axios.post(
          backendUrl + "/api/company/register",
          formData
        );

        if (data.success) {
          setCompanyData(data.company);
          setCompanyToken(data.token);
          localStorage.setItem("companyToken", data.token);
          setShowRecruiterLogin(false);
          navigate("/dashboard");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="absolute inset-0 z-10 backdrop-blur-md bg-black/50 flex justify-center items-center px-4">

      <form
        onSubmit={onSubmitHandler}
        className="relative w-full max-w-md bg-white p-8 sm:p-10 rounded-2xl shadow-2xl border border-gray-200 text-gray-700"
      >

        {/* CLOSE BUTTON */}
        <img
          onClick={() => setShowRecruiterLogin(false)}
          className="absolute top-5 right-5 cursor-pointer w-4 opacity-60 hover:opacity-100 transition"
          src={assets.cross_icon}
          alt=""
        />

        {/* HEADER */}
        <h1 className="text-center text-2xl text-gray-900 font-semibold">
          Employer {state}
        </h1>

        <p className="text-sm text-center text-gray-500 mt-1">
          Welcome back! Please {state.toLowerCase()} to continue
        </p>

        {/* SIGNUP STEP 2 (LOGO UPLOAD) */}
        {state === "Sign Up" && isTextDataSubmitted ? (
          <div className="flex flex-col items-center my-8">

            <label htmlFor="image" className="cursor-pointer text-center">

              <img
                className="w-20 h-20 rounded-full mx-auto object-cover border border-gray-200"
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt=""
              />

              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                className="hidden"
              />

              <p className="text-sm text-gray-500 mt-3">
                Upload company logo
              </p>

            </label>
          </div>
        ) : (
          <>
            {/* NAME */}
            {state !== "Login" && (
              <div className="border border-gray-200 px-4 py-2 flex items-center gap-2 rounded-xl mt-6 focus-within:border-black transition">
                <img src={assets.person_icon} alt="" />
                <input
                  className="outline-none text-sm w-full bg-transparent text-gray-800 placeholder:text-gray-400"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  placeholder="Company Name"
                  required
                />
              </div>
            )}

            {/* EMAIL */}
            <div className="border border-gray-200 px-4 py-2 flex items-center gap-2 rounded-xl mt-4 focus-within:border-black transition">
              <img src={assets.email_icon} alt="" />
              <input
                className="outline-none text-sm w-full bg-transparent text-gray-800 placeholder:text-gray-400"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Company Email"
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="border border-gray-200 px-4 py-2 flex items-center gap-2 rounded-xl mt-4 focus-within:border-black transition">
              <img src={assets.lock_icon} alt="" />
              <input
                className="outline-none text-sm w-full bg-transparent text-gray-800 placeholder:text-gray-400"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Password"
                required
              />
            </div>
          </>
        )}

        {/* BUTTON (BLACK PRIMARY) */}
        <button
          type="submit"
          className="bg-black hover:bg-gray-900 transition w-full text-white py-2.5 rounded-xl mt-6"
        >
          {state === "Login"
            ? "Login"
            : isTextDataSubmitted
            ? "Create Account"
            : "Next"}
        </button>

        {/* SWITCH */}
        {state === "Login" ? (
          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <span
              className="text-black cursor-pointer font-medium"
              onClick={() => setState("Sign Up")}
            >
              Sign up
            </span>
          </p>
        ) : (
          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <span
              className="text-black cursor-pointer font-medium"
              onClick={() => setState("Login")}
            >
              Log in
            </span>
          </p>
        )}

      </form>
    </div>
  );
};

export default RecruiterLogin;
