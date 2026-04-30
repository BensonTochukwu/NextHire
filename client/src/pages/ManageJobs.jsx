import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

const ManageJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState(false);

  const { backendUrl, companyToken } = useContext(AppContext);

  const fetchCompanyJobs = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/company/list-jobs",
        { headers: { token: companyToken } }
      );

      if (data.success) {
        setJobs(data.jobsData.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeJobVisibility = async (id) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/company/change-visibility",
        { id },
        { headers: { token: companyToken } }
      );

      if (data.success) {
        toast.success(data.message);
        fetchCompanyJobs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (companyToken) fetchCompanyJobs();
  }, [companyToken]);

  if (!jobs) return <Loading />;

  if (jobs.length === 0) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <p className="text-xl sm:text-2xl text-gray-600">
          No jobs posted yet.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Manage Jobs
        </h2>

        <button
          onClick={() => navigate("/dashboard/add-job")}
          className="bg-black text-white px-4 py-2 rounded-xl hover:opacity-90 transition"
        >
          Add Job
        </button>
      </div>

      {/* CARD WRAPPER */}
      <div className="bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden">

        {/* TABLE */}
        <div className="overflow-x-auto">

          <table className="min-w-full text-sm">

            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left max-sm:hidden">#</th>
                <th className="px-4 py-3 text-left">Job Title</th>
                <th className="px-4 py-3 text-left max-sm:hidden">Date</th>
                <th className="px-4 py-3 text-left max-sm:hidden">Location</th>
                <th className="px-4 py-3 text-center">Applicants</th>
                <th className="px-4 py-3 text-left">Visible</th>
              </tr>
            </thead>

            <tbody>
              {jobs.map((job, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 max-sm:hidden text-gray-500">
                    {index + 1}
                  </td>

                  <td className="px-4 py-3 font-medium text-gray-800">
                    {job.title}
                  </td>

                  <td className="px-4 py-3 max-sm:hidden text-gray-500">
                    {moment(job.date).format("ll")}
                  </td>

                  <td className="px-4 py-3 max-sm:hidden text-gray-500">
                    {job.location}
                  </td>

                  <td className="px-4 py-3 text-center text-gray-700">
                    {job.applicants}
                  </td>

                  <td className="px-4 py-3">
                    <input
                      onChange={() => changeJobVisibility(job._id)}
                      className="scale-125 cursor-pointer accent-black"
                      type="checkbox"
                      checked={job.visible}
                    />
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
};

export default ManageJobs;