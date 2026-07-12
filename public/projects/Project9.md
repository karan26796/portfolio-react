<section>

### Sales teams kept hearing the same disqualifier: "Do you support nomination workflows?" Keka's award module could only do direct winner selection — we were out of deals before the comparison started.

#### To compete for organizations running formal R&R cycles, we rebuilt award programs from a gift catalog into a governed workflow — structured nominations, layered review, blind panels, and an announcement worth framing.

</section>

<section>

<!-- <details class="tldr-container">
<summary>
  <h3>Research & Findings, TL;DR:</h3>
  <ul>
    <li>Keka was <strong>losing enterprise evaluations</strong> because award programs had <strong>no nomination workflow and no questionnaire</strong> — panels received names with zero evidence attached.</li>
    <li>The shipped IA made <strong>one admin page serve four personas</strong> — admin config, personal nominations, org-wide oversight, and results sat as sibling tabs that reloaded on every switch.</li>
    <li>Program dates were <strong>set in stone at creation</strong> — customers couldn't adapt when cycles slipped, and our own QA had to recreate entire programs to test lifecycle transitions.</li>
    <li>The payoff moment fizzled: months of deliberation ended with <strong>no presentable winner certificate</strong>.</li>
  </ul>
  <span class="read-more-btn">Read full research context</span>
</summary>
<div class="tldr-content">

### 🔍 The trigger
#### The award programs MVP had been adopted by 100+ organizations — but the prospects we were now selling to ran formal R&R cycles: employees nominate with written justification, nominations pass through approval layers, a panel deliberates, and winners receive something worth sharing.

When sales demoed against that expectation, there was no nomination workflow to show and no questionnaire to capture *why* someone deserved an award. We weren't losing feature comparisons — we were disqualified before the comparison started.

### 🔍 Auditing what we had shipped
#### Looking at the live product honestly, four problems compounded each other:

1. **Nomination was hollow.** Nominators existed as a persona, but nominating meant picking a name — no evidence, no justification. Review meant reading free-text comments and flipping a status. The program header said it all: *Nominators: 68, Eligible candidates: 68* — nomination scope wasn't a decision, it was a default.
2. **One page served four audiences.** "Awards and Review Panel", "My Nominees", "All Nominees", and "Winners" sat as sibling tabs on the admin's page — a personal task list twenty pixels away from an org-wide oversight view. The tabs sat *above* the award list, so switching views reloaded the page and dropped the user's award context.
3. **Dates were carved in stone.** Nomination and winner-selection dates were fixed at program creation and non-editable after launch. Customers couldn't adapt when a cycle slipped — and QA couldn't test lifecycle transitions without recreating programs from scratch. When your own team has to work around the product to verify it, the model is wrong.
4. **The ending had no ceremony.** The entire program builds toward announcing winners — precisely the moment HR shows leadership what the tool delivered — and we had no decent certificate template.

</div>
</details> -->

### 1️⃣ Nomination became a deliberate choice, not a default
The new creation wizard forks explicitly on **"Require nominations?"** — direct panel selection stays a one-step path, while opting in unlocks the full workflow. Nominator scope is now a real decision: **specific roles** (reporting manager, L2, dotted-line, department head, HR admin), **named employees**, or everyone.

<blockquote>"Do you have an approval process for nominations? Our awards go through the department head before the committee sees them."</blockquote>

</section>

<img src="/project-imgs/award-programs/creation-wizard-basic-details.webp" caption="The nomination fork — progressive disclosure keeps the simple path simple"></img>

<img src="/project-imgs/award-programs/nominator-scoping.webp" caption="Defining who can nominate: roles, named employees, or everyone"></img>

<section>

### 2️⃣ An N-level review chain between nominators and panels
Nominations now route through **up to three review levels**, each holding **one role and one employee** — with a **fallback recipient** when the role isn't mapped in the org structure. Locked endpoints (Nominators → Panelists) anchor the chain visually; the levels in between are the admin's to shape.

<blockquote>"What happens if the nominee's L2 manager doesn't exist in the system? The nomination can't just disappear."</blockquote>

</section>

<img src="/project-imgs/award-programs/review-chain-builder.webp" caption="The workflow builder — nominations flow through named, accountable review levels"></img>

<section>

### 3️⃣ Structured evidence instead of comment threads
Each award category now carries a **nomination questionnaire** — configured once, **copied forward to subsequent categories**, editable per category. Answers render inline as the substance reviewers and panelists actually evaluate, replacing the old pattern where verdicts lived in comment threads behind a "View comments" link.

</section>

<img src="/project-imgs/award-programs/nomination-questionnaire-builder.webp" caption="Question builder — configured once, inherited by subsequent categories"></img>

<img src="/project-imgs/award-programs/reviewer-evidence-view.webp" caption="Reviewers evaluate structured answers, not bare names"></img>

<section>

### 4️⃣ Inverting the IA: every persona gets their own workspace
The old page made everyone share the admin's tabs. The new IA makes **category the primary axis** — a persistent left rail with per-category progress — and gives each persona a dedicated surface: nominators see their quota and drafts, reviewers see a **pending / approved / declined pipeline** with "Approve & forward", and panelists get a **blind selection view** where scores stay hidden while the window is active.

<blockquote>"Every time I switched from All Nominees to Winners, the page reloaded and I lost the award I was looking at."</blockquote>

</section>

<img src="/project-imgs/award-programs/ia-before-after.webp" caption="Before: four personas sharing the admin's tabs. After: category-first rail, persona-specific workspaces"></img>

<img src="/project-imgs/award-programs/panelist-blind-view.webp" caption="Panelists judge without seeing each other's scores"></img>

<section>

### 5️⃣ Dates became editable and staged
Creation now produces a **Draft**; the three windows — **nomination end, review end, winner announcement** — are set when the admin deliberately opens nominations, and **stay editable after launch**. What unblocked our QA's lifecycle testing also unblocked every customer whose award cycle slips.

<blockquote>"To test the winner-announcement flow I had to create a fresh program and wait for the dates — every single time."</blockquote>

</section>

<img src="/project-imgs/award-programs/open-nominations-dates.webp" caption="Windows are opened deliberately — and can change when reality does"></img>

<section>

### 6️⃣ Giving the announcement its moment
Winners now receive a **customizable certificate** — certificate text lives on each category, the template on the program. The moment HR presents outcomes to leadership finally has an artifact worth sharing.

</section>

<img src="/project-imgs/award-programs/certificate-customization.webp" caption="Certificate customization — the payoff moment, designed"></img>

<img src="/project-imgs/award-programs/winner-announcement.webp" caption="Winner announcement with certificate"></img>

<section style="max-width: 100%;">
<faq data='[{"question":"Why cap the review chain at three levels?", "answer":"Customer research showed real approval chains rarely exceeded 2 levels; 3 gave headroom without inviting bureaucracy."}, {"question":"What could I have done better?", "answer":"Scheduling programs ahead with start dates, and giving nominees transparency on where their nomination stands in the review chain."}, {"question":"What was the most challenging part of the project?", "answer":"Designing the state matrix across every config permutation — nominations on/off x review levels 0–3 — and ensuring existing customers migrated cleanly from the old IA without losing program data."}, {"question":"What was the business outcome?", "answer":"The nomination workflow directly unblocked enterprise deals that had stalled at the evaluation stage. Beta programs reached the announcement phase for the first time."}]'></faq>
</section>
