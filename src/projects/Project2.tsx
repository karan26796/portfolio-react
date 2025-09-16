import React from "react";
import oldHighlights from "../utils/project-imgs/looppanel-insights/old-highlights.webp";
import iterationMid from "../utils/project-imgs/looppanel-insights/iteration-mid.gif";
import sideQuestion01 from "../utils/project-imgs/looppanel-insights/side-question-01.webp";
import sideQuestion02 from "../utils/project-imgs/looppanel-insights/side-question-02.webp";
import topBottom1 from "../utils/project-imgs/looppanel-insights/top-bottom-1.webp";
import topBottom2 from "../utils/project-imgs/looppanel-insights/top-bottom-2.webp";
import newInsights from "../utils/project-imgs/looppanel-insights/new-insights.gif";
import summary from "../utils/project-imgs/looppanel-insights/summary.gif";
import other1 from "../utils/project-imgs/looppanel-insights/5.webp";
import other2 from "../utils/project-imgs/looppanel-insights/6.webp";
import other3 from "../utils/project-imgs/looppanel-insights/7.webp";
import other4 from "../utils/project-imgs/looppanel-insights/8.webp";

import "../styles/ProjectDetails.scss";
import { Story } from "react-insta-stories/dist/interfaces";
import Stories from 'react-insta-stories';

const Project2: React.FC = () => {

  const myStories: Story[] = [
    { url: other1 },
    { url: other2 },
    { url: other3 },
    { url: other4 },
  ]

  return (
    <div className="project-details">
      <section>
        <h3>Let's start with the problem</h3>
        <p>
          During research, we realized people zoom-in and out of the research
          data available to them. They go back and forth between call notes, the
          call recordings, the transcripts, and project highlights. But the
          product's information hierarchy didn't reflect that.
        </p>
      </section>

      <section>
        <h3>Old highlights page design</h3>
        <p>
          The original highlights view in Looppanel required an overhaul after
          the introduction of projects and question script in the product.
        </p>
        </section>
        
        <figure>
          <img src={oldHighlights} alt="Old Design" />
          <figcaption>Old Design</figcaption>
        </figure>

      <section>
        <h2>First release</h2>
        <h3>New additions</h3>
        <ol>
          <li>
            Ability to add a call to a project directly from the highlights
            screen.
          </li>
          <li>Search and filter by tag & calls.</li>
          <li>Icons to signify a video snippet & a note.</li>
        </ol>
      </section>

      <figure>
        <img src={iterationMid} alt="Phase-I release" />
        <figcaption>Phase-I release of the new highlights page</figcaption>
      </figure>

      <section>
        <h2>Integrating project structure</h2>
        <h3>Design direction I: questions in side panel</h3>
        <h4>
          I tried a variation where the question script of the project was in a
          side panel, and notes inside it on the right, segregated based on
          calls.
        </h4>
      </section>

      <figure>
        <img src={sideQuestion01} alt="Questions on the left" />
        <figcaption>Questions on the left with notes on the right</figcaption>
      </figure>
      <figure>
        <img src={sideQuestion02} alt="Side menu" />
        <figcaption>Side menu for questions</figcaption>
      </figure>

      <section>
        <h4 className="red">What Didn't work</h4>
        <ol>
          <li>
            The mental model of projects — calls — notes/video snippets wasn't
            reflected in the design.
          </li>
          <li>Hard to see a lot of notes within a given question.</li>
        </ol>
      </section>

      <section>
        <h3>Design direction II: questions at the top</h3>
        <h4>
          To reflect the mental model of projects — calls — notes/video
          snippets, I designed the following two screens to represent that.
        </h4>
      </section>

      <figure>
        <img src={topBottom1} alt="Call name at top" />
        <figcaption>Call name at top with question inside</figcaption>
      </figure>
      <figure>
        <img src={topBottom2} alt="Questions on the left" />
        <figcaption>
          Questions on the left, with call name on top with note inside
        </figcaption>
      </figure>

      <section>
        <h4 className="red">What didn't work</h4>
        <ol>
          <li>
            It was hard to visualize the entire question script or focus on a
            particular question.
          </li>
          <li>The new hierarchy of product didn't come out very well.</li>
        </ol>
      </section>

      <section>
        <h3>Final design based on testing</h3>
        <h4>
          This version worked to a large extent since it reflected people's
          existing ways of zooming in and out of their work.
        </h4>
      </section>

      <figure>
        <img src={newInsights} alt="New analysis screen" />
        <figcaption>New analysis screen prototype</figcaption>
      </figure>

      <section>
        <h3>New Additions</h3>
        <ol>
          <li>
            Added questions from question script at top to reflect new flow of
            information in the product.
          </li>
          <li>
            Created a collapsible view for questions to help researchers focus
            on one question at a time.
          </li>
          <li>Ways to go into an individual call and view transcript text.</li>
        </ol>
      </section>

      <section>
        <h3>Summary view</h3>
        <h4>
          To wrap up the entire experience, we made a summary view that could be
          shared with the team.
        </h4>
        <p>
          The first step is to start grouping notes, then selecting what insight
          to put it under. All of this can be shared using a link.
        </p>
      </section>

      <figure>
        <img src={summary} alt="Summary view" />
        <figcaption>Summary view</figcaption>
      </figure>

      {/* <figure>
        <h3>Changes across other parts of the product</h3>
        <div className="stories">
          <Stories
            stories={myStories}
            defaultInterval={3000}
            max-width={"var(--max-width-container)"}
            height={"auto"}
            loop={true}
          />
        </div>
      </figure> */}
    </div>
  );
};

export default Project2;
