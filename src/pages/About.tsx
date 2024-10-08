import React from "react";
import "../styles/About.scss";

const About: React.FC = () => {
  return (
    <div className="about-parent">
      <h2>My name is Jeff</h2>
      <p>
        Hey, Karan here. I'm a digital product designer, code learner,
        electronics prototyper, amateur photo clicker, & traveller. When I'm not
        saving the world with design, I watch standup comedy, travel the
        country, photograph landscapes, play lawn tennis, and learn to code. One
        at a time.
        <br />
        <br />
        I started off as an Android Developer but soon moved to UX Design. Since
        then I've had a lot of fun designing digital products for studios &
        product companies.
        <br />
        <br />
        The first company I joined as a designer got shut during the pandemic.
        Due to a lot of free time, I started learning Figma during the pandemic
        & thought - why not share what I know with others?
        <br />
        <br />
        Since then, I've taught 10k+ people through my design workshops &
        Youtube tutorials.
      </p>
    </div>
  );
};

export default About;
