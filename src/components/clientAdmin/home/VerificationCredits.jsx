import React from "react";

export default function VerificationCredits({ data }) {
  const totalCredits = data?.totalCredits ?? 500;
  const creditsUsed = data?.creditsUsed ?? 1;
  const availableRemaining = data?.availableRemaining ?? (totalCredits - creditsUsed);

  const percentRemaining = totalCredits > 0
    ? Math.min(100, Math.max(0, (availableRemaining / totalCredits) * 100))
    : 100;

  return (
    <div className="bg-gradient-to-br from-[#3342C6] via-[#303FB8] to-[#28349E] rounded-2xl p-5 text-white shadow-sm flex flex-col justify-between h-full">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
            Verification credits
          </h3>
          <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-semibold tracking-wide backdrop-blur-xs">
            Active
          </span>
        </div>
        <p className="text-xs text-white/70 mt-1 font-normal">
          Standard Employment Plan
        </p>

        {/* Big Remaining Display */}
        <div className="mt-5 mb-4 flex items-baseline gap-2">
          <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            {availableRemaining}
          </span>
          <span className="text-xs sm:text-sm text-white/85 font-normal">
            credits remaining
          </span>
        </div>

        {/* Progress Line with dot */}
        <div className="relative w-full h-1.5 bg-white/25 rounded-full my-4">
          <div
            className="absolute left-0 top-0 h-full bg-white rounded-full transition-all duration-500"
            style={{ width: `${percentRemaining}%` }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-sm pointer-events-none"
            style={{ left: `calc(${percentRemaining}% - 5px)` }}
          />
        </div>
      </div>

      {/* Bottom Sub-Boxes */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="bg-white/10 border border-white/10 rounded-xl p-3">
          <p className="text-[11px] text-white/75 font-normal">Total credits</p>
          <p className="text-base sm:text-lg font-bold text-white mt-0.5">
            {totalCredits}
          </p>
        </div>

        <div className="bg-white/10 border border-white/10 rounded-xl p-3">
          <p className="text-[11px] text-white/75 font-normal">Credits used</p>
          <p className="text-base sm:text-lg font-bold text-white mt-0.5">
            {creditsUsed}
          </p>
        </div>
      </div>
    </div>
  );
}

export { VerificationCredits };
