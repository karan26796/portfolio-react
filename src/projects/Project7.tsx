import React from "react";
import wish01 from "../utils/project-imgs/kekawish/currentFlow.webp";
import wish03 from "../utils/project-imgs/kekawish/cardIterations.webp";
import wish04 from "../utils/project-imgs/kekawish/wallOfWishes.webp";
import wishcard from "../utils/project-imgs/kekawish/Wish cards.webp";
import widget from "../utils/project-imgs/kekawish/Widget.webp";
import finaldesign from "../utils/project-imgs/kekawish/FinaldesignGIF.gif";
import dataTrack from "../utils/project-imgs/kekawish/dataTrack.png";
import currentFlow from "../utils/project-imgs/kekawish/wishesOnWall.webp";
const wishDemoVideo = process.env.PUBLIC_URL + "/currentWish.mp4";

const KekaWishes: React.FC = () => {

  return (
    <div className="project-details">

      <section>

        <h3>The Challenge: Revitalizing Platform Engagement</h3>
        <h4>
          To reverse declining wall engagement, we leveraged "wishes" as a strategic anchor to revitalize the platform's social ecosystem.
        </h4>

        <h4>Operational Friction:</h4>
        <ul>
          <li><strong>Unclear Entry Points</strong>: High cognitive load to initiate a social interaction.</li>
          <li><strong>Generic Experiences</strong>: Lack of differentiation between wisher and receiver mental models.</li>
          <li><strong>Missed Opportunities</strong>: No mechanism for post-celebration engagement or social proof.</li>
        </ul>
      </section>

      <figure>
        <img src={currentFlow} alt="Wish widget on Keka wall" />
        <figcaption>Screenshot of the old birthday feature with low engagement</figcaption>
      </figure>

      <section>
        <h3>Strategic Analysis: Friction in the Social Feedback Loop</h3>
        <p>
          We moved from a transactional interface that felt like a chore to a personal experience designed to sustain long-term social delight.
        </p>
      </section>

      <figure>
        <video
          src={wishDemoVideo}
          autoPlay
          loop
          muted
          playsInline
        >
          Sorry, your browser doesn't support embedded videos.
        </video>
        <figcaption>Video demo showing the wish flow in action</figcaption>
      </figure>

      <figure>
        <img src={wish01} alt="Current wish experience" />
        <figcaption>Screenshot of the old wish feature with low engagement</figcaption>
      </figure>

      <section>
        <h3>Informed Pivot I: Balancing Visibility and Scalability</h3>
        <p>
          We pivoted away from oversized cards that compromised wall scalability, ensuring visibility for one employee didn't come at the cost of excluding others.
        </p>
        <blockquote>
          “Strategic visibility must scale—one person’s spotlight shouldn't obscure the collective workspace.”
        </blockquote>
      </section>

      <figure>
        <img src={wish03} alt="Large special day card iteration" />
        <figcaption>Design iteration: Large special day card on the wall</figcaption>
      </figure>

      <section>
        <h3>Informed Pivot II: Centralized vs. Decentralized Engagement</h3>
        <p>
          We found that dedicated "walls" for individuals created a disconnected experience from the main widget, fragmenting user attention and feedback loops.
        </p>
      </section>

      <figure>
        <img src={wish04} alt="Dedicated wall of wishes" />
        <figcaption>Design iteration: Dedicated wall of wishes</figcaption>
      </figure>

      <section>
        <h3>Final Solution: Frictionless Social Anchors</h3>
        <p>
          A persistent, integrated CTA became the catalyst for multi-channel engagement, creating a frictionless path to recognition that scaled effortlessly.
        </p>
        <blockquote>
          “Clarity in the CTA became the catalyst for multi-channel engagement.”
        </blockquote>
      </section>

      <figure>
        <img src={widget} alt="Final widget" />
        <figcaption>Final widget: Clear Wish CTA and improved interaction flow</figcaption>
      </figure>

      <section>
        <h3>Celebrating Success: Aggregated Social Highlights</h3>
        <p>
          Wishes were aggregated into a single, high-fidelity card, shifting the experience from disjointed messages to a cohesive, shareable narrative for the team.
        </p>
      </section>

      <figure>
        <img src={wishcard} alt="Final wish card design" />
        <figcaption>Final design: Personalized birthday card on the profile wall</figcaption>
      </figure>


      <section>
        <h3>Fostering Culture through Micro-Interactions</h3>
        <p>
          Strategic delight was embedded through confetti triggers and micro-interactions, transforming a digital task into a moment of cultural appreciation.
        </p>
      </section>

      <figure>
        <img src={finaldesign} alt="Wish interaction with confetti" />
        <figcaption>Final interaction: Example of a wish sent to a colleague</figcaption>
      </figure>

      <section>
        <h2 className="results-title">📈 Results: 3x Adoption, 5x Engagement</h2>
        <ul>
          <li><strong>Velocity Increase</strong>: Average wishes per employee jumped from 2 to 8.</li>
          <li><strong>Scale Adoption</strong>: Weekly active users for the feature grew 3x (from 5k to 15k).</li>
          <li><strong>Engagement Magnitude</strong>: A 5x boost in total interactions, with 31k active wishers connecting with 116k colleagues.</li>
          <li><strong>Ecosystem Synergy</strong>: The "halo effect" increased the usage of secondary wall features like Praise and Social Posts.</li>
        </ul>
      </section>

      <figure>
        <img src={dataTrack} alt="Data results" />
        <figcaption>Measuring Impact: Analyzing the engagement lift post-launch.</figcaption>
      </figure>

      <section>
        <h2 className="results-title"> Key Learnings</h2>
        <ol>
          <li>
            <strong>Strategic Simplicity</strong>: Clear, low-friction CTAs outperform complex UI transformations in high-frequency social features.
          </li>
          <li>
            <strong>Identity-Driven Design</strong>: Aggregating recognition around an employee’s identity (Cards/Banners) significantly drives personal value and social proof.
          </li>
          <li>
            <strong>Ecosystem Thinking</strong>: Solving for one specific touchpoint (Wishes) can serve as a behavioral anchor to lift engagement across the entire platform.
          </li>
        </ol>
      </section>
    </div>
  );
};

export default KekaWishes;
