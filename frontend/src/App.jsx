import { useState } from "react";
import "./App.css";

function App() {
  const [started, setStarted] = useState(false);

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">
          Interview<span>AI</span>
        </div>

        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#about">About</a>
        </div>
      </nav>

      {!started ? (
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
            onClick={() => setStarted(true)}
          >
            Start Interview →
          </button>

          <div className="features" id="features">
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>AI Interviewer</h3>
              <p>
                Get interviewed by an AI that asks relevant questions.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Adaptive Questions</h3>
              <p>
                Questions can change based on your previous answers.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Performance Report</h3>
              <p>
                Get feedback about your strengths and weaknesses.
              </p>
            </div>
          </div>
        </main>
      ) : (
        <main className="setup">
          <div className="setup-card">
            <div className="badge">
              INTERVIEW SETUP
            </div>

            <h2>Let's prepare your interview</h2>

            <p>
              Tell us a little about the interview you want to practice.
            </p>

            <label>Job Role</label>
            <input
              type="text"
              placeholder="e.g. Frontend Developer"
            />

            <label>Experience Level</label>
            <select>
              <option>Fresher</option>
              <option>0-2 Years</option>
              <option>2-5 Years</option>
              <option>5+ Years</option>
            </select>

            <label>Interview Type</label>
            <select>
              <option>Technical</option>
              <option>Behavioral</option>
              <option>Mixed</option>
            </select>

            <button className="start-btn">
              Begin Interview →
            </button>

            <button
              className="back-btn"
              onClick={() => setStarted(false)}
            >
              ← Back
            </button>
          </div>
        </main>
      )}
    </div>
  );
}

export default App;