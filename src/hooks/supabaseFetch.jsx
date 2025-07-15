import { useEffect, useState } from "react";
import { supabase } from "@/createClient";

export function useEntries() {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        const fetchEntries = async () => {
            const { data, error } = await supabase.from("visit_entries").select("*");
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