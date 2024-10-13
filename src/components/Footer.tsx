import React from "react";
import "../styles/Footer.scss";
import Button from "./Buttons";

const Footer: React.FC = () => {
  const handleSocialMediaClick = (url: string) => {
    window.open(url, "_blank"); // Opens the URL in a new tab
  };

  return (
    <div className="footer-container">
      <div className="links">
        <Button
          text="LinkedIn"
          iconName="LinkedinLogo"
          withIcon={true}
          iconDirection="left"
          withText={false}
          size="m"
          variant="secondary"
          weight="regular"
          onClick={() => handleSocialMediaClick("https://www.linkedin.com/in/karankapoorux")}
        />

        <Button
          text="Twitter"
          iconName="XLogo"
          withIcon={true}
          iconDirection="left"
          withText={false}
          size="m"
          variant="secondary"
          weight="regular"
          onClick={() => handleSocialMediaClick("https://twitter.con/kadankapoor")}
        />

        <Button
          text="Instagram"
          iconName="InstagramLogo"
          withIcon={true}
          iconDirection="left"
          withText={false}
          size="m"
          variant="secondary"
          weight="regular"
          onClick={() => handleSocialMediaClick("https://www.instagram.com/kadankapoor")}
        />
      </div>
      <h5>Made with ❤️ in react. Hosted on vercel</h5>
      {/* <p>Portfolio inspirations : Mehak Samaiya, Studio Sense</p> */}
    </div>
  );
};

export default Footer;
