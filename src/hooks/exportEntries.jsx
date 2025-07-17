export function exportEntries(entries, selectedDate) {
  if (!entries || entries.length === 0) return;

  const headers = ["Student No.", "Name", "Purpose", "Staff", "Date"];
  const rows = entries.map(entry => [
    entry.student_no,
    entry.student_name,
    entry.purpose,
    entry.staff,
    new Date(entry.date).toLocaleDateString()
  ]);

  const csvContent = [headers, ...rows].map(row => row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(",")).join("\r\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `visit_entries_${selectedDate.toISOString().slice(0,10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}