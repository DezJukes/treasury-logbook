import React, { useState } from "react";
import axios from "axios";

export default function AiAssistant() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const askAI = async () => {
    const res = await axios.post("http://localhost:5001/ask", { prompt });
    setResponse(res.data.result);
  };

  return (
    <div className="p-4 border rounded shadow max-w-xl mx-auto mt-6">
      <h2 className="text-xl font-bold mb-2">Logbook AI Assistant</h2>

      <input
        className="w-full p-2 border rounded mb-2"
        type="text"
        placeholder="Ask something like 'Was Jane Doe logged in on July 18?'"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      {/* ✅ Ensure this is not wrapped in another button */}
      <button
        onClick={askAI}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Ask
      </button>

      {response && (
        <div className="mt-4 p-3 border rounded bg-gray-100">
          <strong>Response:</strong> {response}
        </div>
      )}
    </div>
  );
}
