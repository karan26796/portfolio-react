import React, { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import ScrollReveal from "../components/ScrollReveal";
import usePageSEO from "../utils/usePageSEO";
import "../styles/About.scss";

interface ExperienceItem {
  id: string;
  period: string;
  company: string;
  role: string;
  location?: string;
  description: string;
  achievements?: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: "keka",
    period: "Keka HR · Mar 2024 – Present",
    company: "Keka HR",
    role: "Senior Product Designer",
    location: "Hyderabad, Telangana, India · On-site",
    description:
      "Building the rewards and recognition suite for companies to appreciate, retain, and engage their employees.",
    achievements: [
      "Partnering with engineering, PM, and GTM teams to build design led roadmaps.",
      "Designing an AI-powered HR Business Partner (HRBP) copilot aimed at enhancing employee engagement across the complete employee lifecycle.",
      "Redesigned peer wish feature, increasing engagement 5x (5k → 15k users, 31k → 116k impressions).",
      "Championing AI adoption via workshops and tool integration (Claude, Figma Make, NotebookLM) to enhance team productivity.",
    ],
  },
  {
    id: "immertive",
    period: "Immertive · Jul 2023 – Feb 2024",
    company: "Immertive",
    role: "XR Designer",
    location: "On-site",
    description:
      "Designed immersive XR spatial experiences and interactive 3D prototypes for enterprise clients.",
  },
  {
    id: "looppanel",
    period: "Looppanel · Jan 2022 – Sep 2022",
    company: "Looppanel",
    role: "Lead Product Designer",
    location: "Remote",
    description:
      "As a first design hire I partnered with founders on product strategy; conducted user research to reduce time-to-insights by 5x through rapid prototyping and testing with users.",
    achievements: [
      "Designed core product workflows like zoom notetaker, project highlights and summaries, to help researchers extract insights faster; validated all features through detailed prototypes before engineering handoff.",
      "Led GTM efforts through direct customer outreach, blog content, and community engagement across Slack, LinkedIn, and Facebook groups.",
    ],
  },
  {
    id: "obvious",
    period: "Obvious · May 2021 – Sep 2021",
    company: "Obvious",
    role: "Product Designer",
    location: "Bengaluru, Karnataka, India · Remote",
    description:
      "Designed features like leave tracking, auto approval, and geography-dependent leave calendar for Pause, a B2B leave management tool used by 50+ clients globally; achieved #3 Product of the Day on Product Hunt.",
    achievements: [
      "Redesigned 3+ modules for Grab-Singapore Merchant Dashboard used by 1M+ merchants.",
    ],
  },
  {
    id: "aphelia",
    period: "Aphelia Innovations · Mar 2020 – Apr 2021",
    company: "Aphelia Innovations",
    role: "Lead Product Designer",
    location: "New Delhi, Delhi, India · Remote",
    description:
      "Led design and launch of 5+ products and MVPs in healthtech and developer experience sectors.",
    achievements: [
      "Collaborated with dev and PM teams to create product roadmaps.",
      "Grew the design team to 4 and introduced frameworks to streamline project pipelines.",
    ],
  },
  {
    id: "guesthouser",
    period: "GuestHouser · Jun 2019 – Feb 2020",
    company: "GuestHouser",
    role: "User Experience Designer",
    location: "Gurugram, Haryana, India",
    description:
      "Redesigned the booking and housekeeping apps used by ~100k people.",
    achievements: [
      "Created and launched a Design System for internal tools and user facing apps.",
    ],
  },
  {
    id: "chaptervitamins",
    period: "Chapter Vitamins · Jun 2018 – May 2019",
    company: "Chapter Vitamins",
    role: "Android Developer",
    location: "Gurugram, Haryana, India",
    description:
      "Developed engagement modules for employee training apps for clients like Bajaj, TCS, Wipro etc.",
    achievements: [
      "Worked closely with product managers and devs to ship new features like gamification and interactive quizzes.",
    ],
  },
  {
    id: "fof",
    period: "Friends of Figma, Delhi · 2019 – 2024",
    company: "Friends of Figma, Delhi",
    role: "Community Lead & Figma Trainer",
    location: "Delhi NCR, India",
    description:
      "Led the official Figma community chapter for 5 years, organizing workshops, corporate training, and design system events.",
    achievements: [
      "Trained and mentored 10,000+ designers across hands-on Figma workshops.",
      "Built an active community of 5,000+ designers and design leaders.",
    ],
  },
  {
    id: "nid",
    period: "National Institute of Design (NID) · 2017 – 2019",
    company: "National Institute of Design (NID)",
    role: "Master's in Design (M.Des)",
    location: "Ahmedabad, India",
    description:
      "Specialized in Industrial & Interaction Design. Focused on behavioral hardware design and multi-sensory emotional regulation.",
    achievements: [
      "Master's Thesis: Mindful Hardware tackling binge-behavior through multi-sensory emotional regulation.",
      "Graduated with top honors in design research and functional prototyping.",
    ],
  },
];

const About: React.FC = () => {
  usePageSEO({
    title: "About Karan Kapoor | Senior Product Designer & Figma Trainer",
    description:
      "Learn about Karan Kapoor, Senior Product Designer at Keka HR with 8+ years experience in B2B SaaS, Design Systems, and UX Research.",
    canonicalUrl: "https://kadankapoor.com/about",
  });

  const [expandedId, setExpandedId] = useState<string | null>("keka");

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="about-page">
      {/* ABOUT SECTION */}
      <section className="about-section">
        <ScrollReveal>
          <h2>About</h2>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="about-content">
            <div className="portrait-frame">
              <img
                src="/gallery/profile.webp"
                alt="Karan Kapoor"
                className="portrait-img"
              />
            </div>
            <p className="bio-lead">
              I'm an AI-native product designer, design advisor, and 2x founding designer with 8+ years of experience helping businesses scale and build brand & product systems.
            </p>
            <p>
              Currently, I'm a Senior Product Designer at Keka HR, where I lead design for engagement and reward systems supporting 2.2M+ employees globally. Previously, I was founding designer at Looppanel building qualitative research tooling.
            </p>
            <p>
              My philosophy for design has always remained the same regardless of medium or domain—problem solving at its core with uncompromising craft and velocity.
            </p>
            <p>
              With a background in Engineering (B.Tech) and a Master's in Design from NID Ahmedabad, I bring a unique technical perspective to systems thinking, design tokens, and user experience.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* EXPERIENCE SECTION */}
      <section className="experience-section">
        <ScrollReveal>
          <h2>Experience</h2>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="experience-faq-list">
            {experiences.map((exp) => {
              const isExpanded = expandedId === exp.id;
              return (
                <div
                  key={exp.id}
                  className={`exp-item ${isExpanded ? "open" : ""}`}
                >
                  <div
                    className="exp-question"
                    onClick={() => toggleExpand(exp.id)}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isExpanded}
                  >
                    <div className="exp-titles">
                      <h4 className="company-name">{exp.period}</h4>
                      <p className="role-title">{exp.role}</p>
                    </div>

                    <div className={`faq-icon-circle ${isExpanded ? "open" : ""}`}>
                      <CaretDown size={20} weight="bold" />
                    </div>
                  </div>

                  <div className={`exp-answer ${isExpanded ? "open" : "closed"}`}>
                    <p className="exp-desc">{exp.description}</p>
                    {exp.achievements && (
                      <ul className="exp-achievements">
                        {exp.achievements.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default About;
