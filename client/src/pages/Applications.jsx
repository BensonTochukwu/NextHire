import React, { useContext, useState, useEffect } from "react";
import NavBar from "../components/Navbar";
import { assets } from "../assets/assets";
import moment from "moment";
import Footer from "../components/Footer";
import { AppContext } from "../context/AppContext";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";

const Applications = () => {
  const { user } = useUser();
  const { getToken } = useAuth();

  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);

  const {
    backendUrl,
    userData,
    userApplications,
    fetchUserData,
    fetchUserApplications,
  } = useContext(AppContext);

  const updateResume = async () => {
    try {
      const formData = new FormData();
      formData.append("resume", resume);

      const token = await getToken();

      const { data } = await axios.post(
        backendUrl + "/api/user/update-resume",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        await fetchUserData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

    setIsEdit(false);
    setResume(null);
  };

  useEffect(() => {
    if (user) {
      fetchUserApplications();
    }
  }, [user]);

  return (
    <>
      <NavBar />

      <div className="container px-4 2xl:px-20 mx-auto my-10 min-h-[70vh]">
        {/* Resume Section */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">Your Resume</h2>
          <p className="text-sm text-gray-500 mt-1">
            Upload your latest resume to apply faster.
          </p>

          <div className="flex flex-wrap gap-3 mt-5">
            {isEdit || (userData && userData.resume === "") ? (
              <>
                <label
                  htmlFor="resumeUpload"
                  className="flex items-center gap-3 cursor-pointer border border-gray-200 rounded-xl px-4 py-3 hover:bg-gray-50 transition"
                >
                  <img
                    src={assets.profile_upload_icon}
                    alt=""
                    className="w-5"
                  />
                  <span className="text-sm text-gray-700">
                    {resume ? resume.name : "Select Resume"}
                  </span>
                  <input
                    id="resumeUpload"
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={(e) => setResume(e.target.files[0])}
                  />
                </label>

                <button
                  onClick={updateResume}
                  className="bg-black text-white px-5 py-3 rounded-xl hover:opacity-90 transition"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <a
                  href={userData?.resume || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-black text-white px-5 py-3 rounded-xl hover:opacity-90 transition"
                >
                  View Resume
                </a>

                <button
                  onClick={() => setIsEdit(true)}
                  className="border border-gray-300 px-5 py-3 rounded-xl hover:bg-gray-50 transition"
                >
                  Edit
                </button>
              </>
            )}
          </div>
        </div>

        {/* Applications */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Job Applications
          </h2>

          {userApplications.length === 0 ? (
            <div className="text-center py-16 border border-gray-100 rounded-2xl bg-white">
              <div className="text-5xl mb-4">📄</div>
              <h3 className="text-lg font-medium text-gray-800">
                No applications yet
              </h3>
              <p className="text-gray-500 mt-2">
                Jobs you apply for will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto bg-white border border-gray-100 rounded-2xl shadow-sm">
              <table className="min-w-full">
                <thead className="border-b bg-gray-50">
                  <tr>
                    <th className="py-4 px-4 text-left text-sm font-medium text-gray-600">
                      Company
                    </th>
                    <th className="py-4 px-4 text-left text-sm font-medium text-gray-600">
                      Job Title
                    </th>
                    <th className="py-4 px-4 text-left text-sm font-medium text-gray-600 max-sm:hidden">
                      Location
                    </th>
                    <th className="py-4 px-4 text-left text-sm font-medium text-gray-600 max-sm:hidden">
                      Date
                    </th>
                    <th className="py-4 px-4 text-left text-sm font-medium text-gray-600">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {userApplications.map((job, index) =>
                    job?.jobId && job?.companyId ? (
                      <tr
                        key={index}
                        className="border-b last:border-none hover:bg-gray-50 transition"
                      >
                        <td className="py-4 px-4 flex items-center gap-3">
                          <img
                            className="w-10 h-10 rounded-lg object-cover border"
                            src={job.companyId.image}
                            alt=""
                          />
                          <span className="font-medium">
                            {job.companyId.name}
                          </span>
                        </td>

                        <td className="py-4 px-4">{job.jobId.title}</td>

                        <td className="py-4 px-4 max-sm:hidden">
                          {job.jobId.location}
                        </td>

                        <td className="py-4 px-4 max-sm:hidden">
                          {moment(job.date).format("ll")}
                        </td>

                        <td className="py-4 px-4">
                          <span
                            className={`px-4 py-1.5 rounded-full text-sm ${
                              job.status === "Accepted"
                                ? "bg-green-100 text-green-700"
                                : job.status === "Rejected"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {job.status}
                          </span>
                        </td>
                      </tr>
                    ) : null
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Applications;