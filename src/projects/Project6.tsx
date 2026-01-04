import React from "react";

// Image imports
import generalsettings from "../utils/project-imgs/continuous rewards/General settings.webp";
import milestonessetup from "../utils/project-imgs/continuous rewards/Milestones settings.webp";
import peertopeer from "../utils/project-imgs/continuous rewards/Peer to Peer settings.webp";
import milestonesdashboard from "../utils/project-imgs/continuous rewards/Milestones dashboard.webp";
import p2pdashboard from "../utils/project-imgs/continuous rewards/P2P dashboard.webp";
import featureintro from "../utils/project-imgs/continuous rewards/Integration with wish feature.webp";
import continuousrewards from "../utils/project-imgs/continuous rewards/continuousRewardsProgram.webp";

const KekaProject: React.FC = () => {
  return (
    <div className="project-details">
      <section>
        <h3>🎯 The Goal: Making appreciation happen every day</h3>
        <h4>
          While Keka had systems for formal awards, there wasn't an easy way for people to recognize each other in the moment. We wanted to make appreciation a natural, high-velocity part of daily work.
        </h4>
        <p>
          I led the design for <strong>Continuous Rewards</strong>—a simple way for companies to automate celebrations and let employees recognize their peers with ease.
        </p>
      </section>

      <figure>
        <img src={continuousrewards} alt="Continuous Rewards overview" />
        <figcaption>High-Impact recognition: Bringing informal practices into a structured, rewarding system.</figcaption>
      </figure>

      <section>
        <h3>🛠️ Designing for different company cultures</h3>
        <h4>
          Every company has its own way of saying thanks—whether they use "Donuts," "Cookies," or points. I designed a simple settings engine that lets HR admins customize exactly how their rewards and marketplace work.
        </h4>
      </section>

      <figure>
        <img src={generalsettings} alt="General settings for rewards" />
        <figcaption>Strategic Flexibility: A customizable settings framework to align with diverse company cultures.</figcaption>
      </figure>

      <section>
        <h3>🤖 Celebrating milestones without the manual work</h3>
        <h4>
          To save HR teams from endless spreadsheets, we built an automated system for birthdays and work anniversaries. It even estimates the budget for you, ensuring no one gets left out of the celebration.
        </h4>
      </section>

      <figure>
        <img src={milestonessetup} alt="Milestone rewards setup" />
        <figcaption>Operational Strategy: Automating core celebrations with granular budget controls.</figcaption>
      </figure>

      <figure>
        <img src={milestonesdashboard} alt="Milestone dashboard" />
        <figcaption>Operational Efficiency: Real-time analytics on budget utilization and engagement levels.</figcaption>
      </figure>

      <section>
        <h3>🤝 Encouraging a culture of peer recognition</h3>
        <h4>
          Recognition feels better when it comes from peers. I integrated "point-gifting" right into the spots where people already hang out—like the Praise and Wish features on the wall.
        </h4>
      </section>

      <figure>
        <img src={peertopeer} alt="Peer-to-peer rewards setup" />
        <figcaption>Cultural Alignment: Enabling decentralized recognition through peer-to-peer gifting.</figcaption>
      </figure>

      <figure>
        <img src={p2pdashboard} alt="P2P analytics dashboard" />
        <figcaption>Visual Clarity: Surfacing cultural champions and recognition trends across the organization.</figcaption>
      </figure>

      <figure>
        <img src={featureintro} alt="Feature intro banner" />
        <figcaption>Ubiquitous Design: Embedding recognition within the employee's regular workflow.</figcaption>
      </figure>

      <section>
        <h2 className="results-title">📈 Success & Key Learnings</h2>
        <ol>
          <li>
            <strong>Big Client Wins</strong>: This feature was a key reason we signed 10+ new enterprise clients in the very first quarter.
          </li>
          <li>
            <strong>Meeting people where they are</strong>: By putting the reward system inside existing features (like Wishes), we made it easy for everyone to use it without learning something new.
          </li>
          <li>
            <strong>Keeping it simple early on</strong>: Getting everyone on the same page about how points would work early in the project saved us a lot of technical headaches later.
          </li>
        </ol>
      </section>
    </div>
  );
};

export default KekaProject;