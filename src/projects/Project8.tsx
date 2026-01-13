import React from 'react';
import awards01 from "../utils/project-imgs/awards-revamp/dynamicCTAs.webp";
import wish01 from "../utils/project-imgs/awards-revamp/dynamicCTAs.webp";

const AwardRevamp: React.FC = () => {
    return (
        <div className="project-details">
            {/* Introduction Section */}
            <section>
                <h4>
                    How we moved from a "process-first" system to a human-centric experience by removing 10+ systemic restrictions.
                </h4>

                <h3>The Adoption Crisis:</h3>
                <ul>
                    <li><strong>Systemic Rigidity</strong>: Core details like nomination dates were uneditable post-launch, forcing HRs to restart or duplicate programs from scratch for minor changes.</li>
                    <li><strong>Identity Gap</strong>: A four-month delay in branding features meant companies were issuing generic, unbranded certificates.</li>
                    <li><strong>Operational Debt</strong>: Admins were "trapped" in draft states, requiring engineering intervention for routine workflow adjustments.</li>
                </ul>
            </section>

            {/* Visual: The Problem Space */}
            <figure>
                <img src="/images/awards-old-flow.png" alt="Original rigid award flow" />
                <figcaption>The original flow: A linear, "locked" path that didn't account for real-world HR changes.</figcaption>
            </figure>

            {/* The Evidence Section */}
            <section>
                <h3>🗣️ The Voice of the Customer</h3>
                <p>
                    To gain buy-in for a complete architectural shift, I moved the conversation from "design preference" to "customer truth" using raw recorded verbatims.
                </p>
                <blockquote>
                    "Everything—even admins—are not able to edit the date in the template... we are stuck."
                </blockquote>
                <blockquote>
                    "They said logos could be modified in some time, but it’s been more than four months."
                </blockquote>
            </section>

            {/* Strategy Section */}
            <section>
                <h3>🔍 The Strategy: Advocacy through Data</h3>
                <p>
                    I mapped out <strong>over 10 hard restrictions</strong> in the lifecycle. Every time we faced engineering pushback, I framed the design choices in terms of business loss—specifically, the deals we were failing to close and the trust we were losing.
                </p>
            </section>

            {/* Solution 1: Adaptive CTAs */}
            <section>
                <h3>💡 Solution I: Context-Aware Navigation</h3>
                <p>
                    We replaced static, disabled "Launch" buttons with <strong>Adaptive CTAs</strong>. The system now understands the state of the program and guides the admin accordingly.
                </p>
                <ul>
                    <li><strong>Dynamic Buttons</strong>: "Add Award Category" → "Launch" → "Close Nominations."</li>
                    <li><strong>Manual Overrides</strong>: Admins can now manually close nominations, mirroring how programs actually function in a physical office.</li>
                </ul>
            </section>

            <figure>
                <img src={awards01} alt="Adaptive CTA UI" />
                <figcaption>UI Iteration: CTAs that adapt based on program readiness and current state.</figcaption>
            </figure>

            {/* Solution 2: Branding & Ad-hoc */}
            <section>
                <h3>🎨 Solution II: Personalization & Spot Rewards</h3>
                <p>
                    We finally closed the branding loop and introduced a way to reward "the moments in between."
                </p>
                <ul>
                    <li><strong>Certificate Builder</strong>: A live preview engine for adding custom logos and authority signatures.</li>
                    <li><strong>Spot Rewards</strong>: A new module for bulk, non-automated recognition (e.g., winning a company hackathon).</li>
                </ul>
            </section>

            <figure>
                <img src="/images/cert-customization.png" alt="Certificate Customization Interface" />
                <figcaption>New Feature: High-fidelity certificate customization with live branding previews.</figcaption>
            </figure>

            {/* Results Section */}
            <section>
                <h2 className="results-title">📈 Impact: Internal Agility & Customer Trust</h2>
                <p>
                    This overhaul didn't just help customers; it revolutionized our internal development and QA cycles.
                </p>

                <blockquote>
                    <strong>From our QA Engineer:</strong><br />
                    “It’s so easy to test the module now since there are no restrictions. Earlier, I had to ask the engineer to change the state from the backend just to test it completely.”
                </blockquote>

                <ul>
                    <li><strong>Zero Backend Reliance</strong>: Admins (and internal QA) became 100% self-sufficient in managing program states.</li>
                    <li><strong>Enterprise Ready</strong>: The flexibility allowed us to support complex, role-based ownership for large-scale organizations.</li>
                    <li><strong>Feature Adoption</strong>: Resolved a 4-month-old branding backlog, directly impacting user retention.</li>
                </ul>
            </section>

            {/* Key Learnings */}
            <section>
                <h2 className="results-title">🗝️ Key Learnings</h2>
                <ol>
                    <li>
                        <strong>Design for the "Messy" Reality</strong>: Systems are often built for rigid, linear flows, but humans work in iterations.
                    </li>
                    <li>
                        <strong>Verbatims are Currency</strong>: Raw customer feedback is the fastest way to resolve a "difference of opinion" between design and engineering.
                    </li>
                    <li>
                        <strong>Internal Impact is UX too</strong>: Improving the workflow for QA and support teams is a valid and vital metric for success.
                    </li>
                </ol>
            </section>
        </div>
    );
};

export default AwardRevamp;