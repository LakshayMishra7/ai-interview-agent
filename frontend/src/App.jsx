import { useState } from "react";
import "./App.css";

const questions = [
  {
    question:
      "Can you explain the difference between let, const, and var in JavaScript?",
  },
  {
    question:
      "What is the difference between == and === in JavaScript?",
  },
  {
    question:
      "What is the Virtual DOM in React and why is it useful?",
  },
  {
    question:
      "What is the difference between props and state in React?",
  },
  {
    question:
      "How would you optimize the performance of a React application?",
  },
];

function App() {
  const [page, setPage] = useState("home");

  const [candidate, setCandidate] = useState({
    name: "",
    role: "",
    experience: "Fresher",
    skills: "",
    interviewType: "Technical",
  });

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answer, setAnswer] = useState("");

  const [answers, setAnswers] = useState([]);
  const [question, setQuestion] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCandidate((previous) => ({
      ...previous,
      [name]: value,
    }));
  };
  // const testInterviewAPI = async () => {
  //   try {
  //     const response = await fetch(
  //       "http://localhost:5000/api/interview/question",
  //       {
  //         method: "POST",

  //         headers: {
  //           "Content-Type": "application/json",
  //         },

  //         body: JSON.stringify({
  //           name: candidate.name,
  //           role: candidate.role,
  //           experience: candidate.experience,
  //           skills: candidate.skills,
  //           previousAnswers: [],
  //         }),
  //       }
  //     );

  //     const data = await response.json();

  //     console.log(data);
  //   } catch (error) {
  //     console.error("Interview API failed:", error);
  //   }
  // };

 const startInterview = async (e) => {
  e.preventDefault();

  if (!candidate.name.trim()) {
    alert("Please enter your name.");
    return;
  }

  if (!candidate.role.trim()) {
    alert("Please enter the job role.");
    return;
  }

  if (!candidate.skills.trim()) {
    alert("Please enter your skills.");
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:5000/api/interview/question",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: candidate.name,
          role: candidate.role,
          experience: candidate.experience,
          skills: candidate.skills,
          previousAnswers: [],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to generate question");
    }

    setQuestion(data.question);

    setCurrentQuestion(0);
    setAnswers([]);
    setAnswer("");

    setPage("interview");

  } catch (error) {
    console.error("Interview start failed:", error);

    alert(
      "Unable to generate the interview question. Please try again."
    );
  }
};

  const submitAnswer = () => {
    if (!answer.trim()) {
      alert("Please enter your answer.");
      return;
    }

    const newAnswer = {
      question: questions[currentQuestion].question,
      answer: answer,
    };

    setAnswers((previous) => [...previous, newAnswer]);

    setAnswer("");

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((previous) => previous + 1);
    } else {
      setPage("result");
    }
  };

  return (
    <div className="app">

      {/* NAVBAR */}

      <nav className="navbar">

        <div className="logo">
          Interview<span>AI</span>
        </div>

        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#about">About</a>
        </div>

      </nav>


      {/* HOME */}

      {page === "home" && (

        <main className="hero">

          <div className="badge">
            AI-POWERED INTERVIEW AGENT
          </div>

          <h1>
            Your Personal
            <span> AI Interviewer</span>
          </h1>

          <p>
            Practice realistic technical and behavioral interviews
            with an intelligent AI interviewer that adapts to your answers.
          </p>

          <button
            className="start-btn"
            onClick={() => setPage("setup")}
          >
            Start Interview →
          </button>
          {/* <button onClick={testInterviewAPI}>
            Test Interview API
          </button> */}

          <div className="features" id="features">

            <div className="feature-card">

              <div className="feature-icon">
                🤖
              </div>

              <h3>
                AI Interviewer
              </h3>

              <p>
                Get interviewed by an AI that asks relevant questions.
              </p>

            </div>


            <div className="feature-card">

              <div className="feature-icon">
                🎯
              </div>

              <h3>
                Adaptive Questions
              </h3>

              <p>
                Questions can change based on your previous answers.
              </p>

            </div>


            <div className="feature-card">

              <div className="feature-icon">
                📊
              </div>

              <h3>
                Performance Report
              </h3>

              <p>
                Get feedback about your strengths and weaknesses.
              </p>

            </div>

          </div>

        </main>

      )}


      {/* SETUP */}

      {page === "setup" && (

        <main className="setup">

          <form
            className="setup-card"
            onSubmit={startInterview}
          >

            <div className="badge">
              INTERVIEW SETUP
            </div>

            <h2>
              Let's prepare your interview
            </h2>

            <p>
              Tell us a little about the interview you want to practice.
            </p>


            <label htmlFor="name">
              Your Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="e.g. Lakshay"
              value={candidate.name}
              onChange={handleChange}
            />


            <label htmlFor="role">
              Job Role
            </label>

            <input
              id="role"
              name="role"
              type="text"
              placeholder="e.g. Frontend Developer"
              value={candidate.role}
              onChange={handleChange}
            />


            <label htmlFor="experience">
              Experience Level
            </label>

            <select
              id="experience"
              name="experience"
              value={candidate.experience}
              onChange={handleChange}
            >

              <option>
                Fresher
              </option>

              <option>
                0-2 Years
              </option>

              <option>
                2-5 Years
              </option>

              <option>
                5+ Years
              </option>

            </select>


            <label htmlFor="skills">
              Skills
            </label>

            <input
              id="skills"
              name="skills"
              type="text"
              placeholder="e.g. JavaScript, React, Node.js"
              value={candidate.skills}
              onChange={handleChange}
            />


            <label htmlFor="interviewType">
              Interview Type
            </label>

            <select
              id="interviewType"
              name="interviewType"
              value={candidate.interviewType}
              onChange={handleChange}
            >

              <option>
                Technical
              </option>

              <option>
                Behavioral
              </option>

              <option>
                Mixed
              </option>

            </select>


            <button
              type="submit"
              className="start-btn"
            >
              Begin Interview →
            </button>


            <button
              type="button"
              className="back-btn"
              onClick={() => setPage("home")}
            >
              ← Back
            </button>

          </form>

        </main>

      )}


      {/* INTERVIEW */}

      {page === "interview" && (

        <main className="interview-page">

          <div className="interview-header">

            <div>

              <div className="logo">
                Interview<span>AI</span>
              </div>

              <p>
                {candidate.role} Interview
              </p>

            </div>


            <div className="question-count">

              Question {currentQuestion + 1} / {questions.length}

            </div>

          </div>


          <div className="interview-card">

            <div className="ai-label">
              🤖 AI INTERVIEWER
            </div>


            <h2>
              Hello {candidate.name}! 👋
            </h2>


            <p className="question">
               {question}
            </p>


            <label htmlFor="answer">
              Your Answer
            </label>


            <textarea
              id="answer"
              placeholder="Type your answer here..."
              rows="7"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />


            <button
              className="start-btn"
              onClick={submitAnswer}
            >

              {currentQuestion === questions.length - 1
                ? "Finish Interview →"
                : "Submit Answer →"}

            </button>

          </div>

        </main>

      )}


      {/* RESULT */}

      {page === "result" && (

        <main className="result-page">

          <div className="result-card">

            <div className="badge">
              INTERVIEW COMPLETED
            </div>

            <h1>
              Great job, {candidate.name}! 🎉
            </h1>

            <p>
              You have completed your interview.
            </p>


            <div className="result-summary">

              <div>
                <span>
                  Questions
                </span>

                <strong>
                  {questions.length}
                </strong>
              </div>


              <div>
                <span>
                  Answered
                </span>

                <strong>
                  {answers.length}
                </strong>
              </div>

            </div>


            <h3>
              Your Answers
            </h3>


            <div className="answer-list">

              {answers.map((item, index) => (

                <div
                  className="answer-item"
                  key={index}
                >

                  <h4>
                    Question {index + 1}
                  </h4>

                  <p className="result-question">
                    {item.question}
                  </p>

                  <p className="user-answer">
                    {item.answer}
                  </p>

                </div>

              ))}

            </div>


            <button
              className="start-btn"
              onClick={() => setPage("home")}
            >
              Back to Home
            </button>

          </div>

        </main>

      )}

    </div>
  );
}

export default App;