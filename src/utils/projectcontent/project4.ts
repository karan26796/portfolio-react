// KurakaaniProjectData.ts
import thumb from "../project-imgs/kurakaani/thumb.gif";
import img1 from "../project-imgs/kurakaani/01.webp";
import img2 from "../project-imgs/kurakaani/02.webp";
import img3 from "../project-imgs/kurakaani/03.webp";
import ds from "../project-imgs/kurakaani/ds.webp";
import img4 from "../project-imgs/kurakaani/04.webp";
import img5 from "../project-imgs/kurakaani/05.webp";
import img6 from "../project-imgs/kurakaani/06.webp";
import img7 from "../project-imgs/kurakaani/07.webp";
import img8 from "../project-imgs/kurakaani/08.webp";
import img9 from "../project-imgs/kurakaani/09.webp";
import img10 from "../project-imgs/kurakaani/10.webp";
import img11 from "../project-imgs/kurakaani/11.webp";
import img12 from "../project-imgs/kurakaani/12.webp";

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

const kurakaaniProject: ProjectElement[] = [
  {
    type: "imgtext",
    body: [
      {
        type: "header",
        text: "Quick Summary",
        level: 4,
      },
      {
        type: "p",
        text: "The Atomic Design principle uses the concept of atoms and molecules to set up a Design Language System. Having worked on maintaining and creating design systems, I created one for Nimbuzz Kurakaani, Nepal's Super App, as a part of their application redesign.",
      },
      {
        type: "header",
        text: "Project Description",
        level: 4,
      },
      {
        type: "p",
        text: "Nimbuzz Kurakaani is Nepal's digital platform that houses multiple services like shopping, chat, quizzing, money transfer & much more in one app.\n\nI was commissioned as a UI Designer to Redesign the app by creating a component-based system.",
      },
      {
        type: "header",
        text: "Goals of the redesign",
        level: 4,
      },
      {
        type: "bullet",
        text: [
          "Update the design language to have a modern and cheerful vibe for a younger audience",
          "Create a system that is scalable and easy to maintain",
          "Inculcate different platform guidelines to improve the designs",
        ],
      },
    ],
    image:[]
  },
  {
    type: "imgtext",
    body:[],
    image: [
      {
        type: "figure",
        image: img1,
        caption: "Old Design of the connect and quiz screens",
      },
      {
        type: "figure",
        image: img2,
        caption: "Old Design of the courses and shop screens",
      },
    ],
  },
  {
    type: "imgtext",
    body: [
      {
        type: "header",
        text: "My Approach",
        level: 4,
      },
      {
        type: "header",
        text: "Having worked on multiple projects where I've used a component library, I started with an Atomic Design approach to creating a component library.",
        level: 3,
      },
    ],
    image:[]
  },
  {
    type: "imgtext",
    body:[],
    image: [
      {
        type: "figure",
        image: img3,
        caption: "Naming the components in the file system format",
      },
      {
        type: "figure",
        image: ds,
        caption: "Snippet of the design system for the project",
      },
    ],
  },
  // Sections for each feature revamp
  {
    type: "imgtext",
    body: [
      {
        type: "header",
        text: "Revamp of the connect feature",
        level: 4,
      },
      {
        type: "header",
        text: "Updated the connect screens of the app to feel more human and cheerful.",
        level: 3,
      },
    ],
    image:[]
  },
  {
    type: "imgtext",
    body:[],
    image: [
      {
        type: "figure",
        image: img4,
        caption: "Redesign of connect/sending request screen",
      },
      {
        type: "figure",
        image: img5,
        caption: "New design of a person's profile",
      },
    ],
  },
  // Similar sections for shop, learn, payment, quiz, and chat
  // Shop section
  {
    type: "imgtext",
    body: [
      {
        type: "header",
        text: "Revamp of the shop section",
        level: 4,
      },
      {
        type: "header",
        text: "Made the design feel more modern in tune with the latest e-commerce apps.",
        level: 3,
      },
    ],
    image:[]
  },
  {
    type: "imgtext",
    body:[],
    image: [
      {
        type: "figure",
        image: img6,
        caption: "Redesign of the shopping landing page",
      },
      {
        type: "figure",
        image: img7,
        caption: "Redesign of the product detail page",
      },
    ],
  },
  // Learn section
  {
    type: "imgtext",
    body: [
      {
        type: "header",
        text: "Revamp of the learn section",
        level: 4,
      },
      {
        type: "header",
        text: "Updated the screens to look and feel more like online courses.",
        level: 3,
      },
    ],
    image:[]
  },
  {
    type: "imgtext",
    body:[],
    image: [
      {
        type: "figure",
        image: img8,
        caption: "Redesign of the courses listing page",
      },
      {
        type: "figure",
        image: img9,
        caption: "Redesign of the course description page",
      },
    ],
  },
  // Payment section
  {
    type: "imgtext",
    body: [
      {
        type: "header",
        text: "Revamp of the payment screen",
        level: 4,
      },
      {
        type: "header",
        text: "Updated the icons to feel more vibrant and match the design system.",
        level: 3,
      },
    ],
    image:[]
  },
  {
    type: "imgtext",
    body:[],
    image: [
      {
        type: "figure",
        image: img10,
        caption: "Redesign of the payment screen",
      },
    ],
  },
  // Quiz section
  {
    type: "imgtext",
    body: [
      {
        type: "header",
        text: "Revamp of the quiz section",
        level: 4,
      },
      {
        type: "header",
        text: "Updated the quizzing screens to look like an online gaming app/show.",
        level: 3,
      },
    ],
    image:[]
  },
  {
    type: "imgtext",
    body:[],
    image: [
      {
        type: "figure",
        image: img11,
        caption: "Redesign of the quiz screens",
      },
    ],
  },
  // Chat section
  {
    type: "imgtext",
    body: [
      {
        type: "header",
        text: "Creation of the chat section",
        level: 4,
      },
      {
        type: "header",
        text: "Chat section was imagined from scratch keeping in mind what platforms people use on a daily basis.",
        level: 3,
      },
    ],
    image:[]
  },
  {
    type: "imgtext",
    body:[],
    image: [
      {
        type: "figure",
        image: img12,
        caption: "Redesign of the chat screens",
      },
    ],
  },
  // Outcome section
  {
    type: "imgtext",
    body: [
      {
        type: "header",
        text: "Outcome of the project",
        level: 4,
      },
      {
        type: "bullet",
        text: [
          "With the creation of a design library, the time to design flows and screens reduced by ~60%",
          "The hand-off process got easier as the components were defined in one place and developers could pick the specs from there.",
          "The flows in the application were more refined and clear compared to the earlier version. This meant easy communication across teams.",
        ],
      },
    ],
    image:[]
  },
];

export default kurakaaniProject;