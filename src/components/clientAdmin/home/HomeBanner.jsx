import React from "react";

export default function HomeBanner({ userName = "Abhishek Chandran", onScrollToRecent }) {
  // Format current date matching "Tuesday, 10 November"
  const todayFormatted = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());

  return (
    <div className="bg-gradient-to-r from-[#EEF3FF] via-[#F1F5FF] to-[#F8FAFF] rounded-2xl border border-[#DDE7FF] px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
      <div>
        <p className="text-xs font-medium text-[#64748B] mb-1">
          {todayFormatted}
        </p>
        <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
          Welcome back, {userName}
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B] mt-1">
          Here is a snapshot of your workspace today.
        </p>
      </div>

      <button
        onClick={onScrollToRecent}
        className="self-start sm:self-center px-5 py-2.5 bg-[#3B52E2] hover:bg-[#3044C7] active:scale-[0.98] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-sm transition-all whitespace-nowrap cursor-pointer"
      >
        View recent profiles
      </button>
    </div>
  );
}

