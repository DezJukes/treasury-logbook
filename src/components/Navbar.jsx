import React, { useEffect, useState } from "react";
import { BookOpen, Download } from "lucide-react";
import { Button } from "./ui/button";

function Navbar() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDateTime = (dt) => {
    return dt.toLocaleString("en-PH", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  return (
    <nav className="w-full flex justify-between items-center px-5 md:px-30 py-4 shadow-2xl bg-white border-b-4 border-yellow-300">
      <div className="flex items-center gap-4">
        <img className="h-auto w-10 md:w-20 rounded-md" src="/plm-logo.png" alt="plm-logo" />
        <div>
          <h1 className="text-text4 md:text-h2 font-bold text-yellow-600">Treasury Logbook System</h1>
          <p className="text-text4 md:text-text2 text-gray-500">System Services Portal</p>
        </div>
      </div>

      <div className="flex items-center gap-10">
        <p className="text-sm">{formatDateTime(dateTime)}</p>
      </div>
    </nav>
  );
}

export default Navbar;
