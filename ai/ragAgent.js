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
  const nameMatch = prompt.match(/(?:Was|Is)\s+(.*?)\s+logged/i);
  const name = nameMatch?.[1]?.trim();

  if (!name) return "Please specify a name to search.";

  // Search by name (case-insensitive)
  const { data, error } = await supabase
    .from('visit_entries')
    .select('student_name, date')
    .ilike('student_name', `%${name}%`);

  if (error) return `Error fetching data: ${error.message}`;
  if (!data || data.length === 0) return `${name} has no log entries.`;

  // Group all dates associated with the person
  const dates = data
    .map(entry => new Date(entry.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }));

  const uniqueDates = [...new Set(dates)]; // remove duplicates

  const summary = `${name} was logged in on:\n- ${uniqueDates.join('\n- ')}`;

  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });
  const result = await model.generateContent(
    `User asked: "${prompt}". Based on the logs, ${summary}. Respond naturally and helpfully.`
  );
  const response = await result.response;
  return response.text();
}
