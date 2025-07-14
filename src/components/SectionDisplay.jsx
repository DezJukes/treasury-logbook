import { FileText, Search } from "lucide-react";
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

function SectionDisplay() {
  return (
    <main className="flex flex-col gap-5 w-full max-w-4xl border border-gray-400 rounded-lg ml-auto">
      {/* Header with Icon and Search */}
      <section className="flex items-center justify-between px-6 py-4 bg-gray-100 border-b">
        <div>
          <div className="flex items-center gap-2">
            <FileText />
            <h1 className="text-h2 font-bold">Entries</h1>
          </div>
          <p className="text-sm text-gray-600">
            Manage and view all student visit entries
          </p>
        </div>
        <div className="w-1/3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400 h-4 w-4" />
            <Input
              className="pl-10"
              placeholder="Search entries..."
            />
          </div>
        </div>
      </section>

      {/* Table */}
      <div className="overflow-x-auto px-6 pb-6">
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
            <TableRow>
              <TableCell className="font-medium">202234078</TableCell>
              <TableCell>Juan Dela Cruz</TableCell>
              <TableCell>Request for documents</TableCell>
              <TableCell>Mam Cherry</TableCell>
              <TableCell className="text-right">2025-07-14</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </main>
  );
}

export default SectionDisplay;
