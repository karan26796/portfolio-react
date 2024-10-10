import React, { useState } from "react";
import "../styles/HeaderWithCarousel.scss";
import LogoCarousel from "./LogoCarousel";
import Buttons from "./Buttons";
import ResumePopup from "../pages/ResumePopup";

const HeaderWithCarousel: React.FC = () => {
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);

  const toggleResume = (): void => {
    setIsResumeOpen(!isResumeOpen);
  };

  const closeResume = (): void => {
    setIsResumeOpen(false);
  };

  return (
    <div className="header-details">
      <div className="profile" />
      <h1 className="semibold">Karan Kapoor</h1>
      <h3>SPD@Keka HR — XR Designer — Figma Trainer</h3>
      <h3 className="length-xxs">
        In my ~6 years as a designer, I have helped startups of different sizes
        build 0-to-1 products, achieve product-market fit, and conducted design
        workshops at leading organizations in India and the US.
      </h3>
      <LogoCarousel />
      <div className="button-group">
        <Buttons
          text="Get in touch"
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
          text="Secondary Button Large"
          iconName="User"
          withIcon={true}
          iconDirection="left"
          withText={true}
          size="m"
          variant="secondary"
          weight="duotone"
          onClick={() => console.log("Primary button clicked!")}
        /> */}
        
        <Buttons
          text="Resume"
          iconName="ReadCvLogo"
          withIcon={true}
          iconDirection="left"
          withText={true}
          size="m"
          variant="secondary"
          weight="duotone"
          onClick={toggleResume}
        />
      </div>
      <ResumePopup isOpen={isResumeOpen} onClose={closeResume} />
    </div>
  );
};

export default HeaderWithCarousel;
