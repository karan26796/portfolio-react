import React from "react";
import pauseThumb from "../project-imgs/pause-holiday/pause-thumb.webp";
import pauseHolidayCalendar from "../project-imgs/pause-holiday/pause-holiday-calendar.webp";
import pauseAddDelete from "../project-imgs/pause-holiday/pause-add-delete.webp";

import {
  BodyElement,
  BulletElement,
  CustomElement,
  FigureElement,
  ParagraphElement,
  ImageText,
  IntroElement,
} from "../interfaces";

type ProjectElement =
  | BulletElement
  | FigureElement
  | CustomElement
  | BodyElement
  | ParagraphElement
  | ImageText
  | IntroElement;

const project6: ProjectElement[] = [
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
        text: "Pause is a simple web and mobile application that makes it easier for employees to manage their leave policies and track leave applications. By reducing friction in applying for leaves, and approval, teams are able to increase productivity, reduce time wastage, and maximize employee well being.",
      },
    ],
    image: [
      {
        type: "figure",
        image: pauseThumb,
        caption: "",
      },
    ],
  },
  {
    type: "imgtext",
    body: [
      {
        type: "header",
        text: "Let's start with the problem",
        level: 2,
      },
    ],
    image: [],
  },
  {
    type: "imgtext",
    body: [
      {
        type: "header",
        text: "🙎🏽‍♂️ My role",
        level: 4,
      },
      {
        type: "p",
        text: "I joined Obvious as a Product Designer and worked on solving problems for remote teams and burnout prevention. I worked on Pause pre and post Product Hunt launch with a team of 3 Product Designers, 1 Design Lead, 4 Engineers, a marketing lead, and a content writer.",
      },
    ],
    image: [],
  },
  {
    type: "imgtext",
    body: [
      {
        type: "header",
        text: "Problem areas I worked on",
        level: 4,
      },
      {
        type: "header",
        text: "Aligning public holiday calendars for remote teams",
        level: 3,
      },
      {
        type: "p",
        text: "Many organizations started working remotely due to the pandemic and decided to stay that way going forward. As the user base of Pause grew, more and more organizations started requesting features that would help them adapt the tool entirely to their remote team setups. One of the most requested features was multiple public holiday calendars for teams spread out across geographies so that",
      },
      {
        type: "bullet",
        text: [
          "Everyone in the organization could be assigned a calendar based on their location.",
          "Help the company build an employee first holiday calendar and comply with geography-specific holidays and policies.",
        ],
      },
    ],
    image: [
      {
        type: "figure",
        image: pauseHolidayCalendar,
        caption: "",
      },
    ],
  },
  {
    type: "imgtext",
    body: [
      {
        type: "header",
        text: "Transparent leave policy with leave balancing",
        level: 4,
      },
      {
        type: "p",
        text: "Leave balancing means adding/subtracting the leaves from a person's record due to some anomaly or discrepancy. Sometimes leaves need to be adjusted for a group of people due to the leave not being present in the company's holiday calendar.",
      },
      {
        type: "header",
        text: "This feature was designed in parallel for mobile and web. Both the platforms had the same flow after designs were completed.",
        level: 3,
      },
    ],
    image: [],
  },
  {
    type: "imgtext",
    body: [
      {
        type: "header",
        text: "Let's talk about impact",
        level: 4,
      },
      {
        type: "bullet",
        text: [
          "More than 20 companies started using public holidays calendar soon after it's launch.",
          "Pause got lesser support messages asking about leave balancing and where to see it's previous data after the addition of leave balancing.",
        ],
      },
    ],
    image: [
      {
        type: "figure",
        image: pauseAddDelete,
        caption: "",
      },
    ],
  },
];

export default project6;