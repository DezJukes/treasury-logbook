import React from "react"

export function DatePicker({ value, onChange }) {
  const handleChange = (e) => {
    const selectedDate = new Date(e.target.value)
    onChange?.(selectedDate)
  }

  return (
    <div className="flex flex-col gap-2">
      <input
        type="date"
        value={value ? value.toISOString().split("T")[0] : ""}
        onChange={handleChange}
        className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}
