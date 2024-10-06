// ProjectData.ts
import React from "react";
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
import iteration3 from "../project-imgs/loop-note/iteration-3.webp";
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

type ProjectElement =
  | HeaderElement
  | BulletElement
  | FigureElement
  | CustomElement
  | BodyElement
  | ParagraphElement
  | ImageText
  | IntroElement;

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
      text: "Based on our research, it takes 5-6 rewatches of a user interview to get actionable insights out of it. Therefore, a 1 hour interview takes 5-6 hours to tag, summarize, and share with one's team.\n\nTo make it easier for teams to get the most out of research calls and projects, we designed a note-taker that lets researchers take notes while taking an interview on Zoom.",
    },
  },
  {
    type: "imgtext",
    body: [
      { type: "header", text: "First cut for Usability Testing", level: 4 },
      {
        type: "p",
        text: "I created a prototype in Protopie to mock how people will take notes in Looppanel.",
      },
      { type: "header", text: "What Didn't work", level: 4 },
      {
        type: "bullet",
        text: [
          "The users weren't able to use the shortcuts or the controls in the interface.",
          "The interface looked like a chat window which the users couldn't connect with.",
        ],
      },
    ],
    image: [
      {
        type: "figure",
        image: protoNotes,
        caption: "Zoom and Looppanel working side by side",
      },
    ],
  },
  {
    type: "imgtext",
    body: [
      { type: "header", text: "Second iteration for Usability Testing", level: 4 },
      {
        type: "p",
        text: "I removed the shortcuts and added some instructions for people to understand the note taking screen",
      },
      { type: "header", text: "What Didn't work", level: 4 },
      {
        type: "bullet",
        text: [
          "The interface wasn't suited for a split screen use.",
          "People didn't use the bookmarking feature a lot.",
        ],
      },
    ],
    image: [
      {
        type: "figure",
        image: iteration01,
        caption: "Instructive note-taking with two panels",
      },
    ],
  },
  {
    type: "imgtext",
    body: [
      { type: "header", text: "Third iteration for Usability Testing", level: 4 },
      {
        type: "p",
        text: "Since a lot of people during our research used Notion and Google Docs, I tried making the interface as close to those tools as possible.",
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
        image: iteration02,
        caption: "Instructive note-taking with two panels",
      },
    ],
  },
  {
    type: "imgtext",
    body: [
      { type: "header", text: "Fourth iteration for Usability Testing", level: 4 },
      {
        type: "p",
        text: "To highlight who's taken the note, I added the names of note takers in different colors",
      },
      { type: "header", text: "What Didn't work", level: 4 },
      {
        type: "bullet",
        text: [
          "The different colors for note takers created distraction during note taking.",
          "The name of note takers takes up a lot of space without adding much to the interface",
        ],
      },
    ],
    image: [
      {
        type: "figure",
        image: iteration03,
        caption: "Note taking with names and time stamp",
      },
    ],
  },
  {
    type: "imgtext",
    body: [
      { type: "header", text: "Final Design based on testing", level: 4 },
      {
        type: "bullet",
        text: [
          "Muted the name and time stamp colors to bring focus on the note.",
          "Removed the emojis as they could not be interacted with during the call.",
          "Added a bookmark feature which could be accessed using the '//' shortcut. This reduces the number of decisions a person makes during the call",
        ],
      },
      {
        type: "p",
        text: "People didn't expect the note-taking space to look like a chat, so we changed it into a more open space that makes the experience similar to a document.",
      },
    ],
    image: [
      {
        type: "figure",
        image: updatedNote,
        caption: "Doc-like notetaking view",
      },
      {
        type: "figure",
        image: loopNoteNotes,
        caption: "Editor View with notes",
      },
    ],
  },
  {
    type: "intro",
    text: {
      type: "header",
      text: "Part II: Structured note-taking",
      level: 2,
    },
    desc: {
      type: "p",
      text: "We observed researchers were using a template to take notes during research calls. The templates either contained theme based questionnaire or task based questionnaire\n\nBelow are some examples of the templates they use.",
    },
  },
  {
    type: "imgtext",
    body: [],
    image: [
      {
        type: "figure",
        image: task1,
        caption: "Theme-based questionnaire",
      },
      {
        type: "figure",
        image: task2,
        caption: "Task-based questionnaire",
      },
    ],
  },
  {
    type: "imgtext",
    body: [
      { type: "header", text: "Iterating and testing a question script", level: 4 },
      {
        type: "p",
        text: "We iterated on top of previous designs and added sections to the note-taking view and tested with the users.",
      },
      { type: "header", text: "What Didn't work", level: 4 },
      {
        type: "bullet",
        text: [
          "Users were not able to use the shortcuts during note taking hence we removed it.",
          "Users wanted to see the upcoming questions in this view without using a shortcut.",
        ],
      },
    ],
    image: [
      {
        type: "figure",
        image: iteration1,
        caption: "Shortcut based navigation for questions",
      },
    ],
  },
  {
    type: "imgtext",
    body: [
      { type: "header", text: "Question script as a side menu", level: 3 },
      { type: "header", text: "What Didn't work", level: 4 },
      {
        type: "bullet",
        text: ["The side menu didn't work for a split screen view."],
      },
    ],
    image: [
      {
        type: "figure",
        image: iteration2,
        caption: "Side menu for questions",
      },
    ],
  },
  {
    type: "imgtext",
    body: [
      { type: "header", text: "Question list at the top", level: 4 },
      {
        type: "p",
        text: "We put the list at the top so it's accessible at all times.",
      },
      { type: "header", text: "What Didn't work", level: 4 },
      {
        type: "bullet",
        text: [
          "Users didn't need a consistent list since it distracted them from the main task of notetaking.",
          "Additional features were causing a lot of distraction from notetaking.",
        ],
      },
    ],
    image: [
      {
        type: "figure",
        image: iteration3,
        caption: "Question list at the top",
      },
    ],
  },
  {
    type: "imgtext",
    body: [
      { type: "header", text: "Final Design", level: 4 },
      {
        type: "p",
        text: "Based on usability testing, we decided to remove the navigation from the question script as users didn't face issues with traversing the script.",
      },
      {
        type: "p",
        text: "There was no need for a persistent list since they moved progressively between questions.",
      },
    ],
    image: [
      {
        type: "figure",
        image: finalDesign,
        caption: "Final design with a question list",
      },
      {
        type: "figure",
        image: editorQuestion,
        caption: "Editor screen with question script",
      },
    ],
  },
  {
    type: "imgtext",
    body: [
      { type: "header", text: "What I learned", level: 4 },
      {
        type: "bullet",
        text: [
          "Users liked the idea of unstructured notes since it gave a way to take notes that didn't fit in any question",
          "Users needed simple ways to capture their thoughts without having to remember a lot of shortcuts",
        ],
      },
      {
        type: "p",
        text: "Details on more experiments soon. 😎",
      },
    ],
    image: [],
  },
];

export default project1;