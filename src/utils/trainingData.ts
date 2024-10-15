import { Testimonial } from '../components/Testimonials';
import { VibrantColor } from "../components/Tag";
import siva from './testimonials/sivaprakash.webp';
import shagun from './testimonials/shagun.webp';
import rishikesh from './testimonials/rishikesh.webp';

export const trainingTestimonialsData: Testimonial[] = [
  {
    id: 1,
    name: "SivaPrakash",
    role: "UX Designer/Illustrator",
    company: "Attended Figma masterclasss",
    avatarUrl: siva,
    testimonial: "10/10 will definitely join the workshop again to help aspiring designers :) It was such a jam packed session and it has helped me learn so many shortcuts which I wouldn't have known before.",
    highlightedWords: ["10/10 will definitely join the workshop again", "helped me learn so many shortcuts"]
  },
  {
    id: 2,
    name: "Shagun",
    role: "UX Designer",
    company: "Attended Figma masterclasss",
    avatarUrl: shagun,
    testimonial: "Absolutely loved the workshop! Since I started using Figma, I wanted to learn Autolayout. This workshop not only helped me learn that, but also other cool things like variants and states in components. I can see how all these tricks would help me save hours! Looking forward to attending more of these in the future!!  ",
    highlightedWords: ["Absolutely loved the workshop!", "cool things like variants and states in components.", "Looking forward to attending more of these in the future!!"]
  },
  {
    id: 3,
    name: "Rishikesh Medhi",
    role: "UX Designer",
    company: "Attended Figma masterclasss",
    avatarUrl: rishikesh,
    testimonial: "There is already good content on the net too but teaching it in a structured manner and even giving a room for instant feedback made this experience very valuable and wholesome. ",
    highlightedWords: ["room for instant feedback made this experience very valuable and wholesome."]
  },
  {
    id: 4,
    name: "Shivani Singh",
    role: "Design Student",
    company: "Attended Figma masterclasss",
    avatarUrl: "",
    testimonial: "The workshop was not too heavy, not very surface level either. everything that is required was covered. The course content was well-planned and taught with utmost patience. The step-by-step approach was very helpful.",
    highlightedWords: ["not too heavy, not very surface level either.", "The course content was well-planned and taught with utmost patience"]
  }
];

export const vibrantColors: VibrantColor[] = [
  { bg: "#fefefe", text: "#FF4D4D" },
  { bg: "#fefefe", text: "#00CC66" },
  { bg: "#fefefe", text: "#3399FF" },
  { bg: "#fefefe", text: "#FF9933" },
  { bg: "#fefefe", text: "#9933FF" },
];

export const tagTexts = [
  "App/Website redesign",
  "MVP Design",
  "XR Design",
  "0-1 Product Design",
  "Corporate Figma Training",
  "1:1 Figma Session",
];