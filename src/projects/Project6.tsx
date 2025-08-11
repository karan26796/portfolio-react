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

      {/* -------------------- Title -------------------- */}
      <section>
        <h3>What are continuous rewards?</h3>
        <h4>
          Continuous rewards in Keka HR started off as bringing day-to-day recognition to life,
          going beyond long-term award programs to keep appreciation frequent, meaningful, and
          seamlessly integrated into the employee experience.
        </h4>
      </section>

      {/* -------------------- Why This Project Started -------------------- */}
      <section>
        <h3>Why this project started</h3>
        <ul>
          <li>Existing award programs had long timelines; companies needed quick, short-term recognition.</li>
          <li>Praise feature on Keka Wall was heavily used but lacked tangible value.</li>
          <li>Opportunity to merge HRMS + rewards into one platform and save companies from paying for two tools.</li>
          {/* <li>Revenue potential: ~₹25L MRR by converting 10% of 6,200 clients (₹30 per employee/month, avg. 132 employees).</li>
          <li>Strategic advantage while expanding into the US market.</li> */}
        </ul>
      </section>

      {/* -------------------- Timeline -------------------- */}
      <section>
        <h3>Project timeline</h3>
      </section>

      <figure>
        <img src={timeline} alt="Milestone integration" />
      </figure>

      {/* -------------------- How It Started -------------------- */}
      <section>
        <h3>How it started</h3>
        <h4>
          We identified heavy users of award programs as our initial research base, knowing their
          investment meant they could offer high-quality feedback and be early adopters.
        </h4>
        <p>
          We then spoke to HRs, admins, and managers about current workflows, pain points, and edge cases —
          shaping the feature around their real-world needs.
        </p>
      </section>

      {/* -------------------- Findings -------------------- */}
      <section>
        <h3>Findings</h3>
        <ol>
          <li>
            Companies were already running day-to-day rewards internally using Slack bots, Teams plugins etc.
            <details>
              <summary>Some called it donuts, and delivered donuts to the most rewarded employee</summary>
              <p>Companies were using various tools like Slack bots and Teams plugins to manage their internal rewards.</p>
            </details>
          </li>
          <li>Budgets are set annually and monitored closely. Internal hierarchies have an impacts points allocation.</li>
          <li>Approval chains exist for large rewards.</li>
          <li>Integrations must be customizable with currency, point values, expiry rules.</li>
        </ol>
      </section>

      {/* -------------------- Program Types -------------------- */}
      <section>
        <h3>Program types</h3>
        <p>Continuous rewards were designed as two interconnected programs:</p>
        <ul>
          <li><strong>Milestones</strong> – Birthdays, work anniversaries, first day, marriage anniversaries.</li>
          <li><strong>Peer-to-Peer</strong> – Giftable points for praising and wishing peers.</li>
          {/* <li><strong>Campaigns</strong> – Rewards for desirable behaviors (e.g., completing LMS courses, timely ITR filing, health challenges).</li> */}
        </ul>
      </section>

      <section>
        <h3>Entry point for admins</h3>
      </section>

      <figure>
        <img src={entrypoint} alt="Rewards setup entry point" />
        <figcaption>Entry point for setting up continuous rewards</figcaption>
      </figure>

      <figure>
        <img src={generalsettings} alt="General settings for rewards" />
        <figcaption>General settings: currency, point value, expiry, hierarchy rules</figcaption>
      </figure>

      {/* -------------------- Target Users -------------------- */}
      <section>
        <h2>Flows for target users</h2>
        <h3>1. Admins & HR</h3>
        <h4>Milestone rewards</h4>
        <p>To set up rewards for employees' special days with built-in budget estimation and utilization dashboards.</p>
      </section>

      <figure>
        <img src={milestonessetup} alt="Milestone rewards setup" />
        <figcaption>Admin milestone rewards setup</figcaption>
      </figure>

      <figure>
        <img src={milestonesdashboard} alt="Milestone dashboard" />
        <figcaption>Milestone rewards dashboard for admins</figcaption>
      </figure>

      <section>
        <h4>Peer to Peer rewards</h4>
        <p>To set up recurring rewards for employees' to gift each other for day to day interactions like praises and wishes.</p>
      </section>

      <figure>
        <img src={peertopeer} alt="Peer-to-peer rewards setup" />
        <figcaption>Admin peer-to-peer rewards setup</figcaption>
      </figure>

      <figure>
        <img src={p2pdashboard} alt="Peer-to-peer dashboard" />
        <figcaption>P2P rewards dashboard showing peer activity</figcaption>
      </figure>

      <section>
        <h3>Flows for employees</h3>
        <h4>
          Employees earn and gift points through wishes and praises, using points they receive in their giftable wallet.
        </h4>
      </section>

      <figure>
        <img src={integrations} alt="Integration of points with praises" />
        <figcaption>Integration of points with existing recognition touchpoints</figcaption>
      </figure>

      <figure>
        <img src={featureintro} alt="Feature intro banner" />
        <figcaption>Feature intro banners to onboard employees</figcaption>
      </figure>
      <figure>
        <img src={milestonesintegration} alt="Milestone integration" />
        <figcaption>Milestones showing earned points directly on the Keka wall</figcaption>
      </figure>

      {/* <section>
        <details>
          <summary>Read more on Finance Heads & Managers</summary>
          <p>
            Finance heads get budget clarity, region/department breakdowns, and downloadable reports.
            Managers have extra giftable points and can view all paid rewards their team has received.
          </p>
        </details>
      </section> */}

      {/* -------------------- Integrations -------------------- */}
      <section>
        <h3>What I learned</h3>
        <ul>
          <li>Aligning the vision of all stakeholders is of prime importance to any big project. If it's not done at the start, can lead to lot of delays.</li>
          <li>Customers care deeply about the reward programs in their companies and they're open to trying solutions that fit their unique needs.</li>
          <li>Unexpected blockers might throw the project off some times, in this case the XOXO days integration was that piece.</li>
        </ul>
      </section>

      {/* -------------------- Figures -------------------- */}
      {/* <h3>Project Figures</h3> */}

    </div>
  );
};

export default KekaProject;
