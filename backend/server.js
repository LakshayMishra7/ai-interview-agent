const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");

const app = express();
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// const PORT = 5000;

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

SCORING RULES:

Technical Score:
- 90-100: Excellent technical knowledge and accurate answers
- 75-89: Strong technical knowledge with minor gaps
- 60-74: Good basic knowledge with some gaps
- 40-59: Limited knowledge with several gaps
- 20-39: Very weak technical knowledge
- 1-19: Almost no demonstrated technical knowledge
- 0: No meaningful technical attempt at all

Communication Score:
- 90-100: Excellent, clear and well-structured communication
- 75-89: Clear and professional communication
- 60-74: Generally understandable communication
- 40-59: Incomplete or unclear communication
- 20-39: Very poor communication
- 1-19: Minimal communication
- 0: No meaningful response

Problem Solving Score:
- 90-100: Excellent reasoning and problem solving
- 75-89: Strong reasoning
- 60-74: Good reasoning with minor gaps
- 40-59: Some reasoning but incomplete
- 20-39: Very weak reasoning
- 1-19: Almost no demonstrated reasoning
- 0: No attempt at problem solving

Overall Score:
Calculate the overall score based on the candidate's complete interview performance.

Consider:
- technical knowledge
- correctness of answers
- communication quality
- reasoning and problem solving
- consistency across the interview

IMPORTANT:
- Judge only what the candidate actually demonstrated.
- Do not assume knowledge that the candidate did not demonstrate.
- Do not give a high score simply because the candidate completed the interview.
- If the candidate gives a partially correct answer, give partial credit.
- If the candidate gives a correct but short answer, give appropriate partial or full credit depending on the question.
- If the candidate says "I don't know", that question should receive very low credit.
- Do not automatically give every category 0 unless the candidate demonstrated essentially no meaningful ability across the interview.
- Scores must reflect the quality of the actual answers.

strengths:
Return exactly 3 short strings.

weaknesses:
Return exactly 3 short strings.

suggestions:
Return exactly 3 short strings.

feedback:
Return one concise paragraph explaining the candidate's overall performance.

Return ONLY valid JSON.
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});