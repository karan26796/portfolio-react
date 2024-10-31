import React, { useState } from "react";
import "../styles/HeaderWithCarousel.scss";
import LogoCarousel from "./LogoCarousel";
import Buttons from "./Buttons";
import ResumePopup from "../pages/ResumePopup";
import Tag, { VibrantColor } from "./Tag";
import profile from "../utils/gallery/profile.webp"

const HeaderWithCarousel: React.FC = () => {
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);

  const toggleResume = (): void => {
    setIsResumeOpen(!isResumeOpen);
  };

  const closeResume = (): void => {
    setIsResumeOpen(false);
  };

  const work: VibrantColor[] = [{ bg: "#fefefe", text: "#02bd69" }];

  return (
    <div className="header-details">
      <img className="profile" src={profile} />
      <h1>Karan Kapoor</h1>
      <p style={{ margin: '0' }}>SPD@Keka HR — AI powered react dev — XR Designer</p>

      <p style={{ maxWidth: "40ch", color:"var(--primary-text)", fontSize:"1.5em"}}>Product designer and Figma trainer with 6 years of experience crafting
        digital products for startups and conducting Figma training at top companies. </p>
      
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
          iconName="ArrowDown"
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
      </div>

      <LogoCarousel />

      <ResumePopup isOpen={isResumeOpen} onClose={closeResume} />
    </div>
  );
};

export default HeaderWithCarousel;
