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
    <nav className="w-full flex justify-between items-center px-30 py-4 shadow-2xl bg-white border-b">
      <div className="flex items-center gap-4">
        <BookOpen className="h-18 w-18 bg-blue-500 text-white p-3 rounded-md" />
        <div>
          <h1 className="text-h2 font-bold">Student Services Portal</h1>
          <p className="text-text2 text-gray-500">Treasury Digital Logbook System</p>
        </div>
      </div>

      <div className="flex items-center gap-10">
        <p className="text-sm">{formatDateTime(dateTime)}</p>
        {/* Save as .csv button */}
        <div>
          <Button className="btn-save gap-3 bg-transparent text-black border border-gray-300 w-full cursor-pointer"><Download />Save list</Button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
