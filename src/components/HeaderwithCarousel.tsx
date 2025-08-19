import React, { useState } from "react";
import "../styles/HeaderWithCarousel.scss";
import LogoCarousel from "./LogoCarousel";
import Buttons from "./Buttons";
import ResumePopup from "../pages/ResumePopup";
import Tag, { VibrantColor } from "./Tag";
import profile from "../utils/gallery/profile.webp"
import { Link } from "react-router-dom";

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
    <div className="header-container">
      <div className="header-column-one">

        <div className="tags">
          {['Vibe coder', '2x Founding Designer', 'Figma Trainer', 'NID alum'].map((text, idx) => {
            const vibrantColors = [
              { bg: "#fefefe", text: "#00CC66" },
              { bg: "#fefefe", text: "#3399FF" },
              { bg: "#fefefe", text: "#FF9933" },
              { bg: "#fefefe", text: "#ee33ffff" },
            ];
            const color = vibrantColors[idx];
            return (
              <Tag
                key={idx}
                text={text}
                color={color}
                rotation={Math.random() * 4 - 2}
                dot={false}
              />
            );
          })}
        </div>

        <div className="name-tag-group">
          <h1>It's me, Karan <br />I specialize in designing interfaces and flows backed by deep user insights and behaviour. </h1>
          <p className="intro-text">
            Currently shaping employee experience for <strong>2 million users</strong> at <strong>Keka HR</strong> and integrating AI in my workflow.
          </p>
        
        </div>

        <LogoCarousel align="flex-start" />

        <div className="button-group">
          <Buttons
            text="View Resume"
            iconName="FileText"
            withIcon={true}
            iconDirection="left"
            withText={true}
            size="m"
            variant="primary"
            weight="regular"
            onClick={toggleResume}
          />
        </div>

        <ResumePopup isOpen={isResumeOpen} onClose={closeResume} />
      </div>

    </div>
  );
};

export default HeaderWithCarousel;


{/* <div className="header-row">
        <img className="profile" src={profile} alt="Karan Kapoor's profile picture" />
        <h1 > Karan Kapoor </h1>
      </div> */}

{/* <p style={{maxWidth:'40ch'}}>Currently shaping employee experience for 1.2 million users and integrating AI in my workflow</p> */ }
{/* <Tag
          text={"open for freelance and part-time work"}
          color={work[0]}
          rotation={0}
          dot={true}
          pulsatingDot={true}
          variant='small'
        /> */}

{/* <br/><br/>I also conduct Figma training for designers & PMs at top  startups and institutions. */ }

{/* <div className="button-group">
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
      </div> */}