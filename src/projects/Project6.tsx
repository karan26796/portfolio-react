import React from "react";
import integrations from "../utils/project-imgs/continuous rewards/Integrations.webp";
import entrypoint from "../utils/project-imgs/continuous rewards/Entry point.webp";
import userflow from "../utils/project-imgs/continuous rewards/User flow.webp";
import generalsettings from "../utils/project-imgs/continuous rewards/General settings.webp";
import milestonessetup from "../utils/project-imgs/continuous rewards/Milestones settings.webp";
import peertopeer from "../utils/project-imgs/continuous rewards/Peer to Peer settings.webp";
import milestonesdashboard from "../utils/project-imgs/continuous rewards/Milestones dashboard.webp";
import p2pdashboard from "../utils/project-imgs/continuous rewards/P2P dashboard.webp";
import milestonesintegration from "../utils/project-imgs/continuous rewards/Integration with praise feature.webp";
import p2pintegration from "../utils/project-imgs/continuous rewards/Integration with wish feature.webp";
import featureintro from "../utils/project-imgs/continuous rewards/Integration with wish feature.webp";

const KekaProject: React.FC = () => {
  return (
    <div className="project-details">

      <section>
        <h2>Bringing Recognition to the Everyday</h2>
        <p>We introduced a continuous rewards system to foster daily appreciation through points, not just praise.</p>
      </section>

      <section>
        <h3>Why?</h3>
        <ul>
          <li>Award programs existed but weren’t designed for day-to-day moments</li>
          <li>Praises had no tangible value attached</li>
          <li>No centralized system for budgeting, rewarding, or tracking</li>
        </ul>
      </section>

      <section>
        <h3>Solution</h3>
        <p>A points-based recognition program built into Keka’s HR platform.</p>
        <ol>
          <li><strong>Milestone Rewards:</strong> Auto-awarded on birthdays, anniversaries, etc.</li>
          <li><strong>Peer-to-Peer Rewards:</strong> Employees can gift points with a praise</li>
        </ol>
      </section>

      <section>
        <h3>User Personas</h3>
        <ul>
          <li><strong>HR/Admins:</strong> Set up and monitor reward programs</li>
          <li><strong>Employees:</strong> Give and receive meaningful rewards</li>
          <li><strong>Finance Heads:</strong> Monitor budget and forecast spend</li>
        </ul>
      </section>

      <section>
        <h3>Admin Flow</h3>
        <p>From setup to tracking, the admin journey was designed to offer control and clarity.</p>
      </section>

      <figure>
        <img src={userflow} alt="Updated menu" />
        <figcaption>User flow for the program admin/HRs</figcaption>
      </figure>

      <section>
        <h3>Setup Entry</h3>
      </section>

      <figure>
        <img src={entrypoint} alt="Updated menu" />
        <figcaption>The setup process is housed in the rewards tab under engage</figcaption>
      </figure>

      <section>
        <h3>Setup Screens</h3>
      </section>

      <figure>
        <img src={generalsettings} alt="Updated menu" />
        <figcaption>First step in the setup process is to set the general settings</figcaption>
      </figure>

      <section>
        <h3>Milestone Rewards</h3>
      </section>

      <figure>
        <img src={milestonessetup} alt="Milestone rewards setup screen" />
        <figcaption>Configure milestone-based rewards for employees</figcaption>
      </figure>

      <figure>
        <img src={milestonesdashboard} alt="Milestone rewards dashboard" />
        <figcaption>Dashboard view: Track milestone rewards and participation</figcaption>
      </figure>

      <section>
        <h3>Peer-to-Peer Rewards</h3>
      </section>

      <figure>
        <img src={peertopeer} alt="Peer to peer rewards setup" />
        <figcaption>Set up peer-to-peer recognition and reward options</figcaption>
      </figure>

      <figure>
        <img src={p2pdashboard} alt="Peer to peer rewards dashboard" />
        <figcaption>Dashboard view: Monitor peer-to-peer rewards activity</figcaption>
      </figure>

      <section>
        <h3>Employee Experience</h3>
        <p>We made the experience familiar and delightful by integrating points into existing praise and wish flows.</p>
      </section>

      <figure>
        <img src={integrations} alt="Updated menu" />
        <figcaption>Integration of points with praises and special days on the Keka wall</figcaption>
      </figure>

      <figure>
        <img src={featureintro} alt="Updated menu" />
        <figcaption>Feature introduction banners highlighting the new points system</figcaption>
      </figure>

      <figure>
        <img src={milestonesintegration} alt="Updated menu" />
        <figcaption>Milestone achievements now display earned points for employees</figcaption>
      </figure>
    </div>
  );
};

export default KekaProject;
