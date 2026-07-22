import React from "react";
import { Users, Target, Eye, GraduationCap, Heart, Code2 } from "lucide-react";

export default function AboutPage() {
  const teamMembers = [
    { name: "Yan Sovanpisoth", role: "Computer Science Dept", avatar: "YS", bio: "Frontend Lead & UI Architect" },
    { name: "Chom Devid", role: "Computer Science Dept", avatar: "CD", bio: "Backend Engineer & Data Modeling" },
    { name: "Siv Kimleng", role: "Telecom & Networking Dept", avatar: "SK", bio: "Infrastructure & API Integration" },
    { name: "Kong Sothearith", role: "Computer Science Dept", avatar: "KS", bio: "UX Specialist & Reader UI" },
    { name: "Eav SophalVeha", role: "Telecom & Networking Dept", avatar: "EV", bio: "State Management & QA Lead" }
  ];

  return (
    <div className="about-page-container">
      {/* Hero */}
      <section className="about-hero glass-panel">
        <div className="about-hero-content">
          <span className="cadt-badge">
            <GraduationCap size={16} /> CAMBODIA ACADEMY OF DIGITAL TECHNOLOGY
          </span>
          <h1>ABOUT BOOKRARY</h1>
          <p>
            Welcome to <strong>Bookrary</strong>, your digital space for discovering, sharing, and enjoying books anytime, anywhere.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision-grid">
        <div className="mv-card glass-panel">
          <Target className="mv-icon target-icon" size={32} />
          <h2>OUR MISSION</h2>
          <p>
            Our mission is to make reading more accessible by connecting readers with books in a simple, responsive, and modern web environment.
          </p>
        </div>

        <div className="mv-card glass-panel">
          <Eye className="mv-icon eye-icon" size={32} />
          <h2>OUR VISION</h2>
          <p>
            We believe that knowledge should be available for everyone. <strong>Bookrary</strong> aims to create a community where readers and learners can grow together.
          </p>
        </div>
      </section>

      {/* Story section */}
      <section className="story-section glass-panel">
        <h2>OUR STORY</h2>
        <p>
          We are <strong>Cambodia Academy of Digital Technology (CADT)</strong> students. Our team members bring together talent from both the 
          <strong> Computer Science</strong> and <strong>Telecommunication & Networking</strong> departments.
        </p>
        <p>
          What started as our very first HTML + CSS web-design project with friends has now evolved into a full-stack web application powered by 
          <strong> React.js</strong> and <strong>Express.js</strong>. We invite you to explore <strong>Bookrary</strong> and keep the joy of reading alive—together!
        </p>
      </section>

      {/* Team Showcase */}
      <section id="team" className="team-section">
        <div className="team-header">
          <Users size={28} className="team-icon" />
          <h2>MEET OUR CREATOR TEAM</h2>
        </div>

        <div className="team-grid">
          {teamMembers.map((member) => (
            <div key={member.name} className="member-card glass-panel">
              <div className="member-avatar">{member.avatar}</div>
              <h3 className="member-name">{member.name}</h3>
              <span className="member-role">{member.role}</span>
              <p className="member-bio">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        .about-page-container {
          max-width: 1200px;
          margin: 40px auto 0;
          padding: 0 24px;
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .about-hero {
          padding: 50px 36px;
          text-align: center;
          border-radius: var(--radius-lg);
        }

        .cadt-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          background: rgba(229, 9, 20, 0.15);
          border: 1px solid var(--border-accent);
          color: var(--accent-red);
          font-size: 0.8rem;
          font-weight: 800;
          border-radius: 20px;
          margin-bottom: 16px;
        }

        .about-hero h1 {
          font-family: var(--font-logo);
          font-size: 3rem;
          letter-spacing: 1px;
          margin-bottom: 10px;
        }

        .about-hero p {
          font-size: 1.1rem;
          color: var(--text-muted);
          max-width: 700px;
          margin: 0 auto;
        }

        .mission-vision-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .mv-card {
          padding: 32px;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .target-icon { color: var(--accent-red); }
        .eye-icon { color: var(--accent-gold); }

        .mv-card h2 {
          font-family: var(--font-heading);
          font-size: 1.3rem;
          font-weight: 800;
        }

        .mv-card p {
          color: var(--text-muted);
          line-height: 1.6;
          font-size: 0.95rem;
        }

        .story-section {
          padding: 36px;
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .story-section h2 {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--accent-red);
        }

        .story-section p {
          color: var(--text-muted);
          line-height: 1.7;
        }

        .team-section {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .team-header {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .team-header h2 {
          font-family: var(--font-heading);
          font-size: 1.6rem;
          font-weight: 800;
        }

        .team-icon { color: var(--accent-red); }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
          gap: 20px;
        }

        .member-card {
          padding: 24px;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 10px;
          transition: transform var(--transition-fast);
        }

        .member-card:hover {
          transform: translateY(-5px);
          border-color: var(--border-accent);
        }

        .member-avatar {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent-red), var(--accent-purple));
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 1.2rem;
          box-shadow: 0 4px 15px rgba(229, 9, 20, 0.4);
        }

        .member-name {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 800;
        }

        .member-role {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-accent);
        }

        .member-bio {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        @media (max-width: 768px) {
          .mission-vision-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
