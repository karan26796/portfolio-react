import React from 'react';
import DocumentationLayout from '../components/DocumentationLayout';

const Overview: React.FC = () => {
    return (
        <DocumentationLayout>
            <header>
                <h1>Overview</h1>
                <p className="tagline">Point at problems, not code</p>
            </header>

            <section>
                <div className="hero-demo-container">
                    {/* Placeholder for the interactive demo or image */}
                    <div className="hero-demo-placeholder">
                        <div className="placeholder-text">
                            (Interactive Demo Placeholder)
                        </div>
                        <p className="placeholder-subtext">
                            In a real implementation, this would be a complex interactive component replicating the dashboard demo.
                        </p>
                    </div>
                </div>
            </section>

            <section>
                <p>
                    <strong>Agentation</strong> (<span className="text-muted">agent + annotation</span>) is a dev tool that lets you annotate elements on your webpage and generate structured feedback for AI coding agents.
                </p>
                <p>
                    Click elements, select text, add notes, and paste the output into Claude Code, Cursor, or any agent that has access to your codebase. It’s fully agent-agnostic, so the markdown output works with any AI tool. Zero dependencies beyond React.
                </p>
                <p>
                    The key insight: agents can find and fix code much faster when they know exactly which element you’re referring to. Agentation captures class names, selectors, and positions so the agent can locate the corresponding source files.
                </p>
                <p>
                    It grew out of <a href="#" className="link-styled">a post by Benji Taylor</a> exploring how to give better feedback to AI coding agents.
                </p>
            </section>

            <section>
                <h2>Quick start</h2>
                <ol>
                    <li>Click the <span className="icon-box">⚡</span> icon in the bottom-right corner to activate</li>
                    <li><strong>Hover</strong> over elements to see their names highlighted</li>
                    <li><strong>Click</strong> any element to add an annotation</li>
                    <li>Write your feedback and click <strong>Add</strong></li>
                    <li>Click <span className="icon-box">❐</span> to copy formatted markdown</li>
                    <li>Paste into your agent</li>
                </ol>
            </section>

            <section>
                <h2>How it works with agents</h2>
                <p>Agentation works best with AI tools that have access to your codebase (Claude Code, Cursor, Windsurf, etc.):</p>
                <ol>
                    <li>You see a bug or want a change in your running app</li>
                    <li>Use Agentation to annotate the element with your feedback</li>
                    <li>Copy the output and paste it into your agent</li>
                    <li>The agent uses the class names and selectors to <strong>search your codebase</strong></li>
                    <li>It finds the relevant component/file and makes the fix</li>
                </ol>
                <p>
                    Without Agentation, you’d have to describe the element (“the blue button in the sidebar”) and hope the agent guesses right. With Agentation, you give it <span className="code-block">.sidebar &gt; .nav-actions &gt; button.primary</span> and it can grep for that directly.
                </p>
            </section>

            <section className="demo-section">
                <h2>Try it</h2>
                <p>The toolbar is active on this page. Try annotating these demo elements:</p>

                <div className="demo-elements">
                    <div className="button-group">
                        <button className="demo-button primary">Primary Button</button>
                        <button className="demo-button secondary">Secondary Button</button>
                    </div>

                    <input className="demo-input" type="text" placeholder="Try selecting this text..." />

                    <div className="demo-card">
                        <h3>Example Card</h3>
                        <p>Click on this card or select this text to create an annotation. The output will include the element path and your feedback.</p>
                    </div>
                </div>
            </section>

            <section className="demo-section">
                <h2>Animation pause demo</h2>
                <p>Click <span className="icon-box">⏸</span> in the toolbar to freeze this animation:</p>
                <div className="animation-demo animation-demo-container">
                    {/* Simple animation demo */}
                    <div className="progress-bar-track">
                        <div className="progress-bar-fill"></div>
                    </div>
                </div>
            </section>

            <section>
                <h2>Best practices</h2>
                <ul>
                    <li><strong>Be specific</strong> — “Button text unclear” is better than “fix this”</li>
                    <li><strong>One issue per annotation</strong> — easier for the agent to address individually</li>
                    <li><strong>Include context</strong> — mention what you expected vs. what you see</li>
                    <li><strong>Use text selection</strong> — for typos or content issues, select the exact text</li>
                    <li><strong>Pause animations</strong> — to annotate a specific animation frame</li>
                </ul>
            </section>

            <footer className="documentation-footer">
                <div>
                    Made by Benji Taylor, Dennis Jin, and Alex Vanderzon
                </div>
                <div>
                    <a href="#">Colophon</a>
                </div>
            </footer>

        </DocumentationLayout>
    );
};

export default Overview;
