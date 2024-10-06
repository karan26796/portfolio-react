// ProjectData.ts
import oldhighlight from "../project-imgs/looppanel-insights/old-highlights.webp";
import firstrelease from "../project-imgs/looppanel-insights/iteration-mid.gif";
import projectstructure from "../project-imgs/looppanel-insights/side-question-01.webp";
import projectstructure01 from "../project-imgs/looppanel-insights/side-question-02.webp";
import topbottom from "../project-imgs/looppanel-insights/top-bottom-1.webp";
import topbottom01 from "../project-imgs/looppanel-insights/top-bottom-2.webp";
import finaldesign from "../project-imgs/looppanel-insights/new-insights.gif";
import summaryview from "../project-imgs/looppanel-insights/summary.gif";
import img5 from "../project-imgs/looppanel-insights/5.webp";
import img6 from "../project-imgs/looppanel-insights/6.webp";
import img7 from "../project-imgs/looppanel-insights/7.webp";
import img8 from "../project-imgs/looppanel-insights/8.webp";

import {
  BodyElement,
  BulletElement,
  CustomElement,
  FigureElement,
  HeaderElement,
  ImageText,
  IntroElement,
  ParagraphElement,
} from "../interfaces";

type ProjectElement =
  | HeaderElement
  | BulletElement
  | FigureElement
  | CustomElement
  | BodyElement
  | ParagraphElement
  | ImageText
  | IntroElement;

const project2: ProjectElement[] = [
  // {
  //   type: "custom",
  //   content: "This case study only talks about the highlights page redesign with some references made to the product wide information revamp."
  // },
  {
    type: "imgtext",
    body: [
      {
        type: "header",
        text: "Let's start with the problem",
        level: 2,
      },
      {
        type: "p",
        text: "During research, we realized people zoom-in and out of the research data available to them. They go back and forth between call notes, the call recordings, the transcripts, and project highlights. But the product's information hierarchy didn't reflect that.",
      },
    ],

    image: [
    ],
  },
  
  {
    type: "imgtext",
    body: [
      { 
        type: "header", 
        text: "Old highlighs page design", 
        level: 2 
      },
      {
        type: "header",
        text: "The original highlights view in Looppanel required an overhaul after the introduction of projects and question script in the product.",
        level: 3,
      }
    ],
    image: [
      {
        type: "figure",
        image: oldhighlight,
        caption: "Old Design",
      },
    ],
  },
  {
    type: "imgtext",
    body: [
      { 
        type: "header", 
        text: "First release", 
        level: 2 
      },
      {
        type: "header",
        text: "New additions",
        level: 4,
      },
      {
        type: "bullet",
        text: [
          "Ability to add a call to a project directly from the highlights screen.",
          "Search and filter by tag & calls.",
          "Icons to signify a video snippet & a note.",
        ],
      },
    ],
    image: [
      {
        type: "figure",
        image: firstrelease,
        caption: "Phase-I release of the new highlights page",
      },
    ],
  },
  {
    type: "imgtext",
    body: [
      {
        type: "header",
        text: "Integrating project structure",
        level: 2,
      },
      {
        type: "header",
        text: "Design direction I: questions in side panel",
        level: 4,
      },
      {
        type: "p",
        text: "I tried a variation where the question script of the project was in a side panel, and notes inside it on the right, segregated based on calls.",
      },
      {
        type: "header",
        text: "What didn't work",
        level: 4,
      },
      {
        type: "bullet",
        text: [
          "The mental model of projects > calls > notes/video snippets wasn't reflected in the design.",
          "Hard to see a lot of notes within a given question.",
        ],
      },
    ],
    image: [
      {
        type: "figure",
        image: projectstructure,
        caption: "Questions on the left with notes on the right",
      },
      {
        type: "figure",
        image: projectstructure01,
        caption: "Side menu for questions",
      },
    ],
  },
  {
    type: "imgtext",
    body: [
      {
        type: "header",
        text: "Design direction II: questions at the top",
        level: 4,
      },
      {
        type: "p",
        text: "To reflect the mental model of projects > calls > notes/video snippets, I designed the following two screens to represent that.",
      },
      {
        type: "header",
        text: "What didn't work",
        level: 4,
      },
      {
        type: "bullet",
        text: [
          "It was hard to visualize the entire question script or focus on a particular question.",
          "The new hierarchy of product didn't come out very well.",
        ],
      },
    ],
    image: [
      {
        type: "figure",
        image: topbottom,
        caption: "Call name at top with question inside",
      },
      {
        type: "figure",
        image: topbottom01,
        caption: "Questions on the left, with call name on top with note inside",
      },
    ],
  },
  {
    type: "imgtext",
    body: [
      {
        type: "header",
        text: "Final design based on testing",
        level: 2,
      },
      {
        type: "header",
        text: "This version worked to a large extent since it reflected people's existing ways of zooming in and out of their work.",
        level: 3,
      },
      {
        type: "header",
        text: "New Additions",
        level: 4,
      },
      {
        type: "bullet",
        text: [
          "Added questions from question script at top to reflect new flow of information in the product.",
          "Created a collapsible view for questions to help researchers focus on one question at a time.",
          "Ways to go into an individual call and view transcript text.",
        ],
      },
    ],
    image: [
      {
        type: "figure",
        image: finaldesign,
        caption: "New analysis screen prototype",
      },
    ],
  },
  {
    type: "imgtext",
    body: [
      {
        type: "header",
        text: "Summary view",
        level: 2,
      },
      {
        type: "header",
        text: "To wrap up the entire experience, we made a summary view that could be shared with the team.",
        level: 3,
      },
      {
        type: "p",
        text: "The first step is to start grouping notes, then selecting what insight to put it under. All of this can be shared using a link.",
      },
    ],
    image: [
      {
        type: "figure",
        image: summaryview,
        caption: "Summary view",
      },
    ],
  },
  {
    type: "imgtext",
    body: [
      {
        type: "header",
        text: "Changes across other parts of the product",
        level: 2,
      },
    ],
    image: [
      // {
      //   type: "figure",
      //   image: img5,
      // },
      // {
      //   type: "figure",
      //   image: img6,
      // },
      // {
      //   type: "figure",
      //   image: img7,
      // },
      // {
      //   type: "figure",
      //   image: img8,
      // },
    ],
  },
];

export default project2;