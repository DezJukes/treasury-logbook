import { useEffect, useState } from "react";
import { supabase } from "@/createClient";

export function useEntries() {
    const [entries, setEntries] = useState([]);
    const today = new Date();

    const startOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    0, 0, 0
    ).toISOString();

    const endOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    23, 59, 59, 999
    ).toISOString();

    useEffect(() => {
        const fetchEntries = async () => {
            const { data, error } = await supabase.from("visit_entries").select("*").gte("date", startOfDay).lte("date", endOfDay);
            if (error) {
                console.log("Error fetching: ", error);
            } else {
                setEntries(data || []);
            }
        };
        fetchEntries();
    }, []);

    return entries;
}