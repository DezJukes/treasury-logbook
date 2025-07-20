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
  const allMatches = new Map();

  for (const word of words) {
    const { data, error } = await supabase
      .from('visit_entries')
      .select('student_name, date, purpose')
      .ilike('student_name', `%${word}%`);

    if (error) return `Error searching for ${word}: ${error.message}`;

    if (data && data.length > 0) {
      for (const entry of data) {
        const key = `${entry.student_name}-${entry.date}`;
        if (!allMatches.has(key)) {
          allMatches.set(key, entry);
        }
      }
    }
  }

  if (allMatches.size === 0) {
    return "No matching person found in the records. Try using another name or spelling.";
  }

  const entries = Array.from(allMatches.values());

  const logs = entries.map(entry => {
    const formattedDate = new Date(entry.date).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
    return `• **${entry.student_name}** logged in on **${formattedDate}** with purpose: "**${entry.purpose || "No purpose specified"}**"`;
  }).join('\n');

  const summary = `Here are the visit logs found based on your query:\n${logs}`;

  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });
  const result = await model.generateContent(
  `You are a helpful and intelligent AI assistant for a Treasury Logbook System. The system keeps track of visit entries containing: **student names**, **dates of visit**, and **purpose** of visit.

    Your job is to interpret and answer the user’s query **based only on this logbook data**.

    User's Query: "${prompt}"

    Visit Log Data:
    ${summary}

    Instructions:
    1. **Stay within your scope**: Only answer questions related to visit records. If the user asks something outside of this (e.g., world news, jokes, policies), respond with:
      > "I'm designed specifically to assist with Treasury logbook records such as student names, visit dates, and purposes."

    2. **Understand query intent**:
      - If the user asks **who visited on a specific date**, filter logs by that date.
      - If the user asks **when a person visited**, show their visit dates and purposes.
      - If asked **how many times someone visited**, count and respond.
      - If asked **why someone visited**, show their listed purposes.
      - If asked **yes/no questions** like "Did Bryan come in June?":
        - Say "**Yes**, [Name] visited on [Date] for [Purpose]" if found.
        - Say "**No**, there's no record of [Name] visiting in that time."

    3. **Present results clearly**:
      - Use bullet points
      - Format names, dates, and purposes in **bold**
      - Mention the total number of matching records
      - Be professional, concise, and helpful

    4. If no results match the query:
      - Say: "No matching records were found for that query."
      - Suggest: "You may try using a full name or a more specific time frame."

    Do not invent data. Only refer to the log data provided.`
    );



  const response = await result.response;
  return response.text();
}
