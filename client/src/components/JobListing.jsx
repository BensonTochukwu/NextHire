import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets, JobCategories, JobLocations } from "../assets/assets";
import JobCard from "./JobCard";
import JobCardSkeleton from "./JobCardSkeleton";

const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter, jobs, isLoading } =
    useContext(AppContext);

  const [showFilter, setShowFilter] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocation, setSelectedLocations] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleLocationChange = (location) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((c) => c !== location)
        : [...prev, location]
    );
  };

  useEffect(() => {
    const matchesCategory = (job) =>
      selectedCategories.length === 0 ||
      selectedCategories.includes(job.category);

    const matchesLocation = (job) =>
      selectedLocation.length === 0 ||
      selectedLocation.includes(job.location);

    const matchesTitle = (job) =>
      searchFilter.title === "" ||
      job.title.toLowerCase().includes(searchFilter.title.toLowerCase());

    const matchesSearchLocation = (job) =>
      searchFilter.location === "" ||
      job.location
        .toLowerCase()
        .includes(searchFilter.location.toLowerCase());

    const newFilteredJobs = jobs
      .slice()
      .reverse()
      .filter(
        (job) =>
          matchesCategory(job) &&
          matchesLocation(job) &&
          matchesSearchLocation(job) &&
          matchesTitle(job)
      );

    setFilteredJobs(newFilteredJobs);
    setCurrentPage(1);
  }, [jobs, searchFilter, selectedCategories, selectedLocation]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8 py-10">
      {/* FILTER SIDEBAR */}
        <aside className="w-full lg:w-1/4">
            <div className="lg:sticky lg:top-6 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">

                {/* Active filters */}
                {isSearched &&
                (searchFilter.title !== "" || searchFilter.location !== "") && (
                    <div className="mb-6">
                    <h3 className="font-semibold text-lg mb-3 text-gray-800">
                        Active Filters
                    </h3>

                    <div className="flex flex-wrap gap-2 text-gray-600">
                        {searchFilter.title && (
                        <span className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-3 py-1 text-sm">
                            {searchFilter.title}
                            <img
                            onClick={() =>
                                setSearchFilter((prev) => ({
                                ...prev,
                                title: "",
                                }))
                            }
                            className="cursor-pointer w-3"
                            src={assets.cross_icon}
                            alt=""
                            />
                        </span>
                        )}

                        {searchFilter.location && (
                        <span className="inline-flex items-center gap-2 bg-red-50 border border-red-100 rounded-full px-3 py-1 text-sm">
                            {searchFilter.location}
                            <img
                            onClick={() =>
                                setSearchFilter((prev) => ({
                                ...prev,
                                location: "",
                                }))
                            }
                            className="cursor-pointer w-3"
                            src={assets.cross_icon}
                            alt=""
                            />
                        </span>
                        )}
                    </div>
                    </div>
                )}

                {/* Mobile toggle */}
                <button
                onClick={() => setShowFilter((prev) => !prev)}
                className="lg:hidden w-full mb-4 px-4 py-2 border border-gray-200 rounded-xl text-sm hover:bg-gray-50 transition"
                >
                {showFilter ? "Hide Filters" : "Show Filters"}
                </button>

                {/* Categories */}
                <div className={showFilter ? "" : "max-lg:hidden"}>
                <h4 className="font-semibold text-gray-900 mb-4">
                    Categories
                </h4>

                <ul className="space-y-3 text-gray-600">
                    {JobCategories.map((category, index) => (
                    <li
                        className="flex gap-2 items-center text-sm"
                        key={index}
                    >
                        <input
                        className="scale-110 cursor-pointer accent-blue-600"
                        type="checkbox"
                        onChange={() => handleCategoryChange(category)}
                        checked={selectedCategories.includes(category)}
                        />
                        {category}
                    </li>
                    ))}
                </ul>
                </div>

                {/* Locations */}
                <div className={showFilter ? "" : "max-lg:hidden"}>
                <h4 className="font-semibold text-gray-900 mb-4 pt-8">
                    Locations
                </h4>

                <ul className="space-y-3 text-gray-600">
                    {JobLocations.map((location, index) => (
                    <li
                        className="flex gap-2 items-center text-sm"
                        key={index}
                    >
                        <input
                        className="scale-110 cursor-pointer accent-blue-600"
                        type="checkbox"
                        onChange={() => handleLocationChange(location)}
                        checked={selectedLocation.includes(location)}
                        />
                        {location}
                    </li>
                    ))}
                </ul>
                </div>
            </div>
        </aside>

      {/* JOB LIST */}
      <section 
      id="job-listing"
      className="w-full lg:w-3/4 text-gray-800">
        <div className="mb-6 text-center lg:text-left">
            <h3 className="font-semibold text-3xl">
                Latest Opportunities
            </h3>

            <p className="text-gray-500 mt-1 max-w-md mx-auto lg:mx-0">
                Discover roles from companies hiring now.
            </p>
        </div>

        {isLoading ? (
          // ── SKELETON STATE ──────────────────────────────
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <JobCardSkeleton key={i} />
            ))}
          </div>

        ) : filteredJobs.length > 0 ? (
          // ── RESULTS STATE ───────────────────────────────
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredJobs
              .slice((currentPage - 1) * 6, currentPage * 6)
              .map((job, index) => (
                <JobCard key={index} job={job} />
              ))}
          </div>

        ) : (
          // ── EMPTY STATE (only after load completes) ─────
          <div className="flex flex-col items-center justify-center text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800">No jobs found</h3>
            <p className="text-gray-500 mt-2 max-w-md">
              Try changing your filters or search keywords.
            </p>
            <button
              onClick={() => {
                setSearchFilter({ title: "", location: "" });
                setSelectedCategories([]);
                setSelectedLocations([]);
              }}
              className="mt-6 px-6 py-2 bg-gray-900 text-white rounded-xl hover:opacity-90 transition"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* PAGINATION */}
        {filteredJobs.length > 0 && (
          <div className="flex items-center justify-center mt-12 gap-2">
            <a href="#job-list">
              <img
                onClick={() =>
                  setCurrentPage(Math.max(currentPage - 1, 1))
                }
                src={assets.left_arrow_icon}
                alt=""
                className="cursor-pointer"
              />
            </a>

            {Array.from({
              length: Math.ceil(filteredJobs.length / 6),
            }).map((_, index) => (
              <a key={index} href="#job-list">
                <button
                  onClick={() => setCurrentPage(index + 1)}
                  className={`h-10 w-10 flex items-center justify-center border cursor-pointer rounded-lg text-sm transition ${
                    currentPage === index + 1
                      ? "bg-blue-100 text-blue-600 border-blue-200"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {index + 1}
                </button>
              </a>
            ))}

            <a href="#job-list">
              <img
                onClick={() =>
                  setCurrentPage(
                    Math.min(
                      currentPage + 1,
                      Math.ceil(filteredJobs.length / 6)
                    )
                  )
                }
                src={assets.right_arrow_icon}
                alt=""
                className="cursor-pointer"
              />
            </a>
          </div>
        )}
      </section>
    </div>
  );
};

export default JobListing;