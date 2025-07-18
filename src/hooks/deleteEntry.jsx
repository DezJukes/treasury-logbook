import { supabase } from "@/createClient";
import { toast } from "sonner";

export async function deleteEntry(id) {
  const { error } = await supabase.from("visit_entries").delete().eq("id", id);
  if (error) 
  {
    toast.error("Failed to delete entry.", error);
    return false;
  }
    toast.success("Entry deleted successfully.");
    return true;
}