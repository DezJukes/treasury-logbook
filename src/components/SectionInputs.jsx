import { Plus, CircleCheckBig } from 'lucide-react';
import { Label } from "../components/ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createEntry } from '@/hooks/createEntry';

function SectionInputs() {
  const {
    studentNo,
    setStudentNo,
    studentName,
    setStudentName,
    purpose,
    setPurpose,
    staff,
    setStaff,
    handleSubmit,
  } = createEntry();

  return (
    <main className="flex flex-col gap-5 max-w-md border border-gray-400 rounded-lg">

      <div className="text-white bg-blue-700 p-5">
        <div className="flex items-center gap-2">
          <Plus />
          <h1 className="text-h3 font-bold">New Entry</h1>
        </div>
        <p className="text-text1">Record Student Visit Information</p>
      </div>

      {/* Student Number  */}
      <div className="flex flex-col gap-2 px-10">
        <Label>Student Number</Label>
        <Input className="" placeholder="eg. 202234078" 
        onChange={(e) => setStudentNo(e.target.value)}
        />
      </div>

      {/* Student Name  */}
      <div className="flex flex-col gap-2 px-10">
        <Label>Student Name</Label>
        <Input className="" placeholder="Enter full name" 
        onChange={(e) => setStudentName(e.target.value)}
        />
      </div>

      {/* Purpose  */}
      <div className="flex flex-col gap-2 px-10">
        <Label>Purpose of Visit</Label>
        <Textarea placeholder="Describe the reason for the visit.." 
        onChange={(e) => setPurpose(e.target.value)}
        />
      </div>

      {/* Dropdown */}
      <div className="flex flex-col gap-2 px-10">
        <Label>Assigned Staff Member</Label>
        <Select value={staff} onValueChange={(value) => setStaff(value)}>
          <SelectTrigger className="w-full">
            <SelectValue/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem>Select</SelectItem>
            <SelectItem value="Mam Cherry">Mam Cherry</SelectItem>
            <SelectItem value="Sir Larry">Sir Larry</SelectItem>
            <SelectItem value="Mam Sheila">Mam Sheila</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Button */}
      {/* Bry, change mo lang itong onclick kapag ginawa mo na. Ayusin ko nalang yung user validation na yan. Pero try mo muna bago burahin para kita mo itsura. hahaha */}
      <div className="px-10 mb-5">
        <Button onClick={handleSubmit} className="btn-entry bg-blue-700 w-full cursor-pointer"><CircleCheckBig />Add Entry</Button>
      </div>
    </main>
  );
}

export default SectionInputs;
