import Button from "./Buttons";
import "../styles/WorkTogether.scss";

import Tag, { VibrantColor } from "./Tag";

const vibrantColors: VibrantColor[] = [
  { bg: "#fefefe", text: "#FF4D4D" },
  { bg: "#fefefe", text: "#00CC66" },
  { bg: "#fefefe", text: "#3399FF" },
  { bg: "#fefefe", text: "#FF9933" },
  { bg: "#fefefe", text: "#9933FF" },
];

const tagTexts = [
  "App/Website redesign",
  "MVP Design",
  // "Design systems",
  "Startup consulting",
  "Figma training",
];

const tagProperties = tagTexts.map(() => ({
  color: vibrantColors[Math.floor(Math.random() * vibrantColors.length)],
  rotation: Math.random() * 4 - 2,
}));

const WorkTogether: React.FC = () => {
  return (
    <div id="contact" className="contact-form-container">
      <h1>Let's work together!</h1>
      <div className="tags-row">
        {tagTexts.map((text, index) => (
          <Tag
            key={index}
            text={text}
            color={tagProperties[index].color}
            rotation={tagProperties[index].rotation}
            dot={false}
          />
        ))}
      </div>
      <h4>I work with early stage startups to create design processes, set up design systems, and launch MVPs</h4>

      <div className="cta-row">
        <a
          href="https://calendly.com/notkarankapoor/30min"
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* Envelope icon */}
          <Button
            text="Schedule a Chat"
            iconName="Calendar"
            withIcon={true}
            iconDirection="left"
            variant="primary"
            size="m"
          />
        </a>
        <a
          href="/figma-training"
        >
          {/* Figma Training page link */}
          <Button
            text="Book a Figma Training"
            withText={true}
            iconName="FigmaLogo"
            withIcon={true}
            iconDirection="left"
            variant="secondary"
            size="m"
          />
        </a>
      </div>
    </div>
  );
};

export default WorkTogether;