import { supabase } from "@/createClient";
import { useState } from "react";
import { toast } from "sonner";

export function createEntry() {
  const [studentName, setStudentName] = useState("");
  const [studentNo, setStudentNo] = useState("");
  const [purpose, setPurpose] = useState("");
  const [staff, setStaff] = useState("");

  const handleSubmit = async () => {
    const { error } = await supabase.from("visit_entries").insert([
      {
        student_no: studentNo || null,
        student_name: studentName,
        purpose,
        staff,
      },
    ]);

    if (error) {
      toast.error("Failed to add entry: " + error.message);
    } else {
      toast.success("Entry added successfully!");
      setStudentNo("");
      setStudentName("");
      setPurpose("");
      setStaff("Select");
    }
  };

  return {
    studentNo,
    setStudentNo,
    studentName,
    setStudentName,
    purpose,
    setPurpose,
    staff,
    setStaff,
    handleSubmit,
  };
}
