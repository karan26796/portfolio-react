import React from "react";

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

const project7: ProjectElement[] = [
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
        text: "The experience examines the pervasiveness of surveillance and how it is often disguised as harmless or mundane technology, such as maps and search engines. When viewed up close, however, it becomes clear how these tools are used to watch over and track us. The search and location icons on the hoardings appear commonplace when viewed under normal light but their true intentions of watching and tracking us are revealed under UV light. As UV light reveals the invisible elements around us, like bacteria, it's use in this project allows viewers to see what hides in plain sight.",
      },
    ],
    image: [],
  },
];

export default project7;