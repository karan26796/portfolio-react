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
      <div className="header-row">
        <img className="profile" src={profile} alt="Karan Kapoor's profile picture" />
      </div>
      <div className="name-tag-group">
        <h1>Karan Kapoor</h1>
        <Tag
          text={"open for freelance and part-time work"}
          color={work[0]}
          rotation={0}
          dot={true}
          pulsatingDot={true}
          variant='small'
        />
      </div>
      <p style={{ margin: '0' }}>Senior Designer@Keka HR — AI powered react dev — XR Designer</p>
      <p style={{ maxWidth: "40ch", color: "var(--primary-text)", fontSize: "1.5em" }}>
    Product Designer with ~7 years of experience, currently leading Employee Experience at Keka HR. I partner with startups to craft digital products and conduct Figma workshops for top teams and institutions.
      </p>
      <div className="button-group">
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
      <LogoCarousel align="flex-start" />
      <ResumePopup isOpen={isResumeOpen} onClose={closeResume} />
    </div>
  );
};

export default HeaderWithCarousel;
