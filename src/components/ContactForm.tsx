import React, { useState, FormEvent, useMemo, useEffect } from "react";
import "../styles/ContactForm.scss";
import Button from "./Buttons";
import Tag, { VibrantColor } from "./Tag";

type StatusType = {
  type: "" | "success" | "error";
  message: string;
};

const vibrantColors: VibrantColor[] = [
  { bg: "#fefefe", text: "#FF4D4D" },
  { bg: "#fefefe", text: "#00CC66" },
  { bg: "#fefefe", text: "#3399FF" },
  { bg: "#fefefe", text: "#FF9933" },
  { bg: "#fefefe", text: "#9933FF" },
];

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    contact: "",
    message: "",
  });
  const [status, setStatus] = useState<StatusType>({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactType, setContactType] = useState<"email" | "phone">("email");
  const [redirectCountdown, setRedirectCountdown] = useState<number | null>(null);

  const tagTexts = [
    "App/Website redesign",
    "MVP Design",
    "XR Design",
    "0-1 Product Design",
    "Design systems",
    "Startup consulting",
  ];

  const tagProperties = useMemo(() => {
    return tagTexts.map(() => ({
      color: vibrantColors[Math.floor(Math.random() * vibrantColors.length)],
      rotation: Math.random() * 4 - 2,
    }));
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (redirectCountdown !== null && redirectCountdown > 0) {
      timer = setTimeout(() => {
        setRedirectCountdown(redirectCountdown - 1);
      }, 1000);
    } else if (redirectCountdown === 0) {
      window.open("https://calendly.com/notkarankapoor/30min", "_blank");
    }
    return () => clearTimeout(timer);
  }, [redirectCountdown]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "contact") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\+?[\d\s-]+$/;

      if (emailRegex.test(value)) {
        setContactType("email");
      } else if (phoneRegex.test(value)) {
        setContactType("phone");
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    const submissionData = {
      ...formData,
      [contactType]: formData.contact,
    };

    try {
      const response = await fetch("https://formspree.io/f/mldeerwo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setStatus({
        type: "success",
        message: "Thank you for your message. You will be redirected to schedule a meeting in",
      });
      setFormData({
        name: "",
        company: "",
        contact: "",
        message: "",
      });
      setRedirectCountdown(3);
    } catch (error) {
      setStatus({
        type: "error",
        message:
          "There was an error submitting your message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact" className="contact-form-container">
      <h1>Let's work together</h1>
      <h4>I work with early stage startups to create design processes, set up design systems, and launch MVPs</h4>
      
      <div className="tag-container">
        {tagTexts.map((text, index) => (
          <Tag
            key={index}
            text={text}
            color={tagProperties[index].color}
            rotation={tagProperties[index].rotation}
            dot={false}
          />
        ))}
      </div>
      {status.type && (
        <div className={`status-message ${status.type}`}>
          {status.message}
          {redirectCountdown !== null && ` ${redirectCountdown} seconds.`}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="company"
          placeholder="Company (optional)"
          value={formData.company}
          onChange={handleChange}
        />
        <input
          className="input-3"
          type="text"
          name="contact"
          placeholder="Email or Phone number"
          value={formData.contact}
          onChange={handleChange}
          required
        />
        <textarea
          className="textarea-full"
          name="message"
          placeholder="How can we collaborate?"
          value={formData.message}
          onChange={handleChange}
          required
        />

        <Button
          className="submit-button"
          text={isSubmitting ? "Sending..." : "Let's work together"}
          withIcon={false}
          iconDirection="left"
          withText={true}
          size="m"
          variant="primary"
          weight="regular"
          type="submit"
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
};

export default ContactForm;