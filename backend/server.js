const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");

const app = express();
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "AI Interview Agent Backend is running!",
  });
});

app.post("/api/interview/question", async (req, res) => {
  try {
    const {
      name,
      role,
      experience,
      skills,
      previousAnswers,
    } = req.body;

    console.log("Candidate:", name);
    console.log("Role:", role);
    console.log("Experience:", experience);
    console.log("Skills:", skills);
    console.log("Previous Answers:", previousAnswers);

    const prompt = `
You are an AI interviewer.

Conduct a professional ${role} interview.

Candidate:
Name: ${name}
Experience: ${experience}
Skills: ${skills}

Previous interview answers:
${JSON.stringify(previousAnswers)}

Generate the next interview question.

Rules:
- Ask only ONE question.
- The question should be relevant to the candidate's role and skills.
- Consider the candidate's previous answers.
- Gradually increase the difficulty.
- Do not repeat previous questions.
- Do not provide the answer.
- Return only the interview question.
`;

   const response = await ai.models.generateContent({
  model: "gemini-3.1-flash-lite",
  contents: prompt,
});

    const question = response.text;
    console.log("Gemini Question:", question);

    res.json({
      question: question,
    });

  } catch (error) {
    console.error("OpenAI API error:", error);

    res.status(500).json({
      error: "Failed to generate interview question.",
    });
  }
});
app.post("/api/interview/evaluate", async (req, res) => {
  try {
    const {
      name,
      role,
      experience,
      skills,
      answers,
    } = req.body;

    console.log("Evaluating interview for:", name);
    console.log("Total answers:", answers.length);

   const prompt = `
You are an AI interview evaluation system.

Evaluate this candidate's interview answers.

Candidate:
Name: ${name}
Role: ${role}
Experience: ${experience}
Skills: ${skills}

Interview:

${answers
  .map(
    (item, index) => `
Question ${index + 1}:
${item.question}

Answer ${index + 1}:
${item.answer}
`
  )
  .join("\n")}

Evaluate the candidate based only on the answers provided.

You MUST return a JSON object.

Do NOT return:
- explanations
- headings
- markdown
- bullet points outside the JSON
- introductions
- conclusions
- code fences

The response must contain ONLY this JSON object:

{
  "overallScore": 0,
  "technicalScore": 0,
  "communicationScore": 0,
  "problemSolvingScore": 0,
  "strengths": [],
  "weaknesses": [],
  "suggestions": [],
  "feedback": ""
}

Scoring:
- overallScore: 0 to 100
- technicalScore: 0 to 100
- communicationScore: 0 to 100
- problemSolvingScore: 0 to 100

strengths:
Return 3 short strings.

weaknesses:
Return 3 short strings.

suggestions:
Return 3 short strings.

feedback:
Return one concise paragraph.

Return ONLY JSON.
`;

    const response = await ai.models.generateContent({
  model: "gemini-3.6-flash",

  contents: prompt,

  config: {
    responseMimeType: "application/json",
  },
});

   const text = response.text.trim();

console.log("Raw Gemini Evaluation:", text);

const evaluation = JSON.parse(text);

console.log("Gemini Evaluation:", evaluation);

res.json(evaluation);
  } catch (error) {
    console.error("Evaluation error:", error);

    res.status(500).json({
      error: "Failed to evaluate interview.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});