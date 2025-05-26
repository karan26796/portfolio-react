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

const KekaProject: React.FC = () => {
  return (
    <div className="project-details">
      <section>
        <h2>About the project</h2>
        <p><strong>Project tenure:</strong> 4 months (May 2024 - Oct 2024)</p>
        <p><strong>Figma file link:</strong> <a href="https://www.figma.com/design/Yp4W7WCTjVvOAi6mAT3v9w/Continuous-Rewards?node-id=23-32695&t=dzDMJHRT3Q2g47Xb-1" target="_blank" rel="noopener noreferrer">View Design</a></p>
      </section>

      <section>
        <h2>What are continuous rewards?</h2>
        <p>A year ago, we introduced award programs in Keka HR as a means to run award campaigns in companies to recognize their employees every few months for their contributions and achievements.</p>
        
        <p>While award programs are great for longer timelines, there was no way for the company & other employees to recognize their peers on a day-to-day basis.</p>
        
        <h2>Program Structure</h2>
        <p>The program involved introducing a points system within the company to foster a culture of recognition. The current methods of recognition, albeit popular, didn't have any value attached to them. The program was divided into two parts:</p>
        
        <ol>
          <li>
            <strong>Milestone rewards</strong><br/>
            To recognize career and personal milestones of employees such as birthdays, and anniversaries.
            {/* <br/><br/>
              <a href="https://www.loom.com/share/d7c067142ff74c7381efe0cad2962c32?sid=e9939928-c613-4b51-b8af-fd49702d48ca" target="_blank" rel="noopener noreferrer">
                View Milestones Demo
              </a> */}
          </li>
          <li>
            <strong>Peer-to-peer rewards</strong><br/>
            Allow colleagues to share reward points while praising each other.
            {/* <br/><br/>
              <a href="https://www.loom.com/share/b91af8204d3348928cdab3bdf228b759?sid=de5858b7-50cf-4738-96fd-d069bdf889d1" target="_blank" rel="noopener noreferrer">
                View P2P Demo
              </a> */}
          </li>
        </ol>
        {/* <p>We realized celebrating achievements and recognizing the efforts of the employees is a core pillar of the employee experience. It makes them feel that they are valued, which keeps their spirits and motivation up for work.</p>
        
        <p>Since other HR platforms already had similar features, the introduction of this feature strengthened Keka's position in the market, especially when it was entering the US market as well.</p> */}
        
        {/* <h2>Platform integration</h2>

        <h3>The Keka platform already has a lot of touch points for employee recognition, therefore we decided to integrate the points system first with those touchpoints.</h3> */}
        </section>

        {/* <section>
          <ol>
          <li>Highlights people's personal milestones like their birthday, work anniversary, first day etc. on the platform to make Peer to Peer recognition more visible for everyone.</li>
          <li>Another feature that helped the feature was Praises on Keka wall wherein employees can appreciate their peers and post a certificate on the social wall. This was one of the most used features on a day-to-day basis on Keka wall.</li>
          </ol>
        <p>Hence, we decided to capitalize on the above touch points to work on the feature. Not only this, but during customer conversations, we realized companies already had an internal rewards program which they'd be willing to see on the Keka platform and pay for it as well.</p>

      </section> */}

      <section>
        <h2>User Personas</h2>
        <p>While designing for Keka's HR platform there are usually 2 types of users, but in this case a the finance heads also had to be considered due to the invovement of money:</p>
        
           {/* Since they have to keep a check on expenses and forecast the spending it was important to show them enough data to move ahead. Dashboard etc. */}        
        {/* Showing the employees a breakdown of the transactions was also important to be transparent and give them control. */}

        <h3>1. Program admin/HR's flow</h3>
        <p>They are responsible for setting up the program in their organizations and cater to its needs.</p>
        </section>

        <figure>
          <img src={userflow} alt="Updated menu" />
          <figcaption>User flow for the program admin/HRs</figcaption>
        </figure>
        
        <section>
          <h3>Landing page</h3>
        </section>

        <figure>
          <img src={entrypoint} alt="Updated menu" />
          <figcaption>The setup process is housed in the rewards tab under engage</figcaption>
        </figure>

        <section>
          <h3>General settings</h3>
        </section>

        <figure>
          <img src={generalsettings} alt="Updated menu" />
          <figcaption>First step in the setup process is to set the general settings</figcaption>
        </figure>

        <section>
          <h3>Milestone rewards</h3>
        </section>

        <figure>
          <img src={milestonessetup} alt="Updated menu" />
          <figcaption>Milestone rewards setup</figcaption>
        </figure>

        <figure>
          <img src={milestonesdashboard} alt="Updated menu" />
          <figcaption>Milestone rewards setup</figcaption>
        </figure>

        <section>
          <h3>Peer to peer rewards</h3>
        </section>

        <figure>
          <img src={peertopeer} alt="Updated menu" />
          <figcaption>Peer to peer rewards setup</figcaption>
        </figure>

        <figure>
          <img src={p2pdashboard} alt="Updated menu" />
          <figcaption>Peer to peer rewards setup</figcaption>
        </figure>

        <section>
        <h3>2. The Employees</h3>
        <p>Since the point system was to be introduced for employees, it was critical to make the touch points familiar. Hence, we integrated them with employee wishes, praises etc.</p>

        <h2>Touchpoints</h2>
        <h3>The Keka platform already has a lot of touch points for employee recognition, therefore we decided to integrate the points system first with those touchpoints.</h3>
        </section>

        <figure>
          <img src={integrations} alt="Updated menu" />
          <figcaption>Praises and special days widget on Keka wall</figcaption>
        </figure>

        <figure>
          <img src={milestonesintegration} alt="Updated menu" />
          <figcaption>Praises and special days widget on Keka wall</figcaption>
        </figure>

        <figure>
          <img src={p2pintegration} alt="Updated menu" />
          <figcaption>Praises and special days widget on Keka wall</figcaption>
        </figure>
{/* 


        <section>
        <h3>3. Finance head</h3>
        <p>The setup and dashboards considered the finance heads to plan & forecast their expenses for the upcoming quarter(s) or the year.</p>
      </section>

      <section>
        <h2>Problems the Product Intended to Solve</h2>
        
        <h4>Problems for HRs</h4>
        <ul>
          <li>Don't know how to implement steps to promote a culture of appreciation within organization</li>
          <li>Even if steps are taken good participation rate remain a challenge</li>
          <li>Time, Effort, and Resources needed to scale local efforts to org level</li>
        </ul>
        
        <h4>Problems for Employees</h4>
        <ul>
          <li>In many cases, lack of appreciation and rewards from employer for moments that matter</li>
          <li>It takes efforts to praise peers to make them feel special</li>
        </ul>
        
        <h4>Problems for Finance Heads</h4>
        <ul>
          <li>No clarity on budget if multiple programs are running within an org</li>
          <li>Reports need to be created and maintained manually to track budget spends</li>
        </ul>
        
        <h4>Problems for Managers</h4>
        <ul>
          <li>In absence of points and marketplace, managers either have no avenue to reward and employee or must take approvals for it</li>
          <li>In performance reviews, apart from individual's contributions they don't have a formal way to gauge the popularity/usefulness of the employee to others</li>
        </ul>
      </section>

      <section>
        <h2>Design Process & Collaboration</h2>
        <p>The design process started by rolling a survey to Keka clients to understand if and how they were running rewards programs in their organization. Based on the survey responses, we asked the customer team to get us in touch with the POCs of those companies. To get early customer feedback, we had also created a wireframe based on our hypothesis.</p>
        
        <p>During our conversations with the HRs we realized that every company was implementing the reward system differently:</p>
        
        <ul>
          <li>Each company had a name for the reward that was being exchanged between the employees, some called it cookies, others called it donuts etc. This gave us the idea to add customization to rename the reward being used on the platform so it fits into their existing systems and has a smaller learning curve.</li>
          <li>Some companies were already using a rewards redemption platform like XOXO days, Qwikcilver etc. therefore it became imperative for us to add customizations on that front. But due to development complexities we decided to only stick to XOXO days.</li>
          <li>HRs wanted the allotment of the points to be based on hierarchy wherein team managers should get more points to be able to give out more points during the same period.</li>
          <li>A lot of companies gave out physical gifts as a part of this program which they wanted to be added as an option on the platform but we chose to deprioritize it due to complexity.</li>
        </ul>
      </section>

      <section>
        <h2>User Flows</h2>
        <p><a href="https://www.figma.com/board/sHL33lAoU8wbNWfxMg2B0L/Untitled?node-id=1-2&t=bulrD5LWayQZt5Nl-0" target="_blank" rel="noopener noreferrer">View User Flow Diagram</a></p>
      </section>

      <section>
        <h2>User Research & Key Learnings</h2>
        <p>As usual, we talked to the users at the start of the project. We rolled out an interest form to understand which clients would be interested and could become early supporters once the feature was launched. This was done to understand the business value of the offering and figure out revenue streams even before we executed the product.</p>
        
        <h4>Questions we asked customers:</h4>
        <ul>
          <li>About their current reward programs</li>
          <li>What they would like to know before they set up the program to understand their expectations</li>
          <li>About the person who usually runs these programs and their process of managing the program currently</li>
        </ul>
      </section>

      <section>
        <h2>Challenges & Personal Learnings</h2>
        <p>Since the scope of the project was quite large, a lot of stakeholders were involved at each step. In hindsight it was required to cover all bases and come up with a very solid go to market strategy. Managing all the stakeholder feedback and iterating on top of it became quite hectic.</p>
        
        <p>But I learned how to talk to each stakeholder, understand their perspective and look at the project from that lens. I learned how to think from business, marketing, customer success lens.</p>
        
        <h4>What I learned:</h4>
        <ul>
          <li>I learned that I need a better grasp on the offerings of our competitors</li>
          <li>I also realized I view the project only from a designer's perspective sometimes but I need to also balance everything else and make it easier for other teams to be able to sell & position it</li>
        </ul>
      </section>

      <section>
        <h2>Success Metrics</h2>
        <p>The project is yet to launch but the metrics I could use to measure it would be:</p>
        
        <ul>
          <li><strong>Customer tickets:</strong> In the Keka platform, companies can raise a ticket for issues they face. So, I'd look at the number of tickets raised in the first month</li>
          <li><strong>Exchange of points:</strong> I'd look at how many points were exchanged between employees in the first month</li>
          <li><strong>Business value:</strong> I'd set a goal of getting 30 clients before launch and try to create a funnel of at least 40 people on a month-to-month basis to be able upsell the product to</li>
          <li><strong>Budget utilization:</strong> I'd like to see how much budget allocated to the program has a company used to be able to understand its adoption and proliferation in the company</li>
        </ul>
      </section> */}
    </div>
  );
};

export default KekaProject;