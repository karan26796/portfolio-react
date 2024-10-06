// BingeProjectData.ts
import React from "react";
import img1 from "../project-imgs/binge-eating/1.webp";
import img2 from "../project-imgs/binge-eating/2.webp";
import img3 from "../project-imgs/binge-eating/3.webp";
import img4 from "../project-imgs/binge-eating/4.webp";
import img5 from "../project-imgs/binge-eating/5.webp";
import img6 from "../project-imgs/binge-eating/6.webp";
import img7 from "../project-imgs/binge-eating/7.webp";
import img8 from "../project-imgs/binge-eating/8.webp";
import img9 from "../project-imgs/binge-eating/9.webp";
import img10 from "../project-imgs/binge-eating/10.webp";
import img11 from "../project-imgs/binge-eating/11.webp";
import boree from "../project-imgs/binge-eating/boree.webp";
import bingeGif from "../project-imgs/binge-eating/binge.gif";

import {
  BodyElement,
  BulletElement,
  CustomElement,
  FigureElement,
  ParagraphElement,
  ImageText,
  IntroElement,
//   QuoteElement,
} from "../interfaces";

type ProjectElement =
  | BulletElement
  | FigureElement
  | CustomElement
  | BodyElement
  | ParagraphElement
  | ImageText
  | IntroElement
//   | QuoteElement;

const project5: ProjectElement[] = [
  {
    type: "imgtext",
    body: [
      {
        type: "p",
        text: "MASTERS PROJECT - DESIGN - RESEARCH - PSYCHOLOGY",
      },
    ],
    image: [
      {
        type: "figure",
        image: bingeGif,
        caption: "",
      },
    ],
  },
  {
    type: "imgtext",
    body: [
      {
        type: "p",
        text: "Binge eating and watching are usually related, and their starting point in many cases is boredom. Although boredom is not bad but it presents an endless loop that is hard to escape and shifts our attention to future thinking.\n\nTo help people make the best use of boredom, I created a device that suggests mindful activities at the click of a button. These activities have been proven to breal the boredom loop and bring attention back to the present by initiating a mindful state.",
      },
    ],
    image: [],
  },
  {
    type: "imgtext",
    body: [
      {
        type: "p",
        text: "As our classroom course on problem-solving at NID, we are encouraged to pick our personal problems as project topics. I chose binge eating and overeating since I've dealt with drastic weight changes because of my eating habits in the past few years.",
      },
    ],
    image: [
      {
        type: "figure",
        image: img1,
        caption: "",
      },
    ],
  },
  {
    type: "imgtext",
    body: [
      {
        type: "header",
        text: "\"I binged a Netflix show for 10 hours, and regretted it the next morning\" --- YouTube comment",
        level:1
      },
      {
        type: "p",
        text: "Primary research to understand the current binge habits of people",
      },
      {
        type: "p",
        text: "I conducted 5 user inteviews over 3 days of people I recruited from WhatsApp, Slack Channels, and the campus. Participants were aged between 23-30yrs. Here are the key findings from the research",
      },
      {
        type: "bullet",
        text: [
          "Participants often started binge-watching to fill time as it'd become a habit, and they couldn't think of any alternatives.",
          "Participants reported watching series/shows to avoid stressful conversations with friends or family.",
          "Participants reported watching TV series suggested by friends or family to engage in a conversation with them.",
          "Participants also reported watching series/shows to learn new languages, but that was rare.",
        ],
      },
    ],
    image: [],
  },
  {
    type: "imgtext",
    body: [
      {
        type: "p",
        text: "Secondary research to get a broader perspective",
      },
      {
        type: "p",
        text: "To understand the phenomenon better, I conducted online research and found out",
      },
      {
        type: "p",
        text: "Our environment shapes our behaviour immensely. Everything around us is designed to make us consume more, from transparent fridge doors to large food containers",
      },
    ],
    image: [
      {
        type: "figure",
        image: img3,
        caption: "",
      },
    ],
  },
  {
    type: "imgtext",
    body: [
      {
        type: "p",
        text: "Other Findings",
      },
      {
        type: "bullet",
        text: [
          "Binge-watching is followed by binge-eating in many cases, and it happens subconsciously.",
          "Boredom is the biggest reason people start binge-eating or watching.",
          "Awareness of boredom loops & our environment can help us avoid bad choices.",
          "Being idle is important as it helps us wind down and reflect on things we've learned.",
        ],
      },
    ],
    image: [],
  },
  {
    type: "imgtext",
    body: [
      {
        type: "p",
        text: "Based on primary and secondary research, I decided to shift my from binge behaviour to boredom and started thinking of an intervention at the conjuction of boredom and binge watching.",
      },
    ],
    image: [
      {
        type: "figure",
        image: img4,
        caption: "",
      },
    ],
  },
  {
    type: "imgtext",
    body: [
      {
        type: "p",
        text: "Research on boredom",
      },
      {
        type: "p",
        text: "Boredom/Idleness is a loop. Binge-watching and eating provide an effortless way out of this seemingly endless loop. If we are aware we're in a loop, it helps us find ways to get out of it.",
      },
    ],
    image: [
      {
        type: "figure",
        image: img5,
        caption: "",
      },
    ],
  },
  {
    type: "imgtext",
    body: [
      {
        type: "p",
        text: "What's wrong with boredom?",
      },
    ],
    image: [
      {
        type: "figure",
        image: boree,
        caption: "",
      },
      {
        type: "figure",
        image: img6,
        caption: "",
      },
    ],
  },
  {
    type: "imgtext",
    body: [
      {
        type: "p",
        text: "Based on my research on boredom, I ran a 5 day experiment during which I asked people to send me a voice note or text whenever they were idle and I sent them an activity they could take up in that moment.",
      },
    ],
    image: [
      {
        type: "figure",
        image: img7,
        caption: "",
      },
    ],
  },
  {
    type: "imgtext",
    body: [
      {
        type: "p",
        text: "Feedback from participants",
      },
      {
        type: "p",
        text: "People reacted positively to the experiment and were more aware of their idle time towards the end.",
      },
      {
        type: "header",
        text: "\"I was able to understand the different cues around me and make distinction between my idle and work time.\" --- Shreya, 24 · College Student",
        level: 1
      },
      {
        type: "header",
        text: "\"I enjoyed doing small activities that were also fun, moreover I was aware of when I was wasting my time and when I was actually idle\" --- Shubham, 26 · Manager at an MNC.",
        level: 1
      },
    ],
    image: [],
  },
  {
    type: "imgtext",
    body: [
      {
        type: "p",
        text: "Post the experiment, I compiled all the findings and decided to create a device",
      },
    ],
    image: [
      {
        type: "figure",
        image: img2,
        caption: "Capabilities of the device",
      },
    ],
  },
  {
    type: "imgtext",
    body: [
      {
        type: "p",
        text: "What does the device do?",
      },
      {
        type: "p",
        text: "It suggests constructive (not productive) activities from Berkeley University's Greater Good in Action Website which contains science backed practices for a meaningful life. These activities shift our focus from the future to the present & initiate a mindful state. All of it with a click of a button.",
      },
    ],
    image: [
      {
        type: "figure",
        image: img8,
        caption: "",
      },
      {
        type: "figure",
        image: img11,
        caption: "",
      },
    ],
  },
  {
    type: "imgtext",
    body: [
      {
        type: "p",
        text: "More Features",
      },
      {
        type: "bullet",
        text: [
          "It lets people generate activities voluntarily, hence giving them back control over their actions. Once they complete an activity, they'll be motivated to complete other productive tasks in their day.",
          "Habits follow the framework of Trigger/Cue, Behaviour, and Consequence. An effective way to change habits is to keep the trigger same but change the behaviour.",
        ],
      },
      {
        type: "p",
        text: "The device does that by replacing the behavior of pulling out phone from the pocket for scrolling with getting an acivity suggestion from the device.",
      },
    ],
    image: [
      {
        type: "figure",
        image: img9,
        caption: "Habit framework",
      },
    ],
  },
  {
    type: "imgtext",
    body: [
      {
        type: "p",
        text: "Why is idle time important?",
      },
      {
        type: "bullet",
        text: [
          "When we're idle, our brains can connect between unrelated concepts that have been fed into our subconscious. Some of the most important discoveries have happened when people were not working.",
          "If we spend our idle time well, we can focus better. Clearly demarcating idle time and focus time, helps our mind wanders less.",
          "We can learn or internalize our previously learned skills, like an instrument, if we're not focused on anything.",
        ],
      },
      {
        type: "p",
        text: "Interesting findings",
      },
      {
        type: "bullet",
        text: [
          "My assumption that stress/trauma is the biggest contributing factor to binge habits turned out false, as boredom turned out to be the biggest factor.",
          "No amount of problem solving can solve for awareness. If we're aware of our surroundings and pay attention to our own behaviour, we've solved 90% the problem.",
        ],
      },
    ],
    image: [
      {
        type: "figure",
        image: img10,
        caption: "",
      },
    ],
  },
];

export default project5;