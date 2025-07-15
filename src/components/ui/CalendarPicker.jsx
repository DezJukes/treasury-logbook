import React from "react"

export function DatePicker({ value, onChange }) {
  const handleChange = (e) => {
    if (e.target.value === "") {
      // Handle clearing the date
      onChange?.(null)
    } else {
      const selectedDate = new Date(e.target.value)
      onChange?.(selectedDate)
    }
  }

  // Helper function to safely format date for input
  const formatDateForInput = (date) => {
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
      return ""
    }
    return date.toISOString().split("T")[0]
  }

  return (
    <div className="flex flex-col gap-2">
      <input
        type="date"
        value={formatDateForInput(value)}
        onChange={handleChange}
        className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}
