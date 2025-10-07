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

      {/* -------------------- Intro -------------------- */}
      <section>
        <h3>About the project</h3>
        <p>
          The <strong>Continuous Rewards</strong> project was conceptualized to introduce a flexible, day-to-day recognition system within Keka to
        </p>
        <ul>
          <li>Bring companies' informal recognition practices into a structured system</li>
          <li>Complement existing praise features with tangible rewards</li>
          <li>Initiate an employee recognition system from the company's end</li>
        </ul>
        <h4>The existing award programs in Keka catered to long term reward strategies but short term recognition was lacking.</h4>
      </section>

      <section>
        <h6>Components</h6>
        <h3>Setting up the program</h3>
        <p>
          The continuous rewards program consists of three main components: </p>
        <ol>
          <li><strong>General Settings</strong> : To set up the overall framework and guidelines for the rewards program.</li>
          <li><strong>Milestone Rewards</strong> : To automate celebrations for significant employee milestones.</li>
          <li><strong>Peer-to-Peer Rewards</strong> : To facilitate employee recognition through peer interactions.</li>
        </ol>
      </section>

      <figure>
        <img src={continuousrewards} alt="Milestone rewards setup" />
        <figcaption>HR admins setting up automated milestone rewards.</figcaption>
      </figure>

      {/* -------------------- General Settings -------------------- */}
      <section>
        <h6>Part I</h6>
        <h3>Flexible Configuration System</h3>
        <p>
          Companies ran informal day-to-day reward programs already, using Slack bots, or WhatsApp. Some called the rewards <strong> donuts</strong>, some <strong>cookies</strong>. Hence we added a way for them to customize this in the system.<br /><br />
          The configuration system also allows HR admins to account for currency coversion, integrate a marketplace etc.
        </p>
        <blockquote>🍩 A company's policy was to send a donut box to the employees who received most number of donuts on Slack.</blockquote>

      </section>

      <figure>
        <img src={generalsettings} alt="General settings for rewards" />
        <figcaption>Customizable settings to align rewards with company policies.</figcaption>
      </figure>

      {/* -------------------- Milestones -------------------- */}
      <section>
        <h6>Setup</h6>
        <h3>Milestone Rewards</h3>
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
        <h6>Dashboard</h6>
        <h3>Milestone Analytics</h3>
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
        <h6>Setup</h6>
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
        <h6>P2P Dashboard</h6>
        <h3>Recognition made visible</h3>
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
        <h6>Employee touch points</h6>
        <h3>Integrating with praise and wish features</h3>
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