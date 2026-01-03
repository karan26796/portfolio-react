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
        <h3>The Business Case</h3>
        <h4>
          Keka’s existing award programs were optimized for long-term strategies, but lacked a system for high-velocity, day-to-day recognition. We needed to bridge this gap to foster a deeper culture of appreciation within enterprise teams.
        </h4>
        <p>
          I led the design for <strong>Continuous Rewards</strong>, a flexible framework allowing companies to automate milestones and facilitate peer-to-peer recognition.
        </p>
      </section>

      <figure>
        <img src={continuousrewards} alt="Continuous Rewards overview" />
        <figcaption>High-Impact recognition: Bringing informal practices into a structured, rewarding system.</figcaption>
      </figure>

      <section>
        <h3>Part I: Architecting for Flexibility</h3>
        <h4>
          Companies transition through various recognition cultures—some use "Donuts," others "Cookies." I designed a configuration engine that allows HR admins to customize rewards, currency, and marketplace integrations.
        </h4>
      </section>

      <figure>
        <img src={generalsettings} alt="General settings for rewards" />
        <figcaption>Strategic Flexibility: A customizable settings framework to align with diverse company cultures.</figcaption>
      </figure>

      <section>
        <h3>Part II: Automation & Employee Milestones</h3>
        <h4>
          To reduce administrative overhead, we built an automated system for birthdays and work anniversaries with built-in budget estimation, ensuring every celebration is accounted for.
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
        <h3>Part III: Cultivating a Peer-to-Peer Culture</h3>
        <h4>
          Recognition works best when it’s decentralized. I integrated point-gifting widgets directly into daily touchpoints like the "Praise" and "Wish" features.
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
        <h2 className="results-title">📈 Results & Key Learnings</h2>
        <ol>
          <li>
            <strong>Commercial Success</strong>: The feature was a primary driver in securing 10+ clients for mid-to-large sized businesses within its first quarter.
          </li>
          <li>
            <strong>Seamless Integration</strong>: Embedding recognition into existing features (Wishes/Praise) ensured that employees didn't have to learn a "new" tool to start recognizing peers.
          </li>
          <li>
            <strong>Strategic Alignment</strong>: Early stakeholder alignment on the flexibility of the point system prevented major technical debt during the integration phase.
          </li>
        </ol>
      </section>
    </div>
  );
};

export default KekaProject;