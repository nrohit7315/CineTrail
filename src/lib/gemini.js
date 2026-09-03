/**
 * gemini.js
 * ---------
 * Wraps calls to the Google Gemini API. We use it for two different jobs,
 * which is why there are two exported functions:
 *
 *  1. askAboutDestination() — free-form chat. The visitor asks a question
 *     ("how many days should I spend here?") and gets a plain text answer.
 *
 *  2. generateItinerary() — structured output. We ask Gemini to return
 *     ONLY JSON matching a shape we define, so the Itinerary component can
 *     render it as a real day-by-day schedule instead of a wall of chat text.
 *
 * Both functions build a "system-style" instruction that tells Gemini which
 * destination we're talking about, so the model doesn't need the whole
 * conversation history re-explained every time.
 */

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
// gemini-1.5-flash is fast and inexpensive, which suits a chat widget well.
const BASE_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

async function callGemini(promptText) {
  if (!API_KEY) {
    throw new Error("Missing Gemini API key. Add VITE_GEMINI_API_KEY to your .env file.");
  }

  const response = await fetch(`${BASE_URL}?key=${API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: promptText }] }],
    }),
  });

  if (!response.ok) {
    throw new Error(`AI assistant request failed (status ${response.status}).`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("The AI assistant returned an empty response.");
  }

  return text;
}

/**
 * Free-form Q&A about a destination. `history` is an array of
 * { role: "user" | "assistant", text: string } so the model has context
 * from earlier turns in this conversation.
 */
export async function askAboutDestination(destination, history, question) {
  const context = `You are a friendly, concise travel assistant answering questions about ${destination.name}, ${destination.country}.
Known context: ${destination.description}
Notable places: ${destination.places.map((p) => p.name).join(", ")}.
Films connected to this destination: ${destination.films.map((f) => f.title).join(", ")}.
Keep answers to 2-4 sentences unless the visitor asks for more detail. Do not use markdown headers.`;

  const conversationSoFar = history
    .map((turn) => `${turn.role === "user" ? "Visitor" : "Assistant"}: ${turn.text}`)
    .join("\n");

  const prompt = `${context}\n\n${conversationSoFar}\nVisitor: ${question}\nAssistant:`;

  return callGemini(prompt);
}

/**
 * Structured itinerary generation. Asks Gemini to reply with JSON only,
 * then parses it. If the model wraps the JSON in ```json fences (it often
 * does, despite instructions), we strip those before parsing.
 */
export async function generateItinerary(destination, days, interests) {
  const prompt = `Create a ${days}-day travel itinerary for a visitor in ${destination.name}, ${destination.country}.
Their interests: ${interests || "general sightseeing"}.
Prioritise these known notable places where relevant: ${destination.places
    .map((p) => p.name)
    .join(", ")}.
Respond with ONLY valid JSON (no markdown fences, no commentary) in exactly this shape:
{
  "days": [
    {
      "day": 1,
      "theme": "short theme for the day",
      "activities": [
        { "time": "Morning", "title": "short title", "description": "one sentence" }
      ]
    }
  ]
}
Each day should have 3-4 activities with times like "Morning", "Afternoon", "Evening".`;

  const raw = await callGemini(prompt);
  const cleaned = raw.replace(/```json|```/g, "").trim();

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    throw new Error("Couldn't understand the itinerary the AI returned. Please try again.");
  }
}
