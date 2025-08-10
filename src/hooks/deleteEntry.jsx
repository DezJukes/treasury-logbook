import { supabase } from "@/createClient";
import { toast } from "sonner";

export async function deleteEntry(id) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/visitentries/${id}/`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      toast.error("Failed to delete entry: " + (errorData.detail || response.statusText));
      return false;
    }

    toast.success("Entry deleted successfully.");
    return true;
  } catch (error) {
    toast.error("Failed to delete entry: " + error.message);
    return false;
  }
}