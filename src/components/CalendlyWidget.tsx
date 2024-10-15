import React, { useEffect } from 'react';

const CalendlyWidget: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="calendly-inline-widget calendly"
      data-url="https://calendly.com/karankapoor/figma-1-1-session?hide_gdpr_banner=1"
    />
  );
};

export default CalendlyWidget;