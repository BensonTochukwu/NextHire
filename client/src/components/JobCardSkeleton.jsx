const JobCardSkeleton = () => (
  <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col justify-between animate-pulse">

    {/* Top section */}
    <div>
      {/* Company logo */}
      <div className="flex items-center justify-between">
        <div className="h-9 w-24 bg-gray-200 rounded-md" />
      </div>

      {/* Title */}
      <div className="h-5 bg-gray-200 rounded-md mt-4 w-3/4" />

      {/* Tags */}
      <div className="flex flex-wrap items-center gap-2 mt-3">
        <div className="h-6 bg-gray-200 rounded-full w-20" />
        <div className="h-6 bg-gray-200 rounded-full w-16" />
      </div>

      {/* Description lines */}
      <div className="mt-4 space-y-2">
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-2/3" />
      </div>
    </div>

    {/* Bottom actions */}
    <div className="mt-6 flex gap-3">
      <div className="flex-1 h-10 bg-gray-200 rounded-xl" />
      <div className="flex-1 h-10 bg-gray-200 rounded-xl" />
    </div>
  </div>
);

export default JobCardSkeleton;