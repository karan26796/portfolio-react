import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "@phosphor-icons/react";
import ScrollReveal, { scrollRevealStagger } from "./ScrollReveal";
import "../styles/CompanyWorkList.scss";

export interface ProjectItemCompany {
  id: string;
  title: string;
  description: string;
  impact?: string;
  screenshots: [string, string]; // Exactly 2 screenshots per project!
  tags: string[];
  hasCaseStudy: boolean;
}

export interface CompanyGroup {
  companyId: string;
  companyName: string;
  logo: string;
  role: string;
  period: string;
  location: string;
  description: string;
  projects: ProjectItemCompany[];
}

export const defaultCompanyGroups: CompanyGroup[] = [
  {
    companyId: "keka",
    companyName: "Keka HR",
    logo: "/gallery/profile.webp",
    role: "Sr. Product Designer at Keka HR",
    period: "2023 – Present • Hyderabad, India",
    location: "Hyderabad, India",
    description:
      "Led design for Rewards & Recognition, HR Helpdesk, and Surveys across enterprise SaaS products used by 2.2M+ people.",
    projects: [
      {
        id: "11",
        title: "Redesigned Keka's Holiday Calendar for Multi-Location Enterprise Teams",
        description:
          "Redesigned Keka's holiday calendar framework so admins assign holidays team by team instead of a single fixed calendar.",
        impact: "Streamlined regional holiday setup and automated leave logic across enterprise accounts.",
        screenshots: [
          "/project-imgs/holiday-calendar/thumb.webp",
          "/project-imgs/holiday-calendar/Holiday-calendar-new.webp",
        ],
        tags: ["Product Design", "Enterprise UX", "Systems Thinking"],
        hasCaseStudy: true,
      },
      {
        id: "9",
        title: "Keka Award Programs: From Gift Catalog to Governed Workflow",
        description:
          "Rebuilt Keka's award programs into a governed nomination workflow to unblock enterprise deals.",
        impact: "Unblocked enterprise deals stalled at evaluation; beta programs reached announcement phase.",
        screenshots: [
          "/project-imgs/award program/Thumb-certi-spot.webp",
          "/project-imgs/awards-revamp/dynamicCTAs.webp",
        ],
        tags: ["Product Design", "Enterprise UX", "Workflow Automation"],
        hasCaseStudy: true,
      },
      {
        id: "6",
        title: "Continuous Rewards Platform Natively Integrated into HRMS",
        description:
          "Designed a unified Continuous Rewards platform natively integrated into Keka's HRMS, driving a new revenue stream.",
        impact: "Directly contributed to securing 10+ enterprise accounts and $500K+ ARR.",
        screenshots: [
          "/project-imgs/continuous rewards/Thumb-2.webp",
          "/project-imgs/continuous rewards/integrations.webp",
        ],
        tags: ["Systems Thinking", "Revenue Growth", "B2B SaaS"],
        hasCaseStudy: true,
      },
      {
        id: "7",
        title: "Keka Wall Wishes: Peer to Peer Workplace Celebrations",
        description:
          "Scaled weekly engagement from 15k to 100k users by adding delight when people wish each other on special days.",
        impact: "5x increase in employee engagement and 3x adoption growth.",
        screenshots: [
          "/project-imgs/kekawish/thumb-cr.webp",
          "/project-imgs/kekawish/wishesOnWall.webp",
        ],
        tags: ["Product Design", "Design Strategy", "Micro-Interactions"],
        hasCaseStudy: true,
      },
    ],
  },
  {
    companyId: "looppanel",
    companyName: "Looppanel",
    logo: "/gallery/profile.webp",
    role: "Founding Product Designer at Looppanel",
    period: "2022 • Remote",
    location: "Remote",
    description:
      "Founding designer building qualitative research automation tooling for UX Researchers and Product Managers.",
    projects: [
      {
        id: "1",
        title: "Zoom Meeting Bot for Automated UX Research Notes",
        description:
          "Designed a note-taking meeting bot for UX Researchers to get transcript, notes, and highlights in one place.",
        impact: "Reduced synthesis time by 5x through workflow automation.",
        screenshots: [
          "/project-imgs/loop-note/loop-note.gif",
          "/project-imgs/loop-note/loop-note-notes.webp",
        ],
        tags: ["AI & Automation", "Productivity", "Research Ops"],
        hasCaseStudy: true,
      },
      {
        id: "2",
        title: "Interview Highlights View & Synthesis Workspace",
        description:
          "Redesigned the highlights view for UX Researchers to synthesize research data into actionable insights.",
        impact: "Significantly improved insight discovery velocity for cross-functional teams.",
        screenshots: [
          "/project-imgs/looppanel-insights/insight-thumb.gif",
          "/project-imgs/looppanel-insights/new-insights.gif",
        ],
        tags: ["Data Analysis", "Research Ops", "UX Synthesis"],
        hasCaseStudy: true,
      },
      {
        id: "5",
        title: "Information Architecture Revamp & Feature Discovery",
        description:
          "Redesigned the information architecture of Looppanel to improve feature discovery and data organization.",
        impact: "Increased discoverability of features and customer satisfaction.",
        screenshots: [
          "/project-imgs/loop-research/loop-research.gif",
          "/project-imgs/loop-research/thumb.webp",
        ],
        tags: ["Product Strategy", "Design Research", "Information Architecture"],
        hasCaseStudy: true,
      },
    ],
  },
  {
    companyId: "personal",
    companyName: "Personal & Independent Work",
    logo: "/gallery/profile.webp",
    role: "Independent Designer & Builder",
    period: "2024 – 2026",
    location: "India",
    description:
      "0-to-1 concepts, mobile applications, and hardware behavioral design prototypes.",
    projects: [
      {
        id: "10",
        title: "Interconnect: Professional Networking for Gated Societies",
        description:
          "Developed & designed an app to help people in gated communities post jobs and get referrals for open roles.",
        impact: "0-to-1 product design and functional React Native app build.",
        screenshots: [
          "/project-imgs/interconnect-thumb.webp",
          "/project-imgs/indie-finds/Container.png",
        ],
        tags: ["0-to-1 Product", "Mobile Design", "React Native"],
        hasCaseStudy: false,
      },
      {
        id: "4",
        title: "Mindful Hardware: Tackling Binge Behavior (NID Master's Project)",
        description:
          "Designed a multi-sensory hardware device to help users regain control over binge-behavior through mindful habit-forming.",
        impact: "Developed a functional prototype for emotional regulation.",
        screenshots: [
          "/project-imgs/binge-eating/binge.gif",
          "/project-imgs/binge-eating/boree.webp",
        ],
        tags: ["IoT", "Behavioral Design", "Industrial Design"],
        hasCaseStudy: true,
      },
    ],
  },
];

interface CompanyWorkListProps {
  groups?: CompanyGroup[];
}

const CompanyWorkList: React.FC<CompanyWorkListProps> = ({
  groups = defaultCompanyGroups,
}) => {
  const navigate = useNavigate();

  return (
    <div className="company-work-list-container">
      {groups.map((group) => (
        <div key={group.companyId} className="company-block">
          <ScrollReveal>
            <div className="company-header-card">
              <div className="company-title-row">
                <img
                  src={group.logo}
                  alt={group.companyName}
                  className="company-logo"
                />
                <div className="company-meta">
                  <h3 className="role-title">{group.role}</h3>
                  <span className="period-location">{group.period}</span>
                </div>
              </div>
              <p className="company-desc">{group.description}</p>
            </div>
          </ScrollReveal>

          <div className="company-projects-list">
            {group.projects.map((proj, idx) => (
              <ScrollReveal key={proj.id} delay={scrollRevealStagger(idx, 80)}>
                <div className="project-item-card">
                  <div className="project-header-info">
                    <h4 className="project-title">{proj.title}</h4>
                    <p className="project-desc">
                      {proj.description}{" "}
                      {proj.impact && (
                        <>
                          <br />
                          <strong className="impact-label">Impact: </strong>
                          {proj.impact}
                        </>
                      )}
                    </p>
                  </div>

                  {/* 2 Screenshots in 1 Row */}
                  <div className="two-screenshot-row">
                    <div
                      className="screenshot-frame"
                      onClick={() =>
                        proj.hasCaseStudy && navigate(`/project/${proj.id}`)
                      }
                    >
                      <img
                        src={proj.screenshots[0]}
                        alt={`${proj.title} Screenshot 1`}
                        loading="lazy"
                      />
                    </div>
                    <div
                      className="screenshot-frame"
                      onClick={() =>
                        proj.hasCaseStudy && navigate(`/project/${proj.id}`)
                      }
                    >
                      <img
                        src={proj.screenshots[1]}
                        alt={`${proj.title} Screenshot 2`}
                        loading="lazy"
                      />
                    </div>
                  </div>

                  <div className="project-footer-row">
                    <div className="tags-group">
                      {proj.tags.map((tag) => (
                        <span key={tag} className="tag-pill">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {proj.hasCaseStudy && (
                      <button
                        className="read-case-study-btn"
                        onClick={() => navigate(`/project/${proj.id}`)}
                      >
                        Read <ArrowRight size={16} weight="bold" />
                      </button>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompanyWorkList;
