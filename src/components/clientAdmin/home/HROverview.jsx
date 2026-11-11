import React from "react";
import { Users, UserCheck, UserX, Ban } from "lucide-react";

export default function HROverview({ data, className = "" }) {
  const formatVal = (val) => String(val !== undefined && val !== null ? val : 0).padStart(2, "0");

  const cards = [
    {
      title: "Total HR",
      value: formatVal(data?.total ?? 2),
      icon: <Users size={16} strokeWidth={2.2} />,
      bg: "bg-[#EEF2FF]",
      border: "border-[#DFE7FF]",
      iconBg: "bg-[#3B52E2]",
      textColor: "text-[#1E293B]",
    },
    {
      title: "Active",
      value: formatVal(data?.active ?? 2),
      icon: <UserCheck size={16} strokeWidth={2.2} />,
      bg: "bg-[#EAFBF1]",
      border: "border-[#CEF7DC]",
      iconBg: "bg-[#10B981]",
      textColor: "text-[#047857]",
    },
    {
      title: "Inactive",
      value: formatVal(data?.inactive ?? 0),
      icon: <UserX size={16} strokeWidth={2.2} />,
      bg: "bg-[#FEF7EA]",
      border: "border-[#FDE5BC]",
      iconBg: "bg-[#D97706]",
      textColor: "text-[#B45309]",
    },
    {
      title: "Terminated",
      value: formatVal(data?.terminated ?? 0),
      icon: <Ban size={16} strokeWidth={2.2} />,
      bg: "bg-[#FEF0F2]",
      border: "border-[#FDCED6]",
      iconBg: "bg-[#EF4444]",
      textColor: "text-[#BE123C]",
    },
  ];

  return (
    <div className={`bg-white rounded-2xl border border-[#E8EBFF] p-5 shadow-sm ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm sm:text-base font-bold text-[#0F172A]">
          HR overview
        </h2>
        <span className="text-xs text-[#94A3B8] font-medium">
          4 statuses
        </span>
      </div>

      {/* Grid: 3 columns with compact cards matching reference design */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-xl border ${card.bg} ${card.border} flex flex-col justify-between min-h-[96px] transition-shadow hover:shadow-xs`}
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

            <div className="mt-3">
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
