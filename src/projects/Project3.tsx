import React from "react";
import homePageComparison from "../utils/project-imgs/loop-research/home-page.gif";
import updatedMenu from "../utils/project-imgs/loop-research/calendar-link-start-recording.webp";
import oldCallEditor from "../utils/project-imgs/loop-research/7.webp";
import callEditorWithScript from "../utils/project-imgs/loop-research/8.webp";

const Project3: React.FC = () => {
  return (
    <div className="project-details">
      <section>
        <h2>Let's start with the problem</h2>
        <h4>While we launched new features for Looppanel, the adoption for them was quite poor.</h4>
        <p>To improve the discoverability of features like inviting Loop bot to zoom call, adding calls to projects, and selecting and saving transcript text, we made changes to the information architecture of the product.</p>
      </section>

      <section>
        <h2>Home page redesign</h2>
        <h4>Restructuring navigation and making it easier to invite bot</h4>
        <p>I restructured the navigation bar to resemble the new structure of product</p>
        
        <h4>project — call — notes</h4>
        <p>At the call level, we made it easier to go into a call or move a call to a project if it was unassigned.</p>
        </section>

        <figure>
          <img src={homePageComparison} alt="Home page comparison" />
          <figcaption>Old home page and new home page</figcaption>
        </figure>
        <figure>
          <img src={updatedMenu} alt="Updated menu" />
          <figcaption>Updated horizontal menu and copy notetaking link</figcaption>
        </figure>

      <section>
        <h2>Call/Editor screen redesign</h2>
        <h4>In the older call/editor screen, there were 3 types of views to show text linked to the transcript.</h4>
        <ul>
          <li>A video snippet created from selecting the transcript text and adding a tag.</li>
          <li>Moment bookmarked during note-taking.</li>
          <li>Note taken during note-taking.</li>
        </ul>
        
        <p>Due to multiple views of the same transcript text, the screen looked inconsistent. Users were also confused with the purpose of each. The addition of question script would've added more complexity.</p>
        <h4>Updates to the Call/Editor screen</h4>
        <p>Overall uniform view — Cleaner view to add tags, see the timestamp, etc.</p>
        </section>
        
        <figure>
          <img src={oldCallEditor} alt="Old call editor" />
          <figcaption>Old view of call/editor screen</figcaption>
        </figure>
        <figure>
          <img src={callEditorWithScript} alt="Call editor with script" />
          <figcaption>Call/Editor with question script</figcaption>
        </figure>

    </div>
  );
};

export default Project3;
