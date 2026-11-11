import React from "react";
import { useNavigate } from "react-router-dom";

function formatTimeAgo(dateString) {
  if (!dateString) return "Recently";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return String(dateString);

  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return "Just now";
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
  const diffInHours = Math.floor(diffInHours / 60);
  if (diffInHours < 24) return `${diffInHours} hr ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return "1 day ago";
  if (diffInDays < 30) return `${diffInDays} days ago`;
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths === 1) return "1 month ago";
  return `${diffInMonths} months ago`;
}

function getInitials(name = "") {
  return (
    name
      .split(" ")
      .filter(Boolean)
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U"
  );
}

const AVATAR_PALETTES = [
  { bg: "bg-[#EEF2FF]", text: "text-[#4F46E5]" }, // Indigo
  { bg: "bg-[#ECFDF5]", text: "text-[#10B981]" }, // Green
  { bg: "bg-[#FEF3C7]", text: "text-[#D97706]" }, // Amber
  { bg: "bg-[#FFEDD5]", text: "text-[#EA580C]" }, // Orange
  { bg: "bg-[#CCFBF1]", text: "text-[#0D9488]" }, // Teal
  { bg: "bg-[#FFE4E6]", text: "text-[#E11D48]" }, // Rose
];

export default function RecentProfiles({ data = [], className = "" }) {
  const navigate = useNavigate();

  // Fallback sample if no profiles from backend
  const sampleProfiles = [
    { name: "Deepti Swain", role: "HR", time: "6 days ago" },
    { name: "Nrusingha Prasad", role: "Candidate", time: "7 days ago" },
    { name: "Abinash Patri", role: "Candidate", time: "24 days ago" },
    { name: "Nrusingha Prasad", role: "Candidate", time: "24 days ago" },
    { name: "Shalini Nanda", role: "HR", time: "27 days ago" },
    { name: "Sagar Sethi", role: "Candidate", time: "27 days ago" },
    { name: "Ashok Subudhi", role: "Candidate", time: "30 days ago" },
    { name: "Anushka Sharma", role: "HR", time: "32 days ago" },
  ];

  const profilesToRender = data && data.length > 0 ? data : sampleProfiles;

  return (
    <div className={`bg-white rounded-2xl border border-[#E8EBFF] p-4 sm:p-5 shadow-sm flex flex-col h-[325px] ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-2.5 shrink-0">
        <h3 className="text-sm sm:text-base font-bold text-[#0F172A]">
          Recent profiles
        </h3>
        <button
          onClick={() => navigate("/admin/candidates")}
          className="text-xs font-semibold text-[#3B52E2] hover:text-[#2F44CD] hover:underline cursor-pointer transition-colors"
        >
          View all
        </button>
      </div>

      {/* Profiles List: displays exactly 5 full profiles cleanly, remaining scrollable */}
      <div
        className="flex-1 space-y-1.5 overflow-y-auto pr-1.5 custom-scrollbar min-h-0"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#CBD5E1 #F1F5F9",
        }}
      >
        {profilesToRender.map((item, index) => {
          const palette = AVATAR_PALETTES[index % AVATAR_PALETTES.length];
          const initials = getInitials(item.name);
          const isHR = String(item.role).toUpperCase() === "HR";
          const timeText = typeof item.time === "string" && item.time.includes("ago")
            ? item.time
            : formatTimeAgo(item.time);

          return (
            <div
              key={index}
              className="flex items-center justify-between gap-3 py-1 hover:bg-[#F8FAFC] -mx-1 px-1 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {/* Avatar Initials Circle */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${palette.bg} ${palette.text}`}
                >
                  {initials}
                </div>

                {/* Name & Time */}
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-semibold text-[#1E293B] truncate leading-tight">
                    {item.name}
                  </p>
                  <p className="text-[11px] text-[#94A3B8] mt-0.5">
                    {timeText}
                  </p>
                </div>
              </div>

              {/* Role Pill */}
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold shrink-0 tracking-wide ${
                  isHR
                    ? "bg-[#EEF2FF] text-[#4F46E5] border border-[#E0E7FF]"
                    : "bg-[#E6F8F6] text-[#0D9488] border border-[#CCFBF1]"
                }`}
              >
                {item.role || "Candidate"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
