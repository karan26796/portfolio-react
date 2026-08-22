<section>

### The Why
#### The Rewards module was launched as an MVP 2 years ago and hadn't been updated since, causing business friction.

- **Lost Deals:** Keka was losing enterprise deals because the suite was missing basic features.
- **Customer Churn:** Users were leaving due to unfulfilled feature promises.
- **Low Adoption:** The module wasn't prioritized, leading to a spike in customer complaints.

</section>

<section>

### Customer Interviews
Ran 6 customer calls and 4 sales calls myself to hear the friction firsthand, instead of working off secondhand requirements.

</section>

<img src="/project-imgs/award program/user interview.webp" caption="Customer interviews: Gathering friction points directly from researchers and sales teams."></img>

<section>

### NotebookLM Analysis
Fed the raw call transcripts into NotebookLM to cluster recurring complaints and surface the patterns worth acting on.

</section>

<img src="/project-imgs/award program/analysis.webp" caption="NotebookLM Analysis: Clustering raw call transcripts to surface recurring pain points."></img>

<section>

### Descript Buy-In Clip
Cut a 1-minute Descript snippet from client calls and shared it with stakeholders — hearing customers in their own words got buy-in faster than a slide of quotes.

</section>

<img src="/project-imgs/award program/user interview.webp" caption="Customer interviews: Gathering friction points directly from researchers and sales teams."></img>

<section>

### Top Issues for Customers
I logged every issue from those calls into a spreadsheet, segregated by category, to turn scattered feedback into a prioritized list:

</section>

<img src="/project-imgs/award program/roadmap.webp" caption="Feedback Prioritization: Logging and categorizing customer friction into a clear roadmap."></img>

<section>

### PRD for the team on ClickUp
Documented product requirements and user stories on ClickUp for direct engineering handoff.

</section>

<img src="/project-imgs/award program/PRD.webp" caption="PRD on ClickUp: Defining specifications, scope, and acceptance criteria for engineering."></img>

<section>

### Feature Prioritization

<div class="decision-container">
    <div class="decision-column">
        <h4>✅ Picked</h4>
        <div class="tag-group">
            <span class="tag-parent" style="transform: rotate(0deg);"><span class="tag" style="color: #03ca81ff">Edit programs post-launch</span></span>
            <span class="tag-parent" style="transform: rotate(0deg);"><span class="tag" style="color: #03ca81ff">Branded certificates</span></span>
            <span class="tag-parent" style="transform: rotate(0deg);"><span class="tag" style="color: #03ca81ff">Ad-hoc rewards</span></span>
            <span class="tag-parent" style="transform: rotate(0deg);"><span class="tag" style="color: #03ca81ff">Icon customization</span></span>
        </div>
    </div>
    <div class="decision-column not-picked">
        <h4>❌ Not Picked</h4>
        <div class="tag-group">
            <span class="tag-parent" style="transform: rotate(0deg);"><span class="tag" style="color: #5f6368">Reporting dashboards</span></span>
            <span class="tag-parent" style="transform: rotate(0deg);"><span class="tag" style="color: #5f6368">Role-based visibility</span></span>
            <span class="tag-parent" style="transform: rotate(0deg);"><span class="tag" style="color: #5f6368">Team size restrictions</span></span>
        </div>
    </div>
</div>

</section>

<section>

### Part I: Removing System Restrictions
The old system was a "locked" linear path. If the admin went ahead, there was no way to undo or start over. They had to create a new program each time there was an impromptu change. Drag the slider — or scroll — to compare the old vs. redesigned experience:

<div class="wipe-compare-wrapper">
    <wipe-compare before="/project-imgs/award program/Old-01.webp" after="/project-imgs/award program/New-01.webp" beforelabel="Old" afterlabel="New" beforecaption="Old: Too many options on the empty state" aftercaption="New: Only one action on the screen for the user to proceed"></wipe-compare>
</div>

<div class="wipe-compare-wrapper">
    <wipe-compare before="/project-imgs/award program/Old-02.webp" after="/project-imgs/award program/New-02.webp" beforelabel="Old" afterlabel="New" beforecaption="Old: Award category cards that were not actionable" aftercaption="New: A clean side panel for categories with details on right"></wipe-compare>
</div>

<div class="wipe-compare-wrapper">
    <wipe-compare before="/project-imgs/award program/Old-04.webp" after="/project-imgs/award program/New-04.webp" beforelabel="Old" afterlabel="New" beforecaption="Old: Dates entered once and locked in" aftercaption="New: A banner spells out that dates are editable anytime, until winners are announced"></wipe-compare>
</div>

<div class="wipe-compare-wrapper">
    <wipe-compare before="/project-imgs/award program/Old-05.webp" after="/project-imgs/award program/New-05.webp" beforelabel="Old" afterlabel="New" beforecaption="Old: Program can't move until the nominee closing date is crossed " aftercaption="New: A real &quot;Close nominations&quot; trigger, the moment it's needed"></wipe-compare>
</div>

<!-- <div class="wipe-compare-wrapper">
    <wipe-compare before="/project-imgs/award program/Old-06.webp" after="/project-imgs/award program/New-06.webp" beforelabel="Old" afterlabel="New" beforecaption="Old: Just a category list with a nominee count" aftercaption="New: A real nominee table, name by name"></wipe-compare>
</div> -->

<div class="wipe-compare-wrapper">
    <wipe-compare before="/project-imgs/award program/Old-07.webp" after="/project-imgs/award program/New-07.webp" beforelabel="Old" afterlabel="New" beforecaption="Old: Countdown-only for winner selection too" aftercaption="New: &quot;Announce winners&quot; — a real action, not a wait"></wipe-compare>
</div>

</section>

<section>

### Part II: Certificate Branding
Customers often abandoned the program because they couldn't add their own logos or signatures.

- **In-Program Editing:** Moved away from a centralized asset library that caused restrictive setup.
- **Live Preview:** Admins can now customize certificates for each specific program to match their brand identity.

</section>

<img src="/project-imgs/award program/certificate design.webp" caption="In-Program Certificate Branding: Customizing logos, signatures, and visual themes with live preview."></img>

<section>

### Part III: Ad-hoc Points (Spot Rewards V1)
Companies wanted to reward "the moments in between" like hackathons or sports days.

- **Non-Platform Events:** Created a way to give on-the-spot recognition for wins that don't happen inside the software.
- **Bulk Allocation:** Admins can now select specific employees by department or location to reward them instantly.

</section>

<img src="/project-imgs/award program/ad-hoc rewards.webp" caption="Ad-hoc Rewards: Instant spot points allocation for non-platform team achievements."></img>

<section>

### Impact

- **10+ Restrictions Removed:** Unblocking the core workflow for users.
- **20+ Customers Unblocked:** Directly addressing the churn and deal-loss issues.
- **Internal Agility:** Our QA Lead noted that testing is much faster now that backend intervention isn't required.

</section>

<section style="max-width: 100%;">
<faq data='[{"question":"How was handoff and shipping managed without a PM?", "answer":"Once the designs were validated, I handed them off directly to engineering — no PM in the loop to broker scope or sequencing. It shipped across two sprints."}, {"question":"What were the key learnings from this project?", "answer":"<ul><li><strong>Users faced basic broken loop problems, but were overall happy with the product.</li><li><strong>Verbatims make the strongest case:</strong> Raw customer feedback is the fastest way to resolve a \"difference of opinion\" between design and engineering.</li><li><strong>Internal Impact is UX too:</strong> Improving the workflow for QA and support teams is a vital metric for success.</li><li><strong>No PM, No Problem:</strong> Tools like NotebookLM and Descript let me compress discovery and stakeholder alignment into work I could do solo, on the same timeline a PM-backed team would run.</li></ul>"}]'></faq>
</section>
