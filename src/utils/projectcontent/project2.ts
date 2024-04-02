// ProjectData.ts// ProjectData.ts
import oldhighlight from "../project-imgs/looppanel-insights/old-highlights.webp";
import firstrelease from "../project-imgs/looppanel-insights/iteration-mid.gif";
import projectstructure from "../project-imgs/looppanel-insights/side-question-01.webp";
import projectstructure01 from "../project-imgs/looppanel-insights/side-question-02.webp";
import topbottom from "../project-imgs/looppanel-insights/top-bottom-1.webp";
import topbottom01 from "../project-imgs/looppanel-insights/top-bottom-2.webp";
import questiontop from "../project-imgs/looppanel-insights/5.webp";
import finaldesign from "../project-imgs/looppanel-insights/new-insights.gif";
import summaryview from "../project-imgs/looppanel-insights/summary.gif";

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

// Define the type for the array of elements
// Dummy data for a project
type ProjectElement =
  | HeaderElement
  | BulletElement
  | FigureElement
  | CustomElement
  | BodyElement
  | ParagraphElement
  | ImageText
  | IntroElement;

// Dummy data for a project
const project2: ProjectElement[] = [
  {
    type: "intro",
    text: {
      type: "header",
      text: "Let's start with the problem",
      level: 2,
    },
    desc: {
      type: "p",
      text: `During research, we realized people zoom-in and out of the research data available to them. They go back and forth between call notes, the call recordings, the transcripts, and project highlights. But the product's information heirarchy didn't reflect that.`,
    },
  },
  {
    type: "imgtext",
    body: [
      { type: "header", text: "Old Highlight Page Design", level: 2 },
      {
        type: "header",
        text: "The original highlights view in Looppanel required an overhaul after the introduction of projects and question script in the product.",
        level: 3,
      },
    ],
    image: [
      {
        type: "figure",
        image: oldhighlight, // Assuming protoNotes is a relevant image for this section
        caption: "Old Design",
      },
    ],
  },
  {
    type: "imgtext",
    body: [
      { type: "header", text: "First Release", level: 2 },
      {
        type: "p",
        text: `Since a lot of people during our research used Notion and Google Docs, I tried making the interface as close to those tools as possible.`,
      },
      { type: "header", text: "What Didn't work", level: 4 },
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
        image: firstrelease, // Assuming protoNotes is a relevant image for this section
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
        text: "Design Direction I: Questions in side panel",
        level: 4,
      },
      {
        type: "p",
        text: "I tried a variation where the question script of the project was in a side panel, and notes inside it on the right, segrated based on calls.",
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
      {
        type: "bullet",
        text: [
          "Muted the name and time stamp colors to bring focus on the note.",
          `Added a bookmark feature which could be accessed using the '//' shortcut. This reduces the number of decisions a person makes during the call`,
          "Removed the emojis as they could not be interacted with during the call.",
        ],
      },
    ],
    image: [
      {
        type: "figure",
        image: projectstructure, // Assuming protoNotes is a relevant image for this section
        caption: "Questions on the left with notes on the right",
      },
      {
        type: "figure",
        image: projectstructure01, // Assuming protoNotes is a relevant image for this section
        caption: "Side menu for questions",
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
        text: "Design Direction II: Questions in side panel",
        level: 4,
      },
      {
        type: "p",
        text: "To reflect the mental model of model of projects > calls > notes/video snippets, I designed the following two screens to represent that.",
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
          "The new heirarchy of product didn't come out very well.",
        ],
      },
      {
        type: "bullet",
        text: [
          "Muted the name and time stamp colors to bring focus on the note.",
          `Added a bookmark feature which could be accessed using the '//' shortcut. This reduces the number of decisions a person makes during the call`,
          "Removed the emojis as they could not be interacted with during the call.",
        ],
      },
    ],
    image: [
      {
        type: "figure",
        image: topbottom, // Assuming protoNotes is a relevant image for this section
        caption: "Call name at top with question inside",
      },
      {
        type: "figure",
        image: topbottom01, // Assuming protoNotes is a relevant image for this section
        caption: "Questions on the left, with call name on top with note inside",
      },
    ],
  },
  {
    type: "imgtext",
    body: [
      {
        type: "header",
        text: "Final Design based on testing",
        level: 2,
      },
      {
        type: "header",
        text: "This version worked to a large extend since it reflected people's existing ways of zooming in and out of their work.        ",
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
          "Ways to go into an individual call and view transcript text."
        ],
      },
    ],
    image: [
      {
        type: "figure",
        image: topbottom, // Assuming protoNotes is a relevant image for this section
        caption: "Call name at top with question inside",
      },
      {
        type: "figure",
        image: topbottom01, // Assuming protoNotes is a relevant image for this section
        caption: "Questions on the left, with call name on top with note inside",
      },
    ],
  },
  {
    type: "imgtext",
    body: [
      {
        type: "header",
        text: "Summary View",
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
        image: summaryview, // Assuming protoNotes is a relevant image for this section
        caption: "Call name at top with question inside",
      },
    ],
  },
];

export default project2;
