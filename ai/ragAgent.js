// ai/ragAgent.js
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

export async function handleLogbookQuery(prompt) {
  const words = prompt.split(/\s+/).filter(w => w.length > 2);

  let matchedEntry = null;

  for (const word of words) {
    const { data, error } = await supabase
      .from('visit_entries')
      .select('student_name, date, purpose')
      .ilike('student_name', `%${word}%`);

    if (error) return `Error searching for ${word}: ${error.message}`;

    if (data && data.length > 0) {
      matchedEntry = { name: word, entries: data };
      break;
    }
  }

  if (!matchedEntry) {
    return "No matching person found in the records. Try using another name or spelling.";
  }

  // Build detailed logs with date and purpose
  const logs = matchedEntry.entries.map(entry => {
    const formattedDate = new Date(entry.date).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
    return `• ${entry.student_name} logged in on ${formattedDate} with purpose: "${entry.purpose || "No purpose specified"}"`;
  }).join('\n');

  const summary = `Here are all logs found for "${matchedEntry.name}":\n${logs}`;


  // Gen-AI Customization
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });
  const result = await model.generateContent(
  `User asked: "${prompt}".\n\nHere are the visit log details:\n${summary}\n\nPlease respond naturally and helpfully. Format the information in bullet points for easy understanding. Use **bold text** to highlight important details like names, dates, and purposes. Keep the tone friendly and clear.`
);


  const response = await result.response;
  return response.text();
}
