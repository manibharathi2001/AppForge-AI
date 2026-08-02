import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import { ToastContext } from '../context/ToastContext.jsx';
import FeatureCard from '../components/FeatureCard.jsx';
import { createProject } from '../services/projectService.js';
import '../styles/landing.css';

function LandingPage() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const [prompt, setPrompt] = useState('Build me a portfolio website with dark theme and project gallery...');

  const handleStartBuilding = async () => {
    if (!prompt.trim()) {
      showToast('Please enter a project idea to get started.', 'error');
      return;
    }

    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const project = await createProject(prompt.trim());
      navigate(`/builder/${project._id}?prompt=${encodeURIComponent(prompt.trim())}`);
    } catch (error) {
      showToast('Failed to create your project. Please try again.', 'error');
    }
  };

  return (
    <div className="landing-page">
      <nav className="landing-nav">
        <span className="landing-logo">
          <span className="landing-logo-mark">&lt;/&gt;</span> AppForge-AI
        </span>
        <div className="landing-nav-right">
          <button className="landing-nav-login" onClick={() => navigate('/login')}>
            Log In
          </button>
          <button className="landing-nav-cta" onClick={() => navigate('/login')}>
            Get Started
          </button>
        </div>
      </nav>

      <section className="landing-hero">
        <div className="landing-hero-content">
          <span className="landing-badge">AppForge-AI</span>
          <h1 className="landing-hero-title">
            Turn Your Ideas Into<br />
            <span className="landing-hero-accent">Working Web Apps</span>
          </h1>
          <p className="landing-hero-subtitle">
            Describe what you want to build in plain English. AppForge-AI generates
            clean, production-ready code instantly.
          </p>

          <div className="landing-prompt-box">
            <textarea
              className="landing-prompt-input"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Build me a portfolio website with dark theme and project gallery..."
            />
            <button className="landing-prompt-btn" onClick={handleStartBuilding}>
              Start Building
            </button>
          </div>

          <div className="landing-stats">
            <div className="landing-stat">
              <span className="landing-stat-number">100%</span>
              <span className="landing-stat-label">Free to Start</span>
            </div>
            <div className="landing-stat-divider"></div>
            <div className="landing-stat">
              <span className="landing-stat-number">HTML</span>
              <span className="landing-stat-label">Clean Output</span>
            </div>
            <div className="landing-stat-divider"></div>
            <div className="landing-stat">
              <span className="landing-stat-number">AI</span>
              <span className="landing-stat-label">Powered by Gemini</span>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-features">
        <h2 className="landing-section-title">How It Works</h2>
        <p className="landing-section-subtitle">Three simple steps from idea to working app</p>
        <div className="landing-features-grid">
          <FeatureCard
            icon="01"
            title="Describe Your Vision"
            description="Type what you want to build in plain English. Our AI understands layouts, features, and design preferences."
          />
          <FeatureCard
            icon="02"
            title="Watch It Build"
            description="See your app come to life with a live preview. The AI generates clean HTML, CSS, and JavaScript in real-time."
          />
          <FeatureCard
            icon="03"
            title="Refine and Export"
            description="Chat with AI to iterate on your design. Download the complete code and deploy it anywhere."
          />
        </div>
      </section>

      <footer className="landing-footer">
        <div className="landing-footer-content">
          <span className="landing-footer-logo">
            <span className="landing-logo-mark">&lt;/&gt;</span> AppForge-AI
          </span>
          <p className="landing-footer-text">Built By Mani Bharathi. Transform Ideas Into Reality.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;