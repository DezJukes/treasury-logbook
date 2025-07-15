import { FileText, Search, Download } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEntries } from "../hooks/supabaseFetch";
import { DatePicker } from "../components/ui/CalendarPicker";


function SectionDisplay() {
  const entries = useEntries();
  const [date, setDate] = React.useState(null)

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) return "";
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${mm}-${dd}-${yyyy}`;
  };

  return (
    <main className="flex flex-col gap-5 w-full max-w-4xl border border-gray-400 rounded-lg ml-auto">
      {/* Header with Icon and Search */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-around gap-4 px-6 py-4 bg-gray-100 border-b">
        
        <div>
          <div className="flex items-center gap-2">
            <FileText />
            <h1 className="text-h2 font-bold">Entries</h1>
          </div>
          <p className="text-sm text-gray-600"> Manage and view all student visit entries</p>
        </div>

        {/* Date Picker */}
        <div>
          <DatePicker value={date} onChange={setDate} />
          {date && (
            <p className="text-[12px] text-gray-600">
              You selected: {date.toDateString()}
            </p>
          )}
        </div>

        {/* Save as .csv button */}
        <div>
          <Button className="btn-save bg-transparent text-black border border-gray-300 w-full cursor-pointer"><Download />Save list</Button>
        </div>
        
        <div className="w-full sm:w-1/3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400 h-4 w-4" />
            <Input className="pl-10 w-full" placeholder="Search entries..." />
          </div>
        </div>
      </section>

      {/* Table with horizontal scroll */}
      <div className="w-full overflow-x-auto px-6 pb-6">
        <div className="min-w-[700px]">
          <Table>
            <TableCaption>Recent visit entries</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">Student No.</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Staff</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
                {entries.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{entry.student_no}</TableCell>
                    <TableCell>{entry.student_name}</TableCell>
                    <TableCell>{entry.purpose}</TableCell>
                    <TableCell>{entry.staff}</TableCell>
                    <TableCell className="text-right">{formatDate(entry.date)}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  );
}

export default SectionDisplay;
