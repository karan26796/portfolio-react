// ProjectData.ts
import loopResearch from "../project-imgs/loop-research/loop-research.gif";
import homepage from "../project-imgs/loop-research/home-page.gif";
import calendarrecording from "../project-imgs/loop-research/calendar-link-start-recording.webp";
import callscreenold from "../project-imgs/loop-research/7.webp";
import callscreenold01 from "../project-imgs/loop-research/8.webp";

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

const project3: ProjectElement[] = [
  {
    type: "imgtext",
    body: [
      {
        type: "header",
        text: "Let's start with the problem",
        level: 2,
      },
      {
        type: "header",
        text: "While we launched new features for Looppanel, the adoption for them was quite poor.",
        level: 3,
      },
      {
        type: "p",
        text: "To improve the discoverability of features like inviting Loop bot to zoom call, adding calls to projects, and selecting and saving transcript text, we made changes to the information architecture of the product.",
      },
    ],
    image:[]
  },
  {
    type: "imgtext",
    body: [
      {
        type: "header",
        text: "Home page redesign",
        level: 2,
      },
      {
        type: "header",
        text: "Restructuring navigation and making it easier to invite bot",
        level: 3,
      },
      {
        type: "p",
        text: "I restructured the navigation bar to resemble the new structure of product",
      },
      {
        type: "header",
        text: "project>call>notes",
        level: 3,
      },
      {
        type: "p",
        text: "At the call level we made it easier to go into a call or move a call to a project if it was unassigned.",
      },
    ],
    image: [
      {
        type: "figure",
        image: homepage,
        caption: "Old home page and new home page",
      },
      {
        type: "figure",
        image: calendarrecording,
        caption: "Updated horizontal menu and copy notetaking link",
      },
    ],
  },
  {
    type: "imgtext",
    body: [
      {
        type: "header",
        text: "Call/Editor screen redesign",
        level: 2,
      },
      {
        type: "header",
        text: "In the older call/editor screen, there were 3 types of views to show text linked to the transcript.",
        level: 3,
      },
      {
        type: "bullet",
        text: [
          "A video snippet created from selecting the transcript text and adding a tag.",
          "Moment bookmarked during note-taking.",
          "Note taken during note taking",
        ],
      },
      {
        type: "p",
        text: "Due to multiple views of the same transcript text, the screen looked inconsistent. Users were also confused with the purpose of each. The addition of question script would've added more complexity",
      },
    ],
    image: [
      {
        type: "figure",
        image: callscreenold,
        caption: "Old view of call/editor screen",
      },
      {
        type: "figure",
        image: callscreenold01,
        caption: "Call/Editor with question script",
      },
    ],
  },
  {
    type: "imgtext",
    body: [
      {
        type: "header",
        text: "Updates to the Call/Editor screen",
        level: 4,
      },
      {
        type: "p",
        text: "Overall uniform view- Cleaner view to add tags, see the time stamp etc.",
      },
    ],
    image:[]
  },
];

export default project3;