import { useEffect, useState } from "react";

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

    const dateselected = selectedDate.toISOString().substring(0, 10);

    console.log("Fetching entries for date range:", startOfDay, "to", endOfDay);

    const fetchEntries = async () => {
      try {
        const params = new URLSearchParams({
          start: startOfDay,
          end: endOfDay,
        });
        const response = await fetch(`http://127.0.0.1:8000/api/visitentries/?date=${dateselected}`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setEntries(data || []);
      } catch (error) {
        console.log("Error fetching: ", error);
        setEntries([]);
      }
    };

    fetchEntries();

  }, [selectedDate]);

  return entries;
}