import React from "react";
import oldHighlights from "../utils/project-imgs/looppanel-insights/old-highlights.webp";
import iterationMid from "../utils/project-imgs/looppanel-insights/iteration-mid.gif";
import sideQuestion01 from "../utils/project-imgs/looppanel-insights/side-question-01.webp";
import sideQuestion02 from "../utils/project-imgs/looppanel-insights/side-question-02.webp";
import topBottom1 from "../utils/project-imgs/looppanel-insights/top-bottom-1.webp";
import topBottom2 from "../utils/project-imgs/looppanel-insights/top-bottom-2.webp";
import newInsights from "../utils/project-imgs/looppanel-insights/new-insights.gif";
import summary from "../utils/project-imgs/looppanel-insights/summary.gif";
import other1 from "../utils/project-imgs/looppanel-insights/5.webp";
import other2 from "../utils/project-imgs/looppanel-insights/6.webp";
import other3 from "../utils/project-imgs/looppanel-insights/7.webp";
import other4 from "../utils/project-imgs/looppanel-insights/8.webp";

import "../styles/ProjectDetails.scss";
import { Story } from "react-insta-stories/dist/interfaces";
import Stories from 'react-insta-stories';

const Project2: React.FC = () => {

  const myStories: Story[] = [
    { url: other1 },
    { url: other2 },
    { url: other3 },
    { url: other4 },
  ]

  return (
    <div className="project-details">
      <section>
        <h3>The Challenge</h3>
        <h4>
          Researchers struggled with fragmented data—navigating between call notes, recordings, transcripts, and highlights. The challenge was to design a system that supported "zooming" across different layers of detail.
        </h4>
        <p>
          The original information hierarchy didn't reflect the mental model of researchers, leading to friction in finding and sharing key insights.
        </p>
      </section>

      <figure>
        <img src={oldHighlights} alt="Old highlights page design" />
        <figcaption>Baseline: The original highlights view required an overhaul to support new project structures.</figcaption>
      </figure>

      <section>
        <h3>Iterative Design & Information Architecture</h3>
        <h4>
          I led the transition from a flat list of highlights to a structured, project-centric data model.
        </h4>
      </section>

      <figure>
        <img src={iterationMid} alt="Phase-I release" />
        <figcaption>Laying the foundation: Direct project integration and improved filtering capability.</figcaption>
      </figure>

      <section>
        <h3>Strategic Pivot I: Contextual Hierarchy</h3>
        <p>
          Initial explorations placed question scripts in a side panel. Testing revealed that this disjointed the relationship between the question and its associated data. We pivoted to a top-down, collapsible hierarchy.
        </p>
      </section>

      <figure>
        <img src={sideQuestion01} alt="Questions in side panel exploration" />
        <figcaption>Exploration: Testing side-panel navigation for research questions.</figcaption>
      </figure>

      <figure>
        <img src={sideQuestion02} alt="Alternative side menu" />
        <figcaption>Iteration: Refining the side-panel hierarchy.</figcaption>
      </figure>

      <section>
        <h3>Strategic Pivot II: The "Mental Model" Alignment</h3>
        <p>
          We moved away from technical groupings toward a structure that matched how researchers actually synthesize findings—grouping notes by research question rather than simply by call source.
        </p>
      </section>

      <figure>
        <img src={topBottom1} alt="Top-down hierarchy exploration" />
        <figcaption>Exploration: Aligning data with the researcher's mental model.</figcaption>
      </figure>

      <figure>
        <img src={topBottom2} alt="Collapsible question structures" />
        <figcaption>Iteration: Testing collapsible structures to reduce cognitive load.</figcaption>
      </figure>

      <section>
        <h3>Final Solution: High-Velocity Analysis</h3>
        <h4>
          The final design features a collapsible question script at the top, allowing researchers to dive deep into a single question without losing site of the broader project context.
        </h4>
      </section>

      <figure>
        <img src={newInsights} alt="New analysis screen" />
        <figcaption>Analysis Interface: Collapsible questions and integrated transcript access.</figcaption>
      </figure>

      <section>
        <h3>Sharing the Story: Sharing the Impact</h3>
        <h4>
          To wrap up the synthesis experience, I designed a summary view that translates raw data into shareable, high-level narratives for stakeholders.
        </h4>
      </section>

      <figure>
        <img src={summary} alt="Summary view" />
        <figcaption>Sharable Insights: Bridging raw data with executive-ready summaries.</figcaption>
      </figure>

      <section>
        <h2 className="results-title">📈 Results & Key Learnings</h2>
        <ol>
          <li>
            <strong>Strategic Scaling</strong>: The system successfully supported the introduction of complex project structures without overwhelming existing users.
          </li>
          <li>
            <strong>Velocity of Discovery</strong>: Collapsible views and script-based navigation significantly reduced the time required to group and categorize insights.
          </li>
          <li>
            <strong>Stakeholder Buy-In</strong>: The summary view became a critical tool for researchers to demonstrate value to cross-functional teams.
          </li>
        </ol>
      </section>
    </div>
  );
};

export default Project2;
