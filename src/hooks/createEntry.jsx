import { supabase } from "@/createClient";
import { useState } from "react";
import { toast } from "sonner";

export function createEntry() {
  // State variables
  const [studentName, setStudentName] = useState("");
  const [studentNo, setStudentNo] = useState("");
  const [purpose, setPurpose] = useState("");
  const [staff, setStaff] = useState("");

  const handleSubmit = async (isStudent) => {
    
    // Validate inputs
    if (isStudent && studentNo.trim() === "") {
      toast.error(<div>Student number is required for students. <br />Input your student number.</div>);
      return;
    

    // Check if student number is 9 digits long
    } else if (studentNo.length !== 9) {
      toast.error(<div>Student number must be 9 digits long. <br />Example: 202212345</div>);
      return;


    // Check if student name is provided
    } else if (studentName.trim() === "") {
      toast.error("Student name is required.");
      return;


    // Check if purpose is provided
    } else if (purpose.trim() === "") {
      toast.error("Purpose of visit is required.");
      return;
    }


    // Prepare data for Django
    const payload = {
      student_no: studentNo || null,
      student_name: studentName,
      purpose,
      staff,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/visitentries/add_entry/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error("Failed to add entry: " + (errorData.detail || response.statusText));
        return;
      }

      toast.success("Entry added successfully!");
      setStudentNo("");
      setStudentName("");
      setPurpose("");
      setStaff("Select");
    } catch (error) {
      toast.error("Failed to add entry: " + error.message);
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
