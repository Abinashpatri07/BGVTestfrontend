import React from "react";
import {
  FileText,
  CheckCircle2,
  PauseCircle,
  RotateCw,
  BadgeCheck,
  Ban,
} from "lucide-react";

export default function CandidateOverview({ data }) {
  const formatVal = (val) => String(val !== undefined && val !== null ? val : 0).padStart(2, "0");

  const cards = [
    {
      title: "In progress",
      value: formatVal(data?.inProgress ?? 3),
      icon: <FileText size={16} strokeWidth={2.2} />,
      bg: "bg-[#EEF2FF]",
      border: "border-[#DFE7FF]",
      iconBg: "bg-[#3B52E2]",
      textColor: "text-[#1E3A8A]",
    },
    {
      title: "Complete",
      value: formatVal(data?.complete ?? 0),
      icon: <CheckCircle2 size={16} strokeWidth={2.2} />,
      bg: "bg-[#EAFBF1]",
      border: "border-[#CEF7DC]",
      iconBg: "bg-[#10B981]",
      textColor: "text-[#047857]",
    },
    {
      title: "On hold",
      value: formatVal(data?.onHold ?? 0),
      icon: <PauseCircle size={16} strokeWidth={2.2} />,
      bg: "bg-[#FEF7EA]",
      border: "border-[#FDE5BC]",
      iconBg: "bg-[#D97706]",
      textColor: "text-[#B45309]",
    },
    {
      title: "Verification in progress",
      value: formatVal(data?.verificationInProgress ?? 2),
      icon: <RotateCw size={16} strokeWidth={2.2} />,
      bg: "bg-[#FFF3E8]",
      border: "border-[#FED9BD]",
      iconBg: "bg-[#EA580C]",
      textColor: "text-[#C2410C]",
    },
    {
      title: "Verified",
      value: formatVal(data?.verified ?? 0),
      icon: <BadgeCheck size={16} strokeWidth={2.2} />,
      bg: "bg-[#E6F8F6]",
      border: "border-[#C2EFE9]",
      iconBg: "bg-[#0D9488]",
      textColor: "text-[#0F766E]",
    },
    {
      title: "Rejected",
      value: formatVal(data?.rejected ?? 0),
      icon: <Ban size={16} strokeWidth={2.2} />,
      bg: "bg-[#FEF0F2]",
      border: "border-[#FDCED6]",
      iconBg: "bg-[#EF4444]",
      textColor: "text-[#BE123C]",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#E8EBFF] p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm sm:text-base font-bold text-[#0F172A]">
          Candidate overview
        </h2>
        <span className="text-xs text-[#94A3B8] font-medium">
          6 statuses
        </span>
      </div>

      {/* Grid: 3 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-xl border ${card.bg} ${card.border} flex flex-col justify-between transition-shadow hover:shadow-xs`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#475569]">
                {card.title}
              </span>
              <div
                className={`w-7 h-7 rounded-lg ${card.iconBg} text-white flex items-center justify-center shrink-0 shadow-xs`}
              >
                {card.icon}
              </div>
            </div>

            <div className="mt-4">
              <span className={`text-2xl sm:text-3xl font-bold tracking-tight ${card.textColor}`}>
                {card.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
