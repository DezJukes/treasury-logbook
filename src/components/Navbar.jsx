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
    <nav className="w-full flex justify-between items-center px-30 py-4 shadow-2xl bg-white border-b-4 border-yellow-300">
      <div className="flex items-center gap-4">
        <img className="h-20 w-20 rounded-md" src="/plm-logo.png" alt="plm-logo" />
        <div>
          <h1 className="text-h2 font-bold text-yellow-600">Student Services Portal</h1>
          <p className="text-text2 text-gray-500">Treasury Digital Logbook System</p>
        </div>
      </div>

      <div className="flex items-center gap-10">
        <p className="text-sm">{formatDateTime(dateTime)}</p>
      </div>
    </nav>
  );
}

export default Navbar;
