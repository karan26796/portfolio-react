// ProjectData.ts
import React from 'react';
import img1 from '../project-imgs/binge-eating/1.webp'
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
import { BodyElement, BulletElement, CustomElement, FigureElement, HeaderElement, ParagraphElement, ImageText } from '../interfaces';

// Define the type for the array of elements
type ProjectElement = HeaderElement | BulletElement | FigureElement | CustomElement | BodyElement | ParagraphElement | ImageText;

// Dummy data for a project
const dummyProjectData: ProjectElement[] = [
  { type: 'header', text: 'Project Overview', level: 4 },
  { type: 'header', text: 'Project Overview', level: 2 },
  {
    type: 'imgtext',
    body: [
      { type: 'header', text: 'Feature Overview', level: 2 },
      { type: 'p', text: 'This section provides an overview of the new feature introduced in our project. It aims to enhance user experience by providing a seamless integration of user feedback directly into the development process.' },
      { type: 'header', text: 'Key Benefits', level: 3 },
      { type: 'bullet', text: [
        'Direct integration with user feedback channels.',
        'Automated tagging and prioritization of feedback.',
        'Real-time updates to the product team.',
      ]},
      { type: 'p', text: 'By incorporating direct user feedback, we can significantly reduce the feedback loop and ensure that the product evolves in alignment with user needs and expectations.' },
    ],
    image: {
      type: 'figure',
      image: protoNotes, // Assuming protoNotes is a relevant image for this section
      caption: 'Prototype integrating user feedback',
    },
  },
  // {
  //   type:'imgtext',
  //   body: [
  //     { type: 'header', text: 'Main Header', level:4},
  //     { type: 'header', text: 'Main Header', level:2},
  //     { type: 'p', text: 'Main Header'},
  //     { type: 'bullet', text: ['First bullet of Main Header'] },
  //     { type: 'p', text: 'Main Header'},
  //     { type: 'bullet', text: ['First bullet of Sub Header', 'Second bullet of Sub Header'] },
  
  //   ],
  //   image: {
  //     type: 'figure',
  //     image: img1,
  //     caption: 'An informative caption',
  //   },
  // },
  { type: 'p', text: 'Project Overview' },
  {
    type: 'bullet', text: [
      'This is a sample project to demonstrate dynamic rendering.',
      'This is a sample project to demonstrate dynamic rendering.',
    ]
  },
  {
    type: 'bullet', text: [
      'This is a sample project to demonstrate dynamic rendering.',
    ]
  },
  {
    type: 'figure',
    image: img1, // Replace with your base64 image data
    caption: 'This is a sample image',
  },
];

export default dummyProjectData;