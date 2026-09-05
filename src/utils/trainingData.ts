import { Testimonial } from "../components/Testimonials";
import { VibrantColor } from "../components/Tag";
import siva from "./testimonials/sivaprakash.webp";
import shagun from "./testimonials/shagun.webp";
import rishikesh from "./testimonials/rishikesh.webp";

export const trainingTestimonialsData: Testimonial[] = [
  {
    id: 1,
    name: "SivaPrakash",
    role: "UX Designer / Illustrator",
    company: "Figma Masterclass",
    avatarUrl: siva,
    title: "Jam-packed masterclass filled with time-saving shortcuts",
    testimonial:
      "10/10 will definitely join the workshop again to help aspiring designers :) It was such a jam packed session and it has helped me learn so many shortcuts which I wouldn't have known before.",
    highlightedWords: [
      "10/10 will definitely join the workshop again",
      "helped me learn so many shortcuts",
    ],
  },
  {
    id: 2,
    name: "Shagun",
    role: "UX Designer",
    company: "Figma Masterclass",
    avatarUrl: shagun,
    title: "Unlocked Auto Layout, variants, and component workflows",
    testimonial:
      "Absolutely loved the workshop! Since I started using Figma, I wanted to learn Autolayout. This workshop not only helped me learn that, but also other cool things like variants and states in components. I can see how all these tricks would help me save hours! Looking forward to attending more of these in the future!!",
    highlightedWords: [
      "Absolutely loved the workshop!",
      "cool things like variants and states in components.",
      "Looking forward to attending more of these in the future!!",
    ],
  },
  {
    id: 3,
    name: "Rishikesh Medhi",
    role: "UX Designer",
    company: "Figma Masterclass",
    avatarUrl: rishikesh,
    title: "Structured learning with real-time feedback",
    testimonial:
      "There is already good content on the net too but teaching it in a structured manner and even giving a room for instant feedback made this experience very valuable and wholesome.",
    highlightedWords: [
      "room for instant feedback made this experience very valuable and wholesome.",
    ],
  },
  {
    id: 4,
    name: "Shivani Singh",
    role: "Design Student",
    company: "Figma Masterclass",
    avatarUrl: "",
    title: "Well-planned, practical, and step-by-step guidance",
    testimonial:
      "The workshop was not too heavy, not very surface level either. Everything that is required was covered. The course content was well-planned and taught with utmost patience. The step-by-step approach was very helpful.",
    highlightedWords: [
      "not too heavy, not very surface level either.",
      "The course content was well-planned and taught with utmost patience",
    ],
  },
];

export const vibrantColors: VibrantColor[] = [
  { text: "#FF4D4D" },
  { text: "#00CC66" },
  { text: "#3399FF" },
  { text: "#FF9933" },
  { text: "#9933FF" },
];

export const tagTextIndividual = [
  "Auto layout expertise",
  "Rapid prototyping",
  "Componentless scalable design",
  "Bulk actions in Figma",
  "Design system",
  "Plugins and shortcuts",
  "Intro to variants",
  "Customized topics",
];

export const tagTextCompany = [
  "Figma Basics to Advanced",
  "Design consulting",
  "Design system setup",
  "Rapid prototyping",
  "Variants",
  "Figma for Product Managers",
  "Customised topics"
];

/**
 * The training page's FAQ.
 *
 * Every claim here is one the site already makes — the assistant's training
 * context in App.tsx and the page's own intro paragraph — so the section
 * cannot drift away from what the rest of the page says.
 */
export const trainingFaqs = [
  {
    question: "What a session covers",
    answer:
      "Auto Layout, design systems, prototyping, design tokens, and design-to-development with AI. The mix is set by the room rather than a fixed syllabus, so a design team and a group of product managers get different sessions.",
  },
  {
    question: "Who they are for",
    answer:
      "Beginners through to working professionals — design teams, product managers and students. Over the last 5 years I've taught Figma to more than <strong>10,000 people</strong>.",
  },
  {
    question: "Where I've taught",
    answer:
      "Organisations and institutions across <strong>India and the US</strong>, including IIM Ahmedabad, IIM Sambalpur, IIT Madras, Indiana University, FLAME University and Zuddl.",
  },
  {
    question: "The community work behind it",
    answer:
      "I led <strong>Friends of Figma, Delhi</strong> for 5 years, running 20+ workshops and events for over 5,000 designers — including hosting Figma Config '24 at IIT Delhi.",
  },
];
