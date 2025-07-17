import { supabase } from "@/createClient";

export async function deleteEntry(id) {
  const { error } = await supabase.from("visit_entries").delete().eq("id", id);
  if (error) {
    console.log("Error deleting entry:", error);
    return false;
  }
  return true;
}