import React, { useState, useEffect } from "react";
import formatResponseToJSX from "./AiResponseFormatter";
import { Bot, X } from "lucide-react";
import axios from "axios";

export default function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [typedResponse, setTypedResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResponse("");
    setTypedResponse("");
    try {
      const res = await axios.post("http://localhost:5001/ask", { prompt });
      setResponse(res.data.result); // Full response to be typed out
    } catch (err) {
      setResponse("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Typing animation logic
  useEffect(() => {
    if (!response) return;
    let index = -1;
    const interval = setInterval(() => {
      setTypedResponse((prev) => prev + response.charAt(index));
      index++;
      if (index >= response.length) clearInterval(interval);
    }, 10); // Typing speed

    return () => clearInterval(interval);
  }, [response]);

  return (
    <>
      {/* Floating Button */}
      <button onClick={() => setOpen(true)} className="btn-bot fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg cursor-pointer" title="Ask Logbook AI">
        <Bot size={40} />
      </button>

      {/* Popup Panel */}
      {open && (
        <div className="fixed bottom-20 right-6 w-80 bg-white border border-gray-300 rounded-xl shadow-xl p-4 z-50 animate-fade-in">
          {/* Title and X button */}
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg text-gray-800">Hi, I'm <strong>Telly</strong> AI!</h2>
            <button onClick={() => setOpen(false)} className="dialog-x text-gray-500 cursor-pointer"><X size={20} /></button>
          </div>
          {/* Prompting Input */}
          <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="e.g. Prompt.. Looking for someone? I'll help you." className="w-full resize-none px-3 py-2 border rounded mb-2 text-sm focus:outline-none focus:ring focus:ring-blue-300" rows={3}/>
          {/* Ask button */}
          <button onClick={askAI} className="btn-entry cursor-pointer w-full bg-blue-600 text-white py-2 rounded text-sm" disabled={loading}>{loading ? "Asking..." : "Ask"}</button>
          {/* Response */}
          {typedResponse && ( <div className="mt-3 p-2 bg-gray-100 border rounded text-sm">
              <strong>Response:</strong>
              <div className="mt-1">{formatResponseToJSX(typedResponse)}</div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
