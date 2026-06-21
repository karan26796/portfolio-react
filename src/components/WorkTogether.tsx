import Button from "./Buttons";
import ScrollReveal, { scrollRevealStagger } from "./ScrollReveal";
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
  "Startup consulting",
  "Figma training",
];

const WorkTogether: React.FC = () => {
  return (
    <ScrollReveal className="contact-form-container">
      <div id="contact">
        <h1>Let's work together!</h1>
        <div className="tags-row">
          {tagTexts.map((text, index) => (
            <ScrollReveal key={text} delay={scrollRevealStagger(index, 50)} variant="fade">
              <Tag
                text={text}
                color={vibrantColors[index % vibrantColors.length]}
                dot={false}
              />
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal delay={200}>
          <h4>I work with early stage startups to create design processes, set up design systems, and launch MVPs</h4>
        </ScrollReveal>
        <ScrollReveal delay={280}>
          <div className="cta-row">
            <a
              href="https://calendly.com/notkarankapoor/30min"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                text="Schedule a Chat"
                iconName="Calendar"
                withIcon={true}
                iconDirection="left"
                variant="primary"
                size="m"
              />
            </a>
            <a href="/figma-training">
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
        </ScrollReveal>
      </div>
    </ScrollReveal>
  );
};

export default WorkTogether;
