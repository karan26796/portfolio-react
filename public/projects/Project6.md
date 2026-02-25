<section>

### 🤔 What are continuous rewards?
#### Companies usually recognize their employees in two ways:

1. **Formal award programs** - Participants are nominated, winners are chosen across different award categories, like Craftsmanship award, Employee of the month, etc. These are usually done over a period of a month, quarter, or a year in most organizations.
2. **Day-to-day rewards** - These are either employer-led or peer-led. Orgs recognize their employees on their special days, like birthdays, work anniversaries, or joining date, child birth etc. The list here is endless.

<!--
![Image Description](/project-imgs/folder/image.webp)
-->

### 🔍 The market gap
#### Based on market research we realized that companies were using separate HRMS and Recognition platforms, like Empuls, Vantage Circle, Survey Sparrow etc.

#### This led to them maintaining two systems that don’t talk to each other. A lot of context that the HR system can provide them was lost due to this, on top of the additional cost.

<details class="tldr-container">
<summary>
  <h3>TL;DR: Research & Findings</h3>
  <ul>
    <li>Keka aimed to <strong>consolidate HR and Rewards platforms</strong> into a complete suite for the US market, unlocking a <strong>direct new revenue stream</strong>.</li>
    <li>To bridge fragmented systems, Keka's native point distribution was unified with a <strong>dedicated external partner redemption platform</strong> (XOXO Days).</li>
    <li>Customer research revealed that organizations require <strong>highly bespoke reward systems</strong> tailored to their distinct corporate vernacular.</li>
    <li>The platform had to provide <strong>granular control over milestones, budgets, and complex hierarchical point distribution</strong> across global teams.</li>
  </ul>
  <span class="read-more-btn">Read full research context</span>
</summary>
<div class="tldr-content">

To solve this fragmentation, we envisioned a unified platform where continuous rewards could be issued natively within the Keka ecosystem and seamlessly redeemed on a dedicated partner platform (XOXO days). 

Since Keka had already successfully launched an MVP for formal award programs—adopted by over 100 organizations—expanding into continuous day-to-day rewards was the natural next step.

#### The reason to create a continuous rewards platform was two-fold:
1. To enter the US market as a complete suite
2. To generate a revenue stream by consolidating HRMS and Rewards platform


### 🌍 Research & Customer Conversations
#### The project started with internal stakeholder buy-in followed by customer conversations, to understand their existing ways of working.

This was done so the system could adapt to the user and not the other way around in order to ensure adoption, usage, and customer satisfaction.

We showed our initial explorations to customers. On talking to customers we found out:

1. **Orgs had different set ups for rewards.** Some called them donuts, some cookies.
   <blockquote>"We use a slack bot to give people 5 donuts everyday to appreciate their peers, which lapse at the end of the day. Whoever has the most number of donuts at the end of the month receives a box of donuts from the company."</blockquote>
2. **The same person usually runs HR ops and rewards** in the company, sometimes there’s a financial head involved.
3. **Rewards are usually distributed hierarchically.** Managers, different teams receive rewards basis their unique needs.
   <blockquote>"What if a manager has 3 people reporting to them, and the other has 5? We want to give more points to the manager who has 5 reportees."</blockquote>
4. **A lot of the companies had workforce in more than 1 country.** To accommodate them, global conversions had to be designed.
5. **Companies wanted to have granular control over the program,** ability to stop redemption from the platform, limit the points one can carry forward at the end of the year, how many points can peers exchange among each other at once etc.
6. **Companies usually give out additional benefits to tenured people** on work anniversaries.

</div>
</details>

<!--
![Image Description](/project-imgs/folder/image.webp)
-->

## 🛠️ Designing the Platform
#### We took these findings and started designing. The program was split into two parts: Employee milestone rewards and Peer-to-peer rewards.

### 1️⃣ Platform integration and reward customization
1. **Instant Integration**: Redirect link to partner platform (XOXO days) for a seamless admin setup.
2. **Custom Branding & Global Rates**: Rename rewards, upload custom icons, and define **geo-specific conversion rates**, naturally powered by Keka’s internal payroll connection.
3. **Budget Governance**: Ability to limit points employees can carry forward.

</section>

<video src="/project-imgs/continuous rewards/marketplace.mp4" caption="High-Impact recognition: Bringing informal practices into a structured, rewarding system"></video>

<section>

### 2️⃣ Employee milestone rewards
1. **Automated Event Allocations**: Give points automatically on **birthdays, joining days, and work anniversaries**, including special tenure bonuses.
2. **Spend Forecasting**: Predict budgets using active headcount and expected new hires, equipped with **geo-location filtering**.

</section>

<video src="/project-imgs/continuous rewards/milestone.mp4" caption="Celebrating milestones without the manual work"></video>

<section>

### 3️⃣ Peer to peer rewards
1. **Standard allocation to all employees across the organization.**: 
Option to add exception to give more points to employees in certain teams.
2. **Additional points for managers:**
   Option to add an exception for managers of certain teams to get more points.

<br/>

</section>

<video src="/project-imgs/continuous rewards/p2p.mp4" caption="Celebrating milestones without the manual work"></video>

<section>

**Integration with touchpoints on the Keka Wall:**
The Keka social wall already had high usage for praises and wishes. To ensure the usage of the peer-to-peer feature, we integrated the points system directly on those touch points.

</section>

<img src="/project-imgs/continuous rewards/praisenwish.webp" caption="Celebrating milestones without the manual work"></img>

<section>

### 5️⃣ Transaction summary page for employees

We divided the employee wallet in two parts:
1. **Redeemable points** - These can only be used on the partner platform like XOXO days etc.
2. **Giftable points** - These can only be given to others before they lapse at the end of the month.

</section>

<img src="/project-imgs/continuous rewards/transaction-summary.webp" caption="Celebrating milestones without the manual work"></img>

<section>
<faq data='[{"question":"Did we design any guardrails for points usage?", "answer":"No, since we were catering to mid sized companies with 100-300 employees initially & to avoid overbuilding."}, {"question":"What could I have done better?", "answer":"Create a central budgeting system for all kind of reward programs for admins to manage in one place"}, {"question":"What was the most challenging part of the project?", "answer":"<ul><li>To get stakeholder buy-in and internal validation.</li><li>Integrating with the partner platform had a lot of complications due to which customers left the deal mid-way.</li></ul>"}]'></faq>
</section>