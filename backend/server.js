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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});