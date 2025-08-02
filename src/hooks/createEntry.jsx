import { supabase } from "@/createClient";
import { useState } from "react";
import { toast } from "sonner";

export function createEntry() {
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


    // If passes the validation, proceed to insert into the database
    const { error } = await supabase.from("visit_entries").insert([
      {
        student_no: studentNo || null,
        student_name: studentName,
        purpose,
        staff,
      },
    ]);


    // Handle error for inserting data to database
    if (error) {
      toast.error("Failed to add entry: " + error.message);
      return;
    }

    
    // If successful, reset the form fields
    toast.success("Entry added successfully!");
    setStudentNo("");
    setStudentName("");
    setPurpose("");
    setStaff("Select");
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
