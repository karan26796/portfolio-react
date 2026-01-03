import React from "react";
import protoNotes from "../utils/project-imgs/loop-note/proto-notes.webp";
import iteration01 from "../utils/project-imgs/loop-note/iteration-01.webp";
import iteration02 from "../utils/project-imgs/loop-note/iteration-02.webp";
import iteration03 from "../utils/project-imgs/loop-note/iteration-03.webp";
import updatedNote from "../utils/project-imgs/loop-note/updated-note.webp";
import loopNoteNotes from "../utils/project-imgs/loop-note/loop-note-notes.webp";
import task1 from "../utils/project-imgs/loop-note/task-1.png";
import task2 from "../utils/project-imgs/loop-note/task-2.png";
import iteration1 from "../utils/project-imgs/loop-note/iteration-1.webp";
import iteration2 from "../utils/project-imgs/loop-note/iteration-2.webp";
import finalDesign from "../utils/project-imgs/loop-note/final-design.webp";
import editorQuestion from "../utils/project-imgs/loop-note/editor-question.webp";

import "../styles/ProjectDetails.scss";

const Project1: React.FC = () => {
  return (
    <div className="project-details">
      <section>
        <h3>The Challenge</h3>
        <h4>
          Based on research, it takes 5-6 rewatches of a user interview to
          get actionable insights. A 1-hour interview often consumes
          5-6 hours of tagging and summarization.
        </h4>
        <p>
          To drive research velocity, we designed an AI-powered note-taker that allows researchers to capture structured insights in real-time during Zoom interviews.
        </p>
      </section>

      <section>
        <h3>Prototyping & Strategic Pivots</h3>
        <h4>
          I developed an interactive prototype in ProtoPie to test real-world note-taking velocity.
        </h4>
      </section>

      <figure>
        <img src={protoNotes} alt="Zoom and Looppanel working side by side" />
        <figcaption>Interactive prototype: Testing real-time capture during live calls.</figcaption>
      </figure>

      <section>
        <h3>Informed Pivot I: Breaking the Chat Mental Model</h3>
        <p>
          Early iterations looked like a chat window. Users felt this was too transactional and lacked the "workspace" feel needed for professional research. We pivoted to a more open, document-centric layout.
        </p>
      </section>

      <figure>
        <img src={iteration01} alt="Early chat-like iteration" />
        <figcaption>Iteration 1: The 'Chat' mental model.</figcaption>
      </figure>

      <figure>
        <img src={iteration02} alt="Transitioning to doc view" />
        <figcaption>Iteration 2: Moving towards document structures.</figcaption>
      </figure>

      <section>
        <h3>Informed Pivot II: Navigational Clarity</h3>
        <p>
          Shortcuts and cluttered secondary panels were removed after testing showed they increased cognitive load during high-stakes interviews.
        </p>
      </section>

      <figure>
        <img src={iteration03} alt="Testing secondary panels" />
        <figcaption>Testing: Identifying cognitive friction in complex panels.</figcaption>
      </figure>

      <section>
        <h3>Refining for Seamless Integration</h3>
        <h4>
          By aligning the interface with familiar tools like Notion and Google Docs, we reduced the learning curve for new researchers.
        </h4>
      </section>

      <figure>
        <img src={updatedNote} alt="Doc-like notetaking view" />
        <figcaption>Final design: A document-centric view that prioritizes focus and ease of use.</figcaption>
      </figure>

      <figure>
        <img src={loopNoteNotes} alt="High-fidelity editor view" />
        <figcaption>Editor View: The final high-fidelity note-taking workspace.</figcaption>
      </figure>

      <section>
        <ol>
          <li>
            <strong>Focused Interaction</strong>: Muted administrative metadata to bring focus to the core note.
          </li>
          <li>
            <strong>Contextual Shortcuts</strong>: Integrated a "//" bookmarking feature to capture key moments without breaking eye contact with the participant.
          </li>
        </ol>
      </section>

      <section>
        <h3>Scaling Through Structured Templates</h3>
        <h4>
          We identified that researchers often followed theme-based or task-based scripts. I integrated these scripts directly into the note-taking flow.
        </h4>
      </section>

      <figure>
        <img src={task1} alt="Theme-based template" />
        <figcaption>Researcher Workflow: Theme-based scripts.</figcaption>
      </figure>

      <figure>
        <img src={task2} alt="Task-based template" />
        <figcaption>Researcher Workflow: Task-based scripts.</figcaption>
      </figure>

      <section>
        <h3>Iterative Testing: Question Script Navigation</h3>
        <p>
          We explored various ways to surface these scripts, eventually pivoting away from complex side-menus to a more integrated, progressive disclosure model.
        </p>
      </section>

      <figure>
        <img src={iteration1} alt="Shortcut-based navigation" />
        <figcaption>Pivot: Shortcuts proved too complex for live calls.</figcaption>
      </figure>

      <figure>
        <img src={iteration2} alt="Side-menu approach" />
        <figcaption>Pivot: Side menus cluttered the workspace.</figcaption>
      </figure>

      <figure>
        <img src={finalDesign} alt="Final design with a question list" />
        <figcaption>Structured insights: Aligning real-time notes with project-wide research questions.</figcaption>
      </figure>

      <figure>
        <img src={editorQuestion} alt="Questions in the editor" />
        <figcaption>Integrated Workflow: Scripts surfaced directly within the synthesis editor.</figcaption>
      </figure>

      <section>
        <h2 className="results-title">📈 Results & Key Learnings</h2>
        <ol>
          <li>
            <strong>5x Faster Insights</strong>: Teams moved from days to hours in their synthesis phase.
          </li>
          <li>
            <strong>Velocity through Simplicity</strong>: Reducing shortcuts and persistent menus actually increased speed by lowering cognitive friction.
          </li>
          <li>
            <strong>Flexible Structures</strong>: Found that a hybrid of unstructured notes and structured questions provided the most versatile solution for diverse research styles.
          </li>
        </ol>
      </section>
    </div>
  );
};

export default Project1;
