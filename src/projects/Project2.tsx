import React from "react";
import oldHighlights from "../utils/project-imgs/looppanel-insights/old-highlights.webp";
import iterationMid from "../utils/project-imgs/looppanel-insights/iteration-mid.gif";
import sideQuestion01 from "../utils/project-imgs/looppanel-insights/side-question-01.webp";
import sideQuestion02 from "../utils/project-imgs/looppanel-insights/side-question-02.webp";
import topBottom1 from "../utils/project-imgs/looppanel-insights/top-bottom-1.webp";
import topBottom2 from "../utils/project-imgs/looppanel-insights/top-bottom-2.webp";
import newInsights from "../utils/project-imgs/looppanel-insights/new-insights.gif";
import summary from "../utils/project-imgs/looppanel-insights/summary.gif";

import "../styles/ProjectDetails.scss";

const Project2: React.FC = () => {
  return (
    <div className="project-details">
      <section>
        <h2>Let's start with the problem</h2>
        <p>
          During research, we realized people zoom-in and out of the research
          data available to them. They go back and forth between call notes, the
          call recordings, the transcripts, and project highlights. But the
          product's information hierarchy didn't reflect that.
        </p>
      </section>

      <section>
        <h2>Old highlights page design</h2>
        <h4>
          The original highlights view in Looppanel required an overhaul after
          the introduction of projects and question script in the product.
        </h4>
        <figure>
          <img src={oldHighlights} alt="Old Design" />
          <figcaption>Old Design</figcaption>
        </figure>
      </section>

      <section>
        <h2>First release</h2>
        <h4>New additions</h4>
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
        <h4>Design direction I: questions in side panel</h4>
        <p>
          I tried a variation where the question script of the project was in a
          side panel, and notes inside it on the right, segregated based on
          calls.
        </p>
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
        <h2>Design direction II: questions at the top</h2>
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
        <h4 className="red">What Didn't work</h4>
        <ol>
          <li>
            It was hard to visualize the entire question script or focus on a
            particular question.
          </li>
          <li>The new hierarchy of product didn't come out very well.</li>
        </ol>
      </section>

      <section>
        <h2>Final design based on testing</h2>
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
        <h2>New Additions</h2>
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
        <h2>Summary view</h2>
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
{/* 
      <section>
        <h2>Changes across other parts of the product</h2>
      </section> */}
    </div>
  );
};

export default Project2;
