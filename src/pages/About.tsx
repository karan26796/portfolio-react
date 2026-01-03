import React from "react";
import "../styles/About.scss";
import Gallery from "./Gallery";

const About: React.FC = () => {
  return (
    <div className="about-parent">
      <h2>I'm Karan Kapoor</h2>
      <p>
        I'm an AI-native product designer, design advisor, and 2x founding designer. 
        Currently, I'm a Senior Product Designer at Keka HR, where I lead design for engagement and reward systems 
        supporting 5M+ employees globally.
        <br />
        <br />
        I bridge the gap between design, research, and product strategy to deliver user-centered 
        solutions that drive business impact. Whether I'm partnering with cross-functional teams 
        to build quarterly roadmaps or driving GTM as a founding designer, I think in 
        systems—focusing on clarity and velocity.
        <br />
        <br />
        With a background in Engineering (B.Tech) and Design (M.Des from NID, Ahmedabad), I bring a unique 
        technical perspective to my design process. I'm also deeply committed to the design community, 
        having led the Friends of Figma Delhi chapter for 5 years and mentored 10k+ designers through 
        workshops and tutorials.
        <br />
        <br />
        When I'm not designing, I'm usually experimenting with electronics, photographing landscapes, 
        or learning to code.
      </p>
    </div>
  );
};

export default About;
