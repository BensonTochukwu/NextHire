import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Loading from "../components/Loading";
import NavBar from "../components/Navbar";
import { assets } from "../assets/assets";
import kconvert from "k-convert";
import moment from "moment";
import JobCard from "../components/JobCard";
import Footer from "../components/Footer";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/clerk-react";

const ApplyJob = () => {
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const { id } = useParams();

  const [jobData, setJobData] = useState(null);
  const [isAlreadyApplied, setIsAlreadyApplied] = useState(false);

  const {
    jobs,
    backendUrl,
    userData,
    userApplications,
    fetchUserApplications,
  } = useContext(AppContext);

  const fetchJob = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + `/api/jobs/${id}`
      );

      if (data.success) {
        setJobData(data.job);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const applyHandler = async () => {
    try {
      if (!userData) {
        return toast.error("Login to apply jobs");
      }

      if (!userData.resume) {
        navigate("/applications");
        return toast.error("Upload resume to apply");
      }

      const token = await getToken();

      const { data } = await axios.post(
        backendUrl + "/api/user/apply",
        { jobId: jobData._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        fetchUserApplications();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const checkAlreadyApplied = () => {
    const hasApplied = userApplications.some(
      (item) => item?.jobId?._id === jobData._id
    );
    setIsAlreadyApplied(hasApplied);
  };

  useEffect(() => {
    fetchJob();
  }, [id]);

  useEffect(() => {
    if (userApplications.length > 0 && jobData) {
      checkAlreadyApplied();
    }
  }, [jobData, userApplications, id]);

  return jobData ? (
    <>
      <NavBar />

      {/* PAGE WRAPPER */}
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          {/* MAIN CARD */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between gap-8 px-6 sm:px-10 py-10 bg-gray-50">

              {/* LEFT HEADER */}
              <div className="flex flex-col md:flex-row items-center gap-4">

                <img
                  className="h-20 w-20 bg-white p-3 rounded-xl border"
                  src={jobData.company_id.image}
                  alt=""
                />

                <div className="text-center md:text-left">
                  <h1 className="text-2xl sm:text-4xl font-semibold">
                    {jobData.title}
                  </h1>

                  <div className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-600 mt-3 text-sm">

                    <span className="flex items-center gap-1">
                      <img src={assets.suitcase_icon} alt="" />
                      {jobData.company_id.name}
                    </span>

                    <span className="flex items-center gap-1">
                      <img src={assets.location_icon} alt="" />
                      {jobData.location}
                    </span>

                    <span className="flex items-center gap-1">
                      <img src={assets.person_icon} alt="" />
                      {jobData.level}
                    </span>

                    <span className="flex items-center gap-1">
                      <img src={assets.money_icon} alt="" />
                      CTC : {kconvert.convertTo(jobData.salary)}
                    </span>

                  </div>
                </div>
              </div>

              {/* APPLY BUTTON */}
              <div className="flex flex-col items-center md:items-end text-center md:text-right text-sm">

                <button
                  onClick={applyHandler}
                  className="bg-gray-900 px-10 py-2.5 text-white rounded-lg hover:bg-black transition"
                >
                  {isAlreadyApplied ? "Already Applied" : "Apply Now"}
                </button>

                <p className="text-gray-600 mt-2">
                  Posted {moment(jobData.date).fromNow()}
                </p>

              </div>
            </div>

            {/* BODY */}
            <div className="px-6 sm:px-10 py-10">

              <h2 className="font-semibold text-2xl mb-4">
                Job Description
              </h2>

              <div
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: jobData.description,
                }}
              />

              <button
                onClick={applyHandler}
                className="bg-gray-900 px-10 py-2.5 text-white rounded-lg mt-10 hover:bg-black transition"
              >
                {isAlreadyApplied ? "Already Applied" : "Apply Now"}
              </button>

            </div>
          </div>

          {/* MORE JOBS SECTION (NOW BELOW MAIN CARD) */}
          <div className="mt-10">

            <h2 className="font-semibold text-xl text-gray-800 mb-5">
              More jobs from {jobData.company_id.name}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

              {jobs
                .filter(
                  (job) =>
                    job._id !== jobData._id &&
                    job.company_id._id === jobData.company_id._id
                )
                .filter((job) => {
                  const appliedJobId = new Set(
                    userApplications.map(
                      (app) => app.jobId && app.jobId._id
                    )
                  );
                  return !appliedJobId.has(job._id);
                })
                .slice(0, 3)
                .map((job, index) => (
                  <JobCard key={index} job={job} />
                ))}

            </div>

          </div>

        </div>
      </div>

      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default ApplyJob;