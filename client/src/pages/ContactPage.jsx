import React, { useState } from "react";
import { Mail, Send, CheckCircle, AlertCircle, MapPin, Phone, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message })
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        setSuccessMsg("Thank you! Your message has been sent to the Bookrary team.");
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        setErrorMsg(data.error || "Failed to send message");
      }
    } catch (err) {
      setLoading(false);
      setErrorMsg("Network error: Could not reach Bookrary contact server.");
    }
  };

  return (
    <div className="contact-page-container">
      <div className="contact-header glass-panel">
        <h1>📬 GET IN TOUCH WITH US</h1>
        <p>Have questions, feedback, or collaboration ideas? Reach out to the CADT Bookrary team!</p>
      </div>

      <div className="contact-body-grid">
        {/* Info Column */}
        <div className="contact-info-card glass-panel">
          <h2>Contact Information</h2>
          <p className="info-subtitle">We would love to hear from you!</p>

          <div className="info-list">
            <div className="info-item">
              <MapPin size={20} className="info-icon" />
              <div>
                <h4>Location</h4>
                <p>Cambodia Academy of Digital Technology (CADT), Phnom Penh, Cambodia</p>
              </div>
            </div>

            <div className="info-item">
              <Mail size={20} className="info-icon" />
              <div>
                <h4>Email Us</h4>
                <p>contact@bookrary.cadt.edu.kh</p>
              </div>
            </div>

            <div className="info-item">
              <Phone size={20} className="info-icon" />
              <div>
                <h4>Phone / Support</h4>
                <p>+855 23 999 111</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="contact-form-card glass-panel">
          <h2>Send Us a Message</h2>

          {successMsg && (
            <div className="alert-banner success">
              <CheckCircle size={18} /> {successMsg}
            </div>
          )}

          {errorMsg && (
            <div className="alert-banner error">
              <AlertCircle size={18} /> {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-field">
                <label>Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. Sok Dara"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-field">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="your.email@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-field">
              <label>Subject</label>
              <input
                type="text"
                placeholder="e.g. Feature Suggestion or Collaboration"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            <div className="form-field">
              <label>Message</label>
              <textarea
                rows="5"
                placeholder="Write your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>

            <button type="submit" disabled={loading} className="btn-primary submit-btn">
              <Send size={16} /> {loading ? "Sending..." : "SEND MESSAGE"}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .contact-page-container {
          max-width: 1200px;
          margin: 40px auto 0;
          padding: 0 24px;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .contact-header {
          padding: 36px;
          border-radius: var(--radius-lg);
        }

        .contact-header h1 {
          font-family: var(--font-heading);
          font-size: 2.2rem;
          font-weight: 800;
          margin-bottom: 6px;
        }

        .contact-header p {
          color: var(--text-muted);
        }

        .contact-body-grid {
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: 30px;
        }

        .contact-info-card, .contact-form-card {
          padding: 32px;
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .contact-info-card h2, .contact-form-card h2 {
          font-family: var(--font-heading);
          font-size: 1.4rem;
          font-weight: 800;
        }

        .info-subtitle {
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .info-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-top: 10px;
        }

        .info-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }

        .info-icon {
          color: var(--accent-red);
          margin-top: 2px;
        }

        .info-item h4 {
          font-size: 0.95rem;
          font-weight: 700;
        }

        .info-item p {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.4;
        }

        .alert-banner {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
        }

        .alert-banner.success {
          background: rgba(34, 197, 94, 0.15);
          color: #4ade80;
          border: 1px solid rgba(34, 197, 94, 0.3);
        }

        .alert-banner.error {
          background: rgba(220, 38, 38, 0.15);
          color: #f87171;
          border: 1px solid rgba(220, 38, 38, 0.3);
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-field label {
          font-size: 0.85rem;
          font-weight: 600;
        }

        .form-field input, .form-field textarea {
          padding: 10px 14px;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          color: var(--text-main);
          outline: none;
          font-family: inherit;
        }

        .form-field input:focus, .form-field textarea:focus {
          border-color: var(--accent-red);
        }

        .submit-btn {
          align-self: flex-start;
          padding: 12px 24px;
          margin-top: 8px;
        }

        @media (max-width: 850px) {
          .contact-body-grid {
            grid-template-columns: 1fr;
          }
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
