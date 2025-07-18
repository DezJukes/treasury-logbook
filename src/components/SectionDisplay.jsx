import { FileText, Search, Download, CircleX, SquareX, ReceiptText } from "lucide-react";
import { DatePicker } from "../components/ui/CalendarPicker";
import { useEntries } from "../hooks/supabaseFetch";
import { deleteEntry } from "@/hooks/deleteEntry";
import { exportEntries } from "@/hooks/exportEntries";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
  const [validationPrint, setValidationPrint] = React.useState(false);
  const [selectedEntry, setSelectedEntry] = React.useState(null);
  const [validation, setValidation] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [date, setDate] = React.useState(new Date());
  const entries = useEntries(date);
  
  const filteredEntries = entries.filter(entry =>
    entry.student_name.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
    entry.staff.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );
  
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
          <Button className="btn-save gap-3 bg-transparent text-black border border-gray-300 w-full cursor-pointer" onClick={() => setValidationPrint(true)} ><Download />Save list</Button>
        </div>

        <div className="w-full sm:w-1/3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400 h-4 w-4" />
            <Input 
              className="pl-10 w-full" 
              placeholder="Search by student name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Table with horizontal scroll */}
      <div className="w-full px-6 pb-6">
        <div className="min-h-[300px] max-h-[400px] overflow-y-auto border">
          <Table>
            <TableCaption>Recent visit entries</TableCaption>
            <TableHeader className="bg-gray-200">
              <TableRow>
                <TableHead className="w-[120px]">Student No.</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Staff</TableHead>
                <TableHead className="text-right">Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEntries.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{entry.student_no}</TableCell>
                  <TableCell>{entry.student_name}</TableCell>
                  <TableCell className="max-w-xs whitespace-break-spaces break-words">{entry.purpose}</TableCell>
                  <TableCell>{entry.staff}</TableCell>
                  <TableCell className="text-right">{formatDate(entry.date)}</TableCell>
                  <TableCell className="text-red-500"><div className="btn-remove flex items-center justify-center cursor-pointer"><CircleX onClick={() => {setSelectedEntry(entry); setValidation(true); }}/></div></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Will show the validation */}
      {validation && selectedEntry && (
        <Dialog open={validation} onOpenChange={setValidation}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogDescription>
                Double check the entry. You will remove an entry in the list.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button className="btn-confirm-remove cursor-pointer border border-gray-400" onClick={async() => {
                    await deleteEntry(selectedEntry.id);
                    setValidation(false);
                    setSelectedEntry(null);
                  }} variant="primary">
                  <SquareX />Delete Entry
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button className="btn-close cursor-pointer" type="button" variant="secondary" onClick={() => {setValidation(false); setSelectedEntry(null); }}>
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {validationPrint && (
        <Dialog open={validationPrint} onOpenChange={setValidationPrint}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogDescription>
                Print the list?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button className="btn-confirm-print cursor-pointer border border-gray-400" onClick={async() => exportEntries(entries, date)} variant="primary">
                  <ReceiptText />Print list
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button className="btn-close cursor-pointer" type="button" variant="secondary" onClick={() => {setValidation(false); setSelectedEntry(null); }}>
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </main>
  );
}

export default SectionDisplay;
