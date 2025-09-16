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
        <h6>Part I</h6>
        <h3>Let's start with the problem</h3>
        <h4>
          Based on research, it takes 5-6 rewatches of a user interview to
          get actionable insights out of it. Therefore, a 1 hour interview takes
          5-6 hours to tag, summarize, and share with one's team.
        </h4>
        <p>
          To make it easier for teams to get the most out of research calls and
          projects, we designed a note-taker that lets researchers take notes
          while taking an interview on Zoom.
        </p>
      </section>

      <section>
        <h6>First cut</h6>
        <h3>Usability Testing</h3>
        <h4>
          I created a prototype in Protopie to mock how people will take notes
          in Looppanel.
        </h4>
      </section>

      <figure>
        <img src={protoNotes} alt="Zoom and Looppanel working side by side" />
        <caption>Zoom and Looppanel working side by side</caption>
      </figure>

      <section>
        <h4 className="red">What Didn't work</h4>
        <ol>
          <li>
            The users weren't able to use the shortcuts or the controls in the
            interface.
          </li>
          <li>
            The interface looked like a chat window which the users couldn't
            connect with.
          </li>
        </ol>
      </section>

      <section>
        <h3>Second iteration for Usability Testing</h3>
        <h4>
          I removed the shortcuts and added some instructions for people to
          understand the note taking screen
        </h4>
      </section>

      <figure>
        <img src={iteration01} alt="Instructive note-taking with two panels" />
        <caption>Instructive note-taking with two panels</caption>
      </figure>

      <section>
        <h4 className="red">What Didn't work</h4>
        <ol>
          <li>The interface wasn't suited for a split screen use.</li>
          <li>People didn't use the bookmarking feature a lot.</li>
        </ol>
      </section>

      <section>
        <h3>Third iteration for Usability Testing</h3>
        <h4>
          Since a lot of people during our research used Notion and Google Docs,
          I tried making the interface as close to those tools as possible.
        </h4>
      </section>

      <figure>
        <img src={iteration02} alt="Instructive note-taking with two panels" />
        <caption>Instructive note-taking with two panels</caption>
      </figure>

      <section>
        <h4 className="red">What Didn't work</h4>
        <ol>
          <li>The interface didn't work visually.</li>
        </ol>
      </section>

      <section>
        <h3>Fourth iteration for Usability Testing</h3>
        <h4>
          To highlight who's taken the note, I added the names of note takers in
          different colors
        </h4>
      </section>

      <figure>
        <img src={iteration03} alt="Note taking with names and time stamp" />
        <caption>Note taking with names and time stamp</caption>
      </figure>

      <section>
        <h4 className="red">What Didn't work</h4>
        <ol>
          <li>
            The different colors for note takers created distraction during note
            taking.
          </li>
          <li>
            The name of note takers takes up a lot of space without adding much
            to the interface
          </li>
        </ol>
      </section>

      <section>
        <h3>Final Design based on testing</h3>
        <h4>
          People didn't expect the note-taking space to look like a chat, so we
          changed it into a more open space that makes the experience similar to
          a document.
        </h4>

        <ol>
          <li>
            Muted the name and time stamp colors to bring focus on the note.
          </li>
          <li>
            Removed the emojis as they could not be interacted with during the
            call.
          </li>
          <li>
            Added a bookmark feature which could be accessed using the "//"
            shortcut. This reduces the number of decisions a person makes during
            the call.
          </li>
        </ol>
      </section>

      <figure>
        <img src={updatedNote} alt="Doc-like notetaking view" />
        <caption>Doc-like notetaking view</caption>
      </figure>
      <figure>
        <img src={loopNoteNotes} alt="Editor View with notes" />
        <caption>Editor View with notes</caption>
      </figure>

      <section>
        <h2>Part II: Structured note-taking</h2>
        <h4>
          We observed researchers were using a template to take notes during
          research calls. The templates either contained theme-based
          questionnaire or task-based questionnaire.
        </h4>
        <p>Below are some examples of the templates they use.</p>
      </section>

      <figure>
        <img src={task1} alt="Theme-based questionnaire" />
        <caption>Theme-based questionnaire</caption>
      </figure>

      <figure>
        <img src={task2} alt="Task-based questionnaire" />
        <caption>Task-based questionnaire</caption>
      </figure>

      <section>
        <h3>Iterating and testing a question script</h3>
        <h4>
          We iterated on top of previous designs and added sections to the
          note-taking view and tested with the users.
        </h4>
      </section>

      <figure>
        <img src={iteration1} alt="Shortcut-based navigation for questions" />
        <caption>Shortcut-based navigation for questions</caption>
      </figure>

      <section>
        <h4 className="red">What Didn't work</h4>
        <ol>
          <li>
            Users were not able to use the shortcuts during note taking, so we
            removed it.
          </li>
          <li>
            Users wanted to see the upcoming questions in this view without
            using a shortcut.
          </li>
        </ol>
      </section>

      <section>
        <h3>Question script as a side menu</h3>
      </section>

      <figure>
        <img src={iteration2} alt="Side menu for questions" />
        <caption>Side menu for questions</caption>
      </figure>

      <section>
        <h4 className="red">What Didn't work</h4>
        <ol>
          <li>The side menu didn't work for a split screen view.</li>
        </ol>
      </section>

      <section>
        <h3>Final Design</h3>
        <h4>
          Based on usability testing, we decided to remove the navigation from
          the question script as users didn't face issues with traversing the
          script.
        </h4>
        <p>
          There was no need for a persistent list since they moved progressively
          between questions.
        </p>
      </section>

      <figure>
        <img src={finalDesign} alt="Final design with a question list" />
        <caption>Final design with a question list</caption>
      </figure>
      <figure>
        <img src={editorQuestion} alt="Editor screen with question script" />
        <caption>Editor screen with question script</caption>
      </figure>

      <section>
        <h3>What I learned</h3>
        <ol>
          <li>
            Users liked the idea of unstructured notes since it gave a way to
            take notes that didn't fit in any question.
          </li>
          <li>
            Users needed simple ways to capture their thoughts without having to
            remember a lot of shortcuts.
          </li>
        </ol>
        <p>Details on more experiments soon. 😎</p>
      </section>
    </div>
  );
};

export default Project1;
