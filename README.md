# 🤖 InterviewAI

An AI-powered mock interview platform that conducts personalized technical interviews and evaluates candidate performance using Google Gemini.

## 🚀 Live Demo

https://ai-interview-agent-fmg9.onrender.com

## 📌 About the Project

InterviewAI simulates a real technical interview based on the candidate's name, job role, experience level, and skills.

Instead of using a fixed list of questions, the application uses Gemini to dynamically generate interview questions. The next question can be based on the candidate's previous answers, making the interview more interactive and adaptive.

After completing 10 questions, Gemini evaluates the candidate's performance and generates scores and personalized feedback.

## ✨ Features

- 🤖 AI-generated interview questions
- 🔄 Adaptive follow-up questions
- 👤 Candidate-specific interviews
- 📝 Answer tracking
- 🔢 10-question interview system
- 📊 AI-powered interview evaluation
- 💯 Technical, communication, and problem-solving scores
- 💪 Strengths identification
- ⚠️ Weakness identification
- 💡 Personalized improvement suggestions
- 📄 Overall AI feedback
- 📱 Responsive interface
- 🌐 Deployed application

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- JavaScript
- HTML
- CSS

### Backend

- Node.js
- Express.js

### AI

- Google Gemini API

### Deployment

- Render

## 🏗️ Architecture

```text
Candidate
    ↓
React Frontend
    ↓
Render Backend
    ↓
Google Gemini API
    ↓
AI Generated Question
    ↓
Candidate Answer
    ↓
Adaptive Next Question
    ↓
10 Questions
    ↓
AI Evaluation
    ↓
Result Dashboard
