import { ProjectDetail } from "./interfaces";

// Assuming the following imports at the top of your ProjectDetailing.ts (or similar) file
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

export const projectDetails: { [key: string]: ProjectDetail[] } = {
  "1": [
    {
      type: "h3",
      content:
        "Based on our research, it takes 5-6 rewatches of a user interview to get actionable insights out of it. Therefore, a 1 hour interview takes 5-6 hours to tag, summarize, and share with one's team.",
    },
    {
      type: "h3",
      content:
        "To make it easier for teams to get the most out of research calls and projects, we designed a note-taker that lets researchers take notes while taking an interview on Zoom.",
    },
    { type: "h2", content: "Prototype Testing" },
    { type: "h4", content: "First cut for Usability Testing" },
    {
      type: "h3",
      content:
        "I created a prototype in Protopie to mock how people will take notes in Looppanel.",
    },
    { type: "h4", content: "What didn't work" },
    {
      type: "bullet",
      content: [
        "The users weren't able to use the shortcuts or the controls in the interface.",
        "The interface looked like a chat window which the users couldn't connect with.",
      ],
    },
    {
      type: "image",
      content: {
        url: protoNotes,
        caption: "Zoom and Looppanel working side by side",
      },
    },
    { type: "h4", content: "Second iteration for Usability Testing" },
    {
      type: "h3",
      content:
        "I removed the shortcuts and added some instructions for people to understand the note taking screen",
    },
    { type: "h4", content: "What didn't work" },
    {
      type: "bullet",
      content: [
        "The interface wasn't suited for a split screen use.",
        "People didn't use the bookmarking feature a lot.",
      ],
    },
    {
      type: "image",
      content: {
        url: iteration01,
        caption: "Instructive note-taking with two panels",
      },
    },
    { type: "h4", content: "Third iteration for Usability Testing" },
    {
      type: "h3",
      content:
        "Since a lot of people during our research used Notion and Google Docs, I tried making the interface as close to those tools as possible.",
    },
    { type: "h4", content: "What didn't work" },
    { type: "bullet", content: ["The interface didn't work visually."] },
    {
      type: "image",
      content: {
        url: iteration02,
        caption: "Instructive note-taking with two panels",
      },
    },
    { type: "h4", content: "Fourth iteration for Usability Testing" },
    {
      type: "h3",
      content:
        "To highlight who's taken the note, I added the names of note takers in different colors",
    },
    { type: "h4", content: "What didn't work" },
    {
      type: "bullet",
      content: [
        "The different colors for note takers created distraction during note taking.",
        "The name of note takers takes up a lot of space without adding much to the interface",
      ],
    },
    {
      type: "image",
      content: {
        url: iteration03,
        caption: "Note taking with names and time stamp",
      },
    },
    { type: "h4", content: "Final Design based on testing" },
    {
      type: "bullet",
      content: [
        "Muted the name and time stamp colors to bring focus on the note.",
        "Removed the emojis as they could not be interacted with during the call.",
        "Added a bookmark feature which could be accessed using the '//' shortcut. This reduces the number of decisions a person makes during the call.",
      ],
    },
    {
      type: "h3",
      content:
        "People didn't expect the note-taking space to look like a chat, so we changed it into a more open space that makes the experience similar to a document.",
    },
    {
      type: "image",
      content: { url: updatedNote, caption: "Doc-like notetaking view" },
    },
    {
      type: "image",
      content: { url: loopNoteNotes, caption: "Editor View with notes" },
    },
    // Part II: Structured note-taking
    { type: "h2", content: "Part II: Structured note-taking" },
    { type: "h4", content: "Context" },
    {
      type: "h3",
      content:
        "We observed researchers were using a template to take notes during research calls. The templates either contained theme-based questionnaire or task-based questionnaire.",
    },
    {
      type: "h3",
      content: "Below are some examples of the templates they use.",
    },
    {
      type: "image",
      content: { url: task1, caption: "Theme-based questionnaire" },
    },
    {
      type: "image",
      content: { url: task2, caption: "Task-based questionnaire" },
    },
    { type: "h2", content: "Prototype Testing" },
    { type: "h4", content: "Iterating and testing a question script" },
    {
      type: "h3",
      content:
        "We iterated on top of previous designs and added sections to the note-taking view and tested with the users.",
    },
    { type: "h4", content: "What didn't work" },
    {
      type: "bullet",
      content: [
        "Users were not able to use the shortcuts during note taking hence we removed it.",
        "Users wanted to see the upcoming questions in this view without using a shortcut.",
      ],
    },
    {
      type: "image",
      content: {
        url: iteration1,
        caption: "Shortcut based navigation for questions",
      },
    },
    { type: "h3", content: "Question script as a side menu" },
    { type: "h4", content: "What didn't work" },
    {
      type: "bullet",
      content: ["The side menu didn't work for a split screen view."],
    },
    {
      type: "image",
      content: { url: iteration2, caption: "Side menu for questions" },
    },
    { type: "h4", content: "Question list at the top" },
    {
      type: "h3",
      content: "We put the list at the top so it's accessible at all times.",
    },
    { type: "h4", content: "What didn't work" },
    {
      type: "bullet",
      content: [
        "Users didn't need a consistent list since it distracted them from the main task of notetaking.",
        "Additional features were causing a lot of distraction from notetaking.",
      ],
    },
    {
      type: "image",
      content: { url: iteration03, caption: "Question list at the top" },
    },
    { type: "h4", content: "Final Design" },
    {
      type: "h3",
      content:
        "Based on usability testing, we decided to remove the navigation from the question script as users didn't face issues with traversing the script. There was no need for a persistent list since they moved progressively between questions.",
    },
    {
      type: "image",
      content: {
        url: finalDesign,
        caption: "Final design with a question list",
      },
    },
    {
      type: "image",
      content: {
        url: editorQuestion,
        caption: "Editor screen with question script",
      },
    },
    { type: "h4", content: "What I learned" },
    {
      type: "bullet",
      content: [
        "Users liked the idea of unstructured notes since it gave them a way to take notes that didn't fit in any question.",
        "Users needed simple ways to capture their thoughts without having to remember a lot of shortcuts.",
      ],
    },
    { type: "h3", content: "Details on more experiments soon. 😎" },
  ],
  "2": [
    { type: "h1", content: "Introduction" },
    { type: "h2", content: "Design Process" },
    { type: "bullet", content: ["Research", "Implementation", "Testing"] },
    {
      type: "image",
      content: {
        url: "https://imgv3.fotor.com/images/blog-richtext-image/blue-JPG-file-icon.png",
        caption: "Image Caption 3",
      },
    },
    {
      type: "image",
      content: {
        url: "https://imgv3.fotor.com/images/blog-richtext-image/blue-JPG-file-icon.png",
        caption: "Image Caption 4",
      },
    },
  ],
};
