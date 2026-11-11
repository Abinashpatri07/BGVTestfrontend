import React, { useState, useEffect, useRef } from "react";
import { API_BASE_URL } from "../../API/config.js";
import axiosInstance from "../../API/axiosInstance";

import HomeBanner from "../../components/clientAdmin/home/HomeBanner";
import HROverview from "../../components/clientAdmin/home/HROverview";
import CandidateOverview from "../../components/clientAdmin/home/CandidateOverview";
import VerificationCredits from "../../components/clientAdmin/home/VerificationCredits";
import RecentProfiles from "../../components/clientAdmin/home/RecentProfiles";

function Home() {
  const [hrStats, setHrStats] = useState(null);
  const [candidateStats, setCandidateStats] = useState(null);
  const [recentProfiles, setRecentProfiles] = useState([]);
  const [credits, setCredits] = useState(null);
  const recentProfilesRef = useRef(null);

  // User details for welcome banner
  let userName = "Abhishek Chandran";
  try {
    const stored = localStorage.getItem("user");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed?.name && parsed.name !== "Client Admin" && parsed.name !== "User") {
        userName = parsed.name;
      }
    }
  } catch (e) {
    console.warn("Could not read user from storage:", e);
  }

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await axiosInstance.get(`${API_BASE_URL}/api/client-admin/dashboard/metrics`);
        if (res.data?.success && res.data?.data) {
          setHrStats(res.data.data.hrStats);
          setCandidateStats(res.data.data.candidateStats);
          setRecentProfiles(res.data.data.recentProfiles || []);
          setCredits(res.data.data.credits || null);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard metrics:", error);
      }
    };
    fetchMetrics();
  }, []);

  const handleScrollToRecent = () => {
    if (recentProfilesRef.current) {
      recentProfilesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-4 pb-6">
      {/* ───────────────── TOP WELCOME BANNER ───────────────── */}
      <HomeBanner
        userName={userName}
        onScrollToRecent={handleScrollToRecent}
      />

      {/* ───────────────── MAIN 2-ROW GRID (PERFECT ROW ALIGNMENT) ───────────────── */}
      <div className="grid grid-cols-12 gap-4 items-stretch">
        {/* ROW 1: HR Overview (8 cols) & Verification Credits (4 cols) */}
        <div className="col-span-12 lg:col-span-8 flex flex-col">
          <HROverview data={hrStats} className="h-full" />
        </div>
        <div className="col-span-12 lg:col-span-4 flex flex-col">
          <VerificationCredits data={credits} className="h-full" />
        </div>

        {/* ROW 2: Candidate Overview (8 cols) & Recent Profiles (4 cols) */}
        <div className="col-span-12 lg:col-span-8 flex flex-col">
          <CandidateOverview data={candidateStats} className="h-full" />
        </div>
        <div ref={recentProfilesRef} className="col-span-12 lg:col-span-4 flex flex-col">
          <RecentProfiles data={recentProfiles} className="h-full" />
        </div>
      </div>
    </div>
  );
}

export default Home;
