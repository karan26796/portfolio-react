// ProjectData.ts
import React from "react";
import img1 from "../project-imgs/binge-eating/1.webp";
import protoNotes from "../project-imgs/loop-note/proto-notes.webp";
import iteration01 from "../project-imgs/loop-note/iteration-01.webp";
import iteration02 from "../project-imgs/loop-note/iteration-02.webp";
import iteration03 from "../project-imgs/loop-note/iteration-03.webp";
import updatedNote from "../project-imgs/loop-note/updated-note.webp";
import loopNoteNotes from "../project-imgs/loop-note/loop-note-notes.webp";
import task1 from "../project-imgs/loop-note/task-1.png";
import task2 from "../project-imgs/loop-note/task-2.png";
import iteration1 from "../project-imgs/loop-note/iteration-1.webp";
import iteration2 from "../project-imgs/loop-note/iteration-2.webp";
import finalDesign from "../project-imgs/loop-note/final-design.webp";
import editorQuestion from "../project-imgs/loop-note/editor-question.webp";

import {
  BodyElement,
  BulletElement,
  CustomElement,
  FigureElement,
  HeaderElement,
  ParagraphElement,
  ImageText,
  IntroElement,
} from "../interfaces";

// Define the type for the array of elements
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
const project1: ProjectElement[] = [
  {
    type: "intro",
    text: {
      type: "header",
      text: "Part I : Let's start with the problem",
      level: 2,
    },
    desc: {
      type: "p",
      text: `Based on our research, it takes 5-6 rewatches of a user interview to get actionable insights out of it. Therefore, a 1 hour interview takes 5-6 hours to tag, summarize, and share with one&apos;s team. 
      
      To make it easier for teams to get the most out of research calls and projects, we designed a note-taker that lets researchers take notes while taking an interview on Zoom.`,
    },
  },
  {
    type: "imgtext",
    body: [
      { type: "header", text: "Prototype Testing", level: 2 },
      { type: "header", text: "First Test", level: 4 },
      {
        type: "p",
        text: `I created a prototype in Protopie to mock how people will take notes in Looppanel.`,
      },
      { type: "header", text: "What Didn't work", level: 4 },
      {
        type: "bullet",
        text: [
          "The users weren't able to use the shortcuts or the controls in the interface",
          "The interface looked like a chat window which the users couldn't connect with.",
        ],
      },
    ],
    image: [
      {
        type: "figure",
        image: protoNotes, // Assuming protoNotes is a relevant image for this section
        caption: "Zoom and Looppanel working side by side",
      },
    ],
  },
  {
    type: "imgtext",
    body: [
      { type: "header", text: "Design Iteration", level: 2 },
      {
        type: "p",
        text: `Since a lot of people during our research used Notion and Google Docs, I tried making the interface as close to those tools as possible.`,
      },
      { type: "header", text: "What Didn't work", level: 4 },
      {
        type: "bullet",
        text: ["The interface didn't work visually."],
      },
    ],
    image: [
      {
        type: "figure",
        image: iteration02, // Assuming protoNotes is a relevant image for this section
        caption: "Instructive note-taking with two panels",
      },
    ],
  },
  {
    type: "imgtext",
    body: [
      {
        type: "header",
        text: "Final Design based on research and testing",
        level: 2,
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
        image: updatedNote, // Assuming protoNotes is a relevant image for this section
        caption: "Zoom and Looppanel working side by side",
      },
    ],
  },
  {
    type: "intro",
    text: {
      type: "header",
      text: "Part II : Structured note-taking",
      level: 2,
    },
    desc: {
      type: "p",
      text: `We observed researchers were using a template to take notes during research calls. The templates either contained theme based questionnaire or task based questionnaire`,
    },
  },
  {
    type: "imgtext",
    body: [
      {
        type: "header",
        text: "Part II : Structured note-taking",
        level: 2,
      },
      {
        type: "p",
        text: `We observed researchers were using a template to take notes during research calls. The templates either contained theme based questionnaire or task based questionnaire`,
      },
    ],
    image: [
      {
        type: "figure",
        image: task1, // Assuming protoNotes is a relevant image for this section
        caption: "Theme-based questionnaire",
      },
      {
        type: "figure",
        image: task2, // Assuming protoNotes is a relevant image for this section
        caption: "Task-based questionnaire",
      },
    ],
  },
  {
    type: "imgtext",
    body: [
      {
        type: "header",
        text: "User Testing the question script design",
        level: 2,
      },
      {
        type: "header",
        text: "I iterated on top of previous designs and added sections to the note-taking view and tested with the users.",
        level: 3,
      },
      {
        type: "header",
        text: "What didn't work",
        level: 4,
      },
      {
        type: "bullet",
        text: [
          "Users were not able to use the shortcuts during note taking hence we removed it.",
          `Users wanted to see the upcoming questions in this view without using a shortcut.`,
        ],
      },
    ],
    image: [
      {
        type: "figure",
        image: iteration1, // Assuming protoNotes is a relevant image for this section
        caption: "Shortcut based navigation for questions",
      },
    ],
  },
  {
    type: "imgtext",
    body: [
      {
        type: "header",
        text: "Final Question Script Design",
        level: 2,
      },
      {
        type:"header",
        text:`Based on usability testing, we decided to remove the navigation from the question script as users didn't face issues with traversing the script.
        
        There was no need for a persistent list since they moved progressively between questions.`,
        level: 3
      },
    ],
    image: [
      {
        type: "figure",
        image: finalDesign, // Assuming protoNotes is a relevant image for this section
        caption: "Zoom and Looppanel working side by side",
      },
    ],
  },
  {
    type: "imgtext",
    body: [
      {
        type: "header",
        text: "What I learned",
        level: 2,
      },
      {
        type:"bullet",
        text:[
          "Users liked the idea of unstructured notes since it gave a way to take notes that didn't fit in any question",
          "Users needed simple ways to capture their thoughts without having to remember a lot of shortcuts"
        ]
      },
      {
        type:"header",
        text:`Based on usability testing, we decided to remove the navigation from the question script as users didn't face issues with traversing the script.
        
        There was no need for a persistent list since they moved progressively between questions.`,
        level: 3
      },
    ],
    image: [
    ],
  },
];

export default project1;
