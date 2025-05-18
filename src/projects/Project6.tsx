import React from "react";

const SubscriptPortfolio: React.FC = () => {
    return (
        <div className="project-details">
            <section>
                <h2>Why did the project exist?</h2>
                <h4>We introduced award programs in Keka HR as a means to run award campaigns in companies that recognize their employees.</h4>
                <p>While Keka HR had award campaigns for recognizing employees every few months, there was no way for the company & other employees to recognize their peers on a day-to-day basis. This project addressed that gap.</p>
                <p>This also gave Keka an opportunity to enter collaborations with rewards redemption platforms like XOXO day, Qwikcilver etc. The introduction of this feature strengthened Keka's position in the market, especially when entering the US market.</p>
            </section>

            <section>
                <h2>Project Components</h2>
                <h4>We divided the program into two parts</h4>
                <p>The Keka platform already highlights people's personal milestones like birthdays, work anniversaries, and first days on the platform to enable conversations and visibility. Another feature, Praises on Keka wall, allows employees to appreciate their peers and post certificates on the social wall, which was one of the most used features.</p>
            </section>

            <figure>
                <img src={""} alt="Milestone rewards" />
                <figcaption>Milestone rewards: Celebrate career and personal milestones of employees such as birthdays and anniversaries and reward them on these special days.</figcaption>
            </figure>
            <figure>
                <img src={""} alt="Peer-to-peer rewards" />
                <figcaption>Peer-to-peer rewards: Allow colleagues to share reward points while praising each other.</figcaption>
            </figure>

            <section>
                <h2>User Personas</h2>
                <h4>While designing for Keka's HR platform there are usually 3 types of users</h4>
                <ul>
                    <li><strong>The program admin/HR:</strong> The people responsible for setting up the program in the organization and customizing it. They need to keep a check on expenses and forecast spending, so it was important to show them enough data through dashboards.</li>
                    <li><strong>Company employees:</strong> Since the point system was to be introduced for employees, it was critical to make the touch points familiar. The system was introduced in familiar places like employee wishes and praises. Showing employees a breakdown of transactions was important for transparency and control.</li>
                    <li><strong>The finance head:</strong> The setup and dashboard had to display the spending on the program to help forecast expenses for upcoming quarters or the year.</li>
                </ul>
            </section>

            <section>
                <h2>Problems the Product Solved</h2>
                <h4>The solution addressed issues for different stakeholders</h4>
                
                <p><strong>Problems for HRs:</strong></p>
                <ul>
                    <li>Don't know how to implement steps to promote a culture of appreciation within organization</li>
                    <li>Even if steps are taken, good participation rate remains a challenge</li>
                    <li>Time, effort, and resources needed to scale local efforts to org level</li>
                </ul>
                
                <p><strong>Problems for Employees:</strong></p>
                <ul>
                    <li>In many cases, lack of appreciation and rewards from employer for moments that matter</li>
                    <li>It takes efforts to praise peers to make them feel special</li>
                </ul>
                
                <p><strong>Problems for Finance Heads:</strong></p>
                <ul>
                    <li>No clarity on budget if multiple programs are running within an org</li>
                    <li>Reports need to be created and maintained manually to track budget spends</li>
                </ul>
                
                <p><strong>Problems for Managers:</strong></p>
                <ul>
                    <li>In absence of points and marketplace, managers either have no avenue to reward employees or must take approvals for it</li>
                    <li>In performance reviews, apart from individual's contributions, they don't have a formal way to gauge the popularity/usefulness of the employee to others</li>
                </ul>
            </section>

            <section>
                <h2>Design Process</h2>
                <h4>Stakeholder collaboration and customer feedback</h4>
                <p>The design process started with a survey to Keka clients to understand if and how they were running rewards programs in their organizations. Based on survey responses, our customer team connected us with those companies' POCs. To get early customer feedback, we created wireframes based on our hypothesis.</p>
                <p>During conversations with HRs, we realized that every company was implementing reward systems differently:</p>
                <ul>
                    <li>Each company had unique names for rewards (cookies, donuts, etc.), which led us to add customization options</li>
                    <li>Some companies already used rewards redemption platforms like XOXO days or Qwikcilver</li>
                    <li>HRs wanted point allotment based on hierarchy, allowing team managers more points to distribute</li>
                    <li>Some companies offered physical gifts, which we deprioritized due to complexity</li>
                </ul>
            </section>

            <figure>
                <img src={""} alt="Budget simulation suggestion" />
                <figcaption>Potential improvement: Add a slider for admins to simulate the budget based on percentage utilization of points every year/quarter</figcaption>
            </figure>

            <figure>
                <img src={""} alt="User flow diagram" />
                <figcaption>User flow diagram of the product</figcaption>
            </figure>

            <section>
                <h2>Learning and Challenges</h2>
                <h4>Managing stakeholder feedback and gaining new perspectives</h4>
                <p>Since the project scope was large, many stakeholders were involved at each step. Managing all stakeholder feedback and iterating became quite hectic, but it was necessary to develop a solid go-to-market strategy.</p>
                <p>Key learnings:</p>
                <ul>
                    <li>How to talk to each stakeholder, understand their perspective, and view the project from different lenses</li>
                    <li>The need for a better grasp on competitors' offerings</li>
                    <li>The importance of balancing design perspective with business, marketing, and customer success needs</li>
                </ul>
            </section>

            <section>
                <h2>Success Metrics</h2>
                <h4>Though the project was yet to launch, these metrics would measure success</h4>
                <ul>
                    <li><strong>Customer tickets:</strong> Number of tickets raised in the first month</li>
                    <li><strong>Exchange of points:</strong> How many points were exchanged between employees</li>
                    <li><strong>Business value:</strong> Goal of getting 30 clients before launch and creating a funnel of at least 40 people monthly for upselling</li>
                    <li><strong>Budget utilization:</strong> How much of the allocated program budget companies used, to understand adoption and proliferation</li>
                </ul>
            </section>

        </div>
    );
};

export default SubscriptPortfolio;