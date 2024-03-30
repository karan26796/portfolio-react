// ProjectData.ts
import React from 'react';
import { BulletElement, CustomElement, FigureElement, HeaderElement } from '../interfaces';

// Define the type for the array of elements
type ProjectElement = HeaderElement | BulletElement | FigureElement | CustomElement;

// Dummy data for a project
const dummyProjectData: ProjectElement[] = [
  { type: 'header', text: 'Project Overview', level: 2 },
  {
    type: 'bullet', text: [
      'This is a sample project to demonstrate dynamic rendering.',
      'This is a sample project to demonstrate dynamic rendering.',
    ]
  },
  { type: 'bullet', text: [
    'This is a sample project to demonstrate dynamic rendering.',
  ] },
  {
    type: 'figure',
    image: 'data:image/png;base64,...', // Replace with your base64 image data
    caption: 'This is a sample image',
  },
];

export default dummyProjectData;