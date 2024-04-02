// ProjectData.ts// ProjectData.ts
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
const project3: ProjectElement[] = [
  {
    type: "intro",
    text: {
      type: "header",
      text: "Let's start with the problem",
      level: 2,
    },
    desc: {
      type: "p",
      text: `While we launched new features for Looppanel, the adoption for them was quite poor. So, we started with an information architechture redesign exercise.`,
    },
  },
  {
    type: "imgtext",
    body: [
      { type: "header", text: "Home Page Redesign", level: 2 },
      {
        type: "header",
        text: `I restructured the navigation bar to resemble the new structure of product 
        
        project>call>notes. 
        
        At the call level we made it easier to go into a call or move a call to a project if it is was unassigned.`,
        level: 3,
      },
    ],
    image: [
      {
        type: "figure",
        image: homepage, // Assuming protoNotes is a relevant image for this section
        caption: "Old home page and new home page",
      },
      {
        type: "figure",
        image: calendarrecording, // Assuming protoNotes is a relevant image for this section
        caption: "Updated horizontal menu and copy notetaking link",
      },
    ],
  },
  {
    type: "imgtext",
    body: [
      { type: "header", text: "Calendar/Editor Screen Redesign", level: 2 },
      {
        type: "header",
        text: "In the older call/editor screen, there were 3 types of views to show text linked to the transcript.",
        level: 3,
      },
      {
        type: "p",
        text: `Since a lot of people during our research used Notion and Google Docs, I tried making the interface as close to those tools as possible.`,
      },
      { type: "header", text: "What Didn't work", level: 4 },
      {
        type: "bullet",
        text: [
          "A video snippet created from selecting the transcript text and adding a tag.",
          "Moment bookmarked during note-taking.",
          "Note taken during note taking",
        ],
      },
      {
        type: "header",
        text: "Due to multiple views of the same transcript text, the screen looked inconsistent. Users were also confused with the purpose of each. The addition of question script would've added more complexity",
        level: 3,
      },
    ],
    image: [
      {
        type: "figure",
        image: callscreenold, // Assuming protoNotes is a relevant image for this section
        caption: "Old view of call/editor screen",
      },
      {
        type: "figure",
        image: callscreenold01, // Assuming protoNotes is a relevant image for this section
        caption: "Call/Editor with question script",
      },
    ],
  },
];

export default project3;
