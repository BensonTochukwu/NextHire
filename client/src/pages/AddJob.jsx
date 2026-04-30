import Quill from "quill";
import React, { useContext, useEffect, useRef, useState } from "react";
import { JobCategories, JobLocations } from "../assets/assets";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const AddJob = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState(JobLocations[0]);
  const [level, setLevel] = useState("Beginner Level");
  const [category, setCategory] = useState("Programming");
  const [salary, setSalary] = useState("");

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const { backendUrl, companyToken } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const description = quillRef.current.root.innerHTML;

      const { data } = await axios.post(
        backendUrl + "/api/company/post-job",
        {
          title,
          description,
          location,
          salary: Number(salary),
          category,
          level,
        },
        { headers: { token: companyToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setTitle("");
        setSalary("");
        quillRef.current.root.innerHTML = "";
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  return (
    <div className="p-1 sm:p-6">
      <form
        onSubmit={onSubmitHandler}
        className="max-w-5xl w-full mx-auto bg-white border border-gray-100 shadow-sm rounded-2xl p-3 sm:p-8 flex flex-col gap-6"
      >
        {/* TITLE */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Job Title</p>
          <input
            type="text"
            placeholder="e.g. Frontend Developer"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-black transition"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            Job Description
          </p>

          <div className="border border-gray-200 rounded-xl">
            <div
              ref={editorRef}
              className="min-h-[180px]"
              style={{ cursor: "text" }}
            />
          </div>
        </div>

        {/* GRID OPTIONS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* CATEGORY */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Category</p>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-base outline-none"
            >
              {JobCategories.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* LOCATION */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Location</p>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-base outline-none"
            >
              {JobLocations.map((loc, i) => (
                <option key={i} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* LEVEL */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Level</p>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-base outline-none"
            >
              <option value="Beginner Level">Beginner</option>
              <option value="Intermediate Level">Intermediate</option>
              <option value="Senior Level">Senior</option>
            </select>
          </div>
        </div>

        {/* SALARY */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Salary</p>
          <input
            type="number"
            min={0}
            placeholder="e.g. 15000"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-black transition"
          />
        </div>

        {/* SUBMIT */}
        <button className="bg-black text-white py-3 rounded-xl hover:opacity-90 transition font-medium">
          Add Job
        </button>
      </form>
    </div>
  );
};

export default AddJob;