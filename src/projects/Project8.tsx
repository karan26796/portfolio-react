import React from 'react';
import Tag, { VibrantColor } from "../components/Tag";

const AwardRevamp: React.FC = () => {
    const greenColor: VibrantColor = { text: '#1e8e3e' };
    const grayColor: VibrantColor = { text: '#5f6368' };

    return (
        <div className="project-details">
            {/* The Why (Business Case) */}
            {/* The Why (Business Case) */}
            <section className="business-case">
                <h3>The Why</h3>
                <p>
                    The Rewards module was launched 2 years ago as an MVP and hadn't been updated since.
                    This led to serious business issues:
                </p>
                <div className="card-grid">
                    <div className="impact-card">
                        <h4>Lost Deals</h4>
                        <p>Keka was losing deals because the suite was missing basic features.</p>
                    </div>
                    <div className="impact-card">
                        <h4>Customer Churn</h4>
                        <p>Users were leaving because of feature promises that weren't delivered.</p>
                    </div>
                    <div className="impact-card">
                        <h4>Low Adoption</h4>
                        <p>The module wasn't prioritized, leading to a spike in customer complaints.</p>
                    </div>
                </div>
            </section>

            {/* Research & Prioritization */}
            <section className="prioritization">
                <h3>Top Issues for Customers</h3>
                <p>Based on 6 customer calls and 4 sales calls, we identified what to build:</p>

                <div className="decision-container">
                    <div className="decision-column">
                        <h4>✅ Picked</h4>
                        <div className="tag-group">
                            <Tag text="Edit programs post-launch" color={greenColor} rotation={0} variant="small" />
                            <Tag text="Branded certificates" color={greenColor} rotation={0} variant="small" />
                            <Tag text="Ad-hoc rewards" color={greenColor} rotation={0} variant="small" />
                            <Tag text="Icon customization" color={greenColor} rotation={0} variant="small" />
                        </div>
                    </div>
                    <div className="decision-column not-picked">
                        <h4>❌ Not Picked</h4>
                        <div className="tag-group">
                            <Tag text="Reporting dashboards" color={grayColor} rotation={0} variant="small" />
                            <Tag text="Role-based visibility" color={grayColor} rotation={0} variant="small" />
                            <Tag text="Team size restrictions" color={grayColor} rotation={0} variant="small" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Part 1: Restriction Removal */}
            <section>
                <h3>Part I: Removing System Restrictions</h3>
                <p>The old system was a "locked" linear path. If the admin went ahead, there was no way to undo or start over. They had to create a new program each time there was some impromptu change to be made.</p>
                <ul>
                    <li><strong>Flexible Dates:</strong> Admins can now change dates anytime until winners are announced.</li>
                    <li><strong>Manual Workflow:</strong> Replaced the rigid automated flow with manual triggers like "Close Nominations" and "Reopen".</li>
                </ul>
            </section>

            {/* Part 2: Certificate Customization */}
            <section>
                <h3>Part II: Certificate Branding</h3>
                <p>Customers often abandoned the program because they couldn't add their own logos or signatures.</p>
                <ul>
                    <li><strong>In-Program Editing:</strong> We moved away from a "centralized" asset library that caused more restrictions.</li>
                    <li><strong>Live Preview:</strong> Admins can now customize certificates for each specific program to match their brand.</li>
                </ul>
            </section>

            {/* Part 3: Spot Rewards */}
            <section>
                <h3>Part III: Ad-hoc Points (Spot Rewards V1)</h3>
                <p>Companies wanted to reward "the moments in between" like hackathons or sports days.</p>
                <ul>
                    <li><strong>Non-Platform Events:</strong> Created a way to give on-the-spot recognition for wins that don't happen inside the software.</li>
                    <li><strong>Bulk Allocation:</strong> Admins can now select specific employees by department or location to reward them instantly.</li>
                </ul>
            </section>

            {/* Impact */}
            <section>
                <h2 className="results-title">Impact</h2>
                <ul>
                    <li><strong>10+ Restrictions Removed:</strong> Unblocking the core workflow for users.</li>
                    <li><strong>20+ Customers Unblocked:</strong> Directly addressing the churn and deal-loss issues.</li>
                    <li><strong>Internal Agility:</strong> Our QA Lead noted that testing is much faster now that backend intervention isn't required.</li>
                </ul>
            </section>

            <section>
                <h2 className="results-title">🗝️ What I learned</h2>
                <ol>
                    <li><strong>Design for the "Messy" Reality:</strong> Systems are built for rigid flows, but humans work in iterations.</li>
                    <li><strong>Verbatims are Currency:</strong> Raw customer feedback is the fastest way to resolve a "difference of opinion" between design and engineering.</li>
                    <li><strong>Internal Impact is UX too:</strong> Improving the workflow for QA and support teams is a vital metric for success.</li>
                </ol>
            </section>
        </div>
    );
};

export default AwardRevamp;