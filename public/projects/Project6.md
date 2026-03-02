<section>

<!-- ### 🤔 What are continuous rewards?
#### Companies use rewards to retain & engage employees. Usually they recognize their employees in two ways:

1. **Formal award programs** - Low frequency, high impact awards like employee of the month, craftsmanship awards etc.
2. **Day-to-day rewards** - Employer and peer led rewards, usually given on special days like birthdays, work anniversaries, joining date, child birth etc.


<details class="tldr-container">
<summary>
  <h3>Research & Findings, TL;DR:</h3>
  <ul>
    <li>Keka aimed to <strong>consolidate HR and Rewards platforms</strong> into a complete suite for the US market, unlocking a <strong>direct new revenue stream</strong>.</li>
    <li>To bridge fragmented systems, Keka's native point distribution was unified with a <strong>dedicated external partner redemption platform</strong> (XOXO Days).</li>
    <li>Customer research revealed that organizations require <strong>highly bespoke reward systems</strong> tailored to their distinct corporate vernacular.</li>
    <li>The platform had to provide <strong>granular control over milestones, budgets, and complex hierarchical point distribution</strong> across global teams.</li>
  </ul>
  <span class="read-more-btn">Read full research context</span>
</summary>
<div class="tldr-content">

### 🔍 The market gap
#### Based on market research we realized that companies were using separate HRMS and Recognition platforms, like Empuls, Vantage Circle, Survey Sparrow etc.

#### This led to them maintaining two systems that don't talk to each other. A lot of context that the HR system can provide them was lost due to this, on top of the additional cost.

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
2. **The same person usually runs HR ops and rewards** in the company, sometimes there's a financial head involved.
3. **Rewards are usually distributed hierarchically.** Managers, different teams receive rewards basis their unique needs.
   <blockquote>"What if a manager has 3 people reporting to them, and the other has 5? We want to give more points to the manager who has 5 reportees."</blockquote>
4. **A lot of the companies had workforce in more than 1 country.** To accommodate them, global conversions had to be designed.
5. **Companies wanted to have granular control over the program,** ability to stop redemption from the platform, limit the points one can carry forward at the end of the year, how many points can peers exchange among each other at once etc.
6. **Companies usually give out additional benefits to tenured people** on work anniversaries.

</div>
</details>

## 🛠️ Designing the Platform
#### We took these findings and started designing. The program was split into two parts: Employee milestone rewards and Peer-to-peer rewards. -->

### 1️⃣ Platform integration
Admins connect to the **partner platform (XOXO Days)** via a redirect link, can **rename and brand** their rewards, set **geo-specific conversion rates**, and limit how many **points employees can carry forward**.

<blockquote>"Employees give out donuts to each other on slack and whoever has the most donuts at the end of the month gets a donut box"</blockquote>

</section>

<video src="/project-imgs/continuous rewards/marketplace.mp4" caption="High-Impact recognition: Bringing informal practices into a structured, rewarding system"></video>

<section>

### 2️⃣ Employee milestones
Points are given out automatically on **birthdays, work anniversaries, and joining dates** — with **extra bonuses for long tenure**. Admins can **forecast budget** based on headcount and location.

<blockquote>"We give extra reward points to people who have been with the company for more than 5 years"</blockquote>

</section>

<video src="/project-imgs/continuous rewards/milestone.mp4" caption="Celebrating milestones without the manual work"></video>

<section>

### 3️⃣ P2P rewards
Every employee gets a **standard points allocation**. Managers and specific teams can get more — admins can **set exceptions per team or role**.

<blockquote>"We want to give extra reward points to managers who have more people reporting to them and teams that have performance based incentives"</blockquote>

</section>

<video src="/project-imgs/continuous rewards/p2p.mp4" caption="Celebrating milestones without the manual work"></video>

<section>

### 4️⃣ Integration with Keka wall
The **Keka social wall** already had high usage for praises and wishes. To drive adoption of the **peer-to-peer feature**, we integrated the points system directly into those touch points.

</section>

<img src="/project-imgs/continuous rewards/praisenwish.webp" caption="Celebrating milestones without the manual work"></img>

<section>

### 5️⃣ Transaction summary

The employee wallet is split into two: **Redeemable points**, which can only be spent on the partner platform (like XOXO Days), and **Giftable points**, which can only be given to peers before they lapse at the end of the month.

</section>

<img src="/project-imgs/continuous rewards/transaction-summary.webp" caption="Celebrating milestones without the manual work"></img>

<section style="max-width: 100%;">
<faq data='[{"question":"Did we design any guardrails for points usage?", "answer":"No, since we were catering to mid sized companies with 100-300 employees initially & to avoid overbuilding."}, {"question":"What could I have done better?", "answer":"Create a central budgeting system for all kind of reward programs for admins to manage in one place"}, {"question":"What was the most challenging part of the project?", "answer":"<ul><li>To get stakeholder buy-in and internal validation.</li><li>Integrating with the partner platform had a lot of complications due to which customers left the deal mid-way.</li></ul>"}]'></faq>
</section>