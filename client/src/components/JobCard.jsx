import React from "react";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between">

      {/* Top section */}
      <div>
        <div className="flex items-center justify-between">
          <img
            className="h-9 w-auto object-contain"
            src={job.company_id.image}
            alt="company logo"
          />
        </div>

        {/* Title */}
        <h3 className="font-semibold text-lg mt-4 text-gray-900 leading-snug">
          {job.title}
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 mt-3 text-xs">
          <span className="bg-blue-50 text-blue-600 border border-blue-100 rounded-full px-3 py-1">
            {job.location}
          </span>

          <span className="bg-gray-50 text-gray-600 border border-gray-200 rounded-full px-3 py-1">
            {job.level}
          </span>
        </div>

        {/* Description */}
        <p
          className="text-gray-500 text-sm mt-4 leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: job.description.slice(0, 140),
          }}
        />
      </div>

      {/* Bottom actions */}
      <div className="mt-6 flex gap-3">
        <button
          onClick={() => {
            navigate(`/apply-job/${job._id}`);
            scrollTo(0, 0);
          }}
          className="flex-1 bg-gray-900 text-white rounded-xl py-2.5 text-sm hover:opacity-90 transition"
        >
          Apply Now
        </button>

        <button
          onClick={() => {
            navigate(`/apply-job/${job._id}`);
            scrollTo(0, 0);
          }}
          className="flex-1 border border-gray-200 text-gray-700 rounded-xl py-2.5 text-sm hover:bg-gray-50 transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default JobCard;