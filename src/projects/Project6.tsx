import React from "react";

// Image imports
import integrations from "../utils/project-imgs/continuous rewards/Integrations.webp";
import entrypoint from "../utils/project-imgs/continuous rewards/Entry point.webp";
import userflow from "../utils/project-imgs/continuous rewards/User flow.webp";
import generalsettings from "../utils/project-imgs/continuous rewards/General settings.webp";
import milestonessetup from "../utils/project-imgs/continuous rewards/Milestones settings.webp";
import peertopeer from "../utils/project-imgs/continuous rewards/Peer to Peer settings.webp";
import timeline from "../utils/project-imgs/continuous rewards/timeline-rewards.webp";
import milestonesdashboard from "../utils/project-imgs/continuous rewards/Milestones dashboard.webp";
import p2pdashboard from "../utils/project-imgs/continuous rewards/P2P dashboard.webp";
import milestonesintegration from "../utils/project-imgs/continuous rewards/Integration with praise feature.webp";
import featureintro from "../utils/project-imgs/continuous rewards/Integration with wish feature.webp";

const KekaProject: React.FC = () => {
  return (
    <div className="project-details">

      {/* -------------------- Intro -------------------- */}
      <section>
        <h3>Continuous Rewards at Keka</h3>
        <p>
          The project was conceptualized to introduce a flexible, day-to-day recognition system within Keka to
        </p>
        <ul>
          <li>Boost employee engagement and satisfaction</li>
          <li>Complement existing praise features with tangible rewards</li>
          <li>Integrate seamlessly into daily workflows</li>
        </ul>
      </section>

      {/* -------------------- General Settings -------------------- */}
      <section>
        <h3>Part I: Flexible Configuration System</h3>
        <p>
          HR admins can define currencies, point values, expiry rules, and hierarchy-based
          permissions, ensuring the program adapts to their culture and operational needs.
        </p>
        <blockquote>During customer conversations, HRs raised a need for customizations, since they already had informal systems in place</blockquote>

      </section>

      <figure>
        <img src={generalsettings} alt="General settings for rewards" />
        <figcaption>Customizable settings to align rewards with company policies.</figcaption>
      </figure>

      {/* -------------------- Milestones -------------------- */}
      <section>
        <h3>Milestone Rewards Setup</h3>
        <p>
          Automated celebrations for birthdays, work anniversaries, and other special moments come
          with built-in budget estimation, ensuring every important occasion is acknowledged.
        </p>
        <blockquote>Special work anniversary feature was added to create variable rewards for each successive year of service.</blockquote>
      </section>

      <figure>
        <img src={milestonessetup} alt="Milestone rewards setup" />
        <figcaption>HR admins setting up automated milestone rewards.</figcaption>
      </figure>

      <section>
        <h3>Milestone Analytics Dashboard</h3>
        <p>
          Real-time analytics on budget utilization and engagement levels give
          admins visibility into impact and opportunities for optimization.
        </p>
      </section>

      <figure>
        <img src={milestonesdashboard} alt="Milestone dashboard" />
        <figcaption>Dashboard showing utilization and employee participation in milestones.</figcaption>
      </figure>

      {/* -------------------- Peer to Peer -------------------- */}
      <section>
        <h3>Peer-to-Peer Rewards</h3>
        <p>
          Employees can gift points for daily interactions—praises, wishes, and teamwork support.
          This fosters a culture where recognition is woven into everyday work.
        </p>
        <blockquote>Customizations for points given were added using exceptions to account for unique team dynamics.</blockquote>
      </section>

      <figure>
        <img src={peertopeer} alt="Peer-to-peer rewards setup" />
        <figcaption>Configuration for peer-to-peer gifting of points.</figcaption>
      </figure>

      <section>
        <h3>P2P Dashboard : Recognition made visible</h3>
        <p>
          Visual dashboards highlight recognition activity across teams, surfacing culture champions
          and showing the ripple effect of frequent appreciation.
        </p>
      </section>

      <figure>
        <img src={p2pdashboard} alt="Peer-to-peer dashboard" />
        <figcaption>Insights into recognition trends across the organization.</figcaption>
      </figure>

      {/* -------------------- Onboarding -------------------- */}
      <section>
        <h3>Employee touch points : Integrating with praise and wish features</h3>
        <p>
          The gifting widget was embedded within the praise & wish features to provide a seamless experience for employees to recognize and appreciate their peers.
        </p>
      </section>

      <figure>
        <img src={featureintro} alt="Feature intro banner" />
        <figcaption>Points gifting widget in wish and praise features</figcaption>
      </figure>

      {/* -------------------- Learnings -------------------- */}
      <section>
        <h3>Key Learnings</h3>
        <ul>
          <li>Stakeholder alignment at the start prevents costly rework later.</li>
          <li>Companies are willing to invest when rewards fit their culture.</li>
          <li>Unexpected integration blockers require contingency planning.</li>
        </ul>
      </section>

    </div>
  );
};

export default KekaProject;