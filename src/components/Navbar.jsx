import React, { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";

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
    <nav className="w-full flex justify-between items-center px-20 py-4 shadow-2xl bg-white border-b">
      <div className="flex items-center gap-4">
        <BookOpen className="h-18 w-18 bg-blue-500 text-white p-3 rounded-md" />
        <div>
          <h1 className="text-h2 font-bold">Student Services Portal</h1>
          <p className="text-text2 text-gray-500">Treasury Digital Logbook System</p>
        </div>
      </div>

      <p className="text-sm">{formatDateTime(dateTime)}</p>
    </nav>
  );
}

export default Navbar;
