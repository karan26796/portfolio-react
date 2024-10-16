import React, { useState, useMemo } from "react";
import "../styles/HeaderWithCarousel.scss";
import LogoCarousel from "./LogoCarousel";
import Buttons from "./Buttons";
import ResumePopup from "../pages/ResumePopup";
import Tag, { VibrantColor } from "./Tag";

const HeaderWithCarousel: React.FC = () => {
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);

  const toggleResume = (): void => {
    setIsResumeOpen(!isResumeOpen);
  };

  const closeResume = (): void => {
    setIsResumeOpen(false);
  };

  const vibrantColors: VibrantColor[] = [
    { bg: "#fefefe", text: "#FF4D4D" },
    { bg: "#fefefe", text: "#00CC66" },
    { bg: "#fefefe", text: "#3399FF" },
    { bg: "#fefefe", text: "#FF9933" },
    { bg: "#fefefe", text: "#9933FF" },
  ];

  const work: VibrantColor[] = [{ bg: "#fefefe", text: "#02bd69" }];

  const tagTexts = ["SPD@Keka HR", "XR Designer", "Figma Trainer"];

  return (
    <div className="header-details">
      <div className="profile" />
      <h1 className="semibold">Karan Kapoor</h1>
      <p style={{margin:'0' }}>SPD@Keka HR — Figma Trainer — XR Designer</p>

      <p className="length-xxs" style={{ textAlign: "center", margin:'0' }}>
        In my ~6 years as a designer, I have helped startups of different sizes
        build 0-to-1 products, achieve product-market fit, and conducted design
        workshops at leading organizations in India and the US.
      </p>
      
      <div className="button-group">
      <Tag
        text={"open for freelance and part-time work"}
        color={work[0]}
        rotation={0}
        dot={true}
        pulsatingDot={true}
        variant='small'
      />
        <Buttons
          text="Let's  work together"
          iconName="ArrowRight"
          withIcon={true}
          iconDirection="right"
          withText={true}
          size="m"
          variant="primary"
          weight="regular"
          onClick={() => {
            const contactSection = document.getElementById("contact");
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
        />

        {/* <Buttons
          text="Resume"
          iconName="ReadCvLogo"
          withIcon={true}
          iconDirection="left"
          withText={true}
          size="m"
          variant="secondary"
          weight="duotone"
          onClick={toggleResume}
        /> */}
      </div>
      
      <LogoCarousel/>
      <ResumePopup isOpen={isResumeOpen} onClose={closeResume} />
    </div>
  );
};

export default HeaderWithCarousel;
