import { useEffect, useState } from "react";
import { supabase } from "@/createClient";

export function useEntries(selectedDate) {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    if (!selectedDate) return;

    const startOfDay = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      0, 0, 0
    ).toISOString();

    const endOfDay = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      23, 59, 59, 999
    ).toISOString();

    console.log("Fetching entries for date range:", startOfDay, "to", endOfDay);

    const fetchEntries = async () => {
      const { data, error } = await supabase.from("visit_entries").select("*").gte("date", startOfDay).lte("date", endOfDay).order("date", { ascending: false });;
      if (error) {
        console.log("Error fetching: ", error);
      } else {
        setEntries(data || []);
      }
    };

    fetchEntries();

    const channel = supabase.channel("visit_entries_changes").on("postgres_changes",
        { event: "*", schema: "public", table: "visit_entries",}, () => { fetchEntries(); }
    ).subscribe();

    return () => {supabase.removeChannel(channel);}
  }, [selectedDate]);

  return entries;
}