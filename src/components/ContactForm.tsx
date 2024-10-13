import React, { useState, FormEvent, useMemo } from "react";
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
    contact: "", // Combined field for email or phone
    message: "",
  });
  const [status, setStatus] = useState<StatusType>({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactType, setContactType] = useState<"email" | "phone">("email");

  const tagTexts = [
    "App/Website redesign",
    "MVP Design",
    "XR Design",
    "0-1 Product Design",
    "Corporate Figma Training",
    "1:1 Figma Session",
  ];

  const tagProperties = useMemo(() => {
    return tagTexts.map(() => ({
      color: vibrantColors[Math.floor(Math.random() * vibrantColors.length)],
      rotation: Math.random() * 4 - 2,
    }));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Automatically detect if input is email or phone
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

    // Prepare the form data with the correct field name
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
        message:
          "Thank you for your message. I will get back to you at the earliest!",
      });
      setFormData({
        name: "",
        company: "",
        contact: "",
        message: "",
      });
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
      <h1>Get in touch for</h1>
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
        <div className={`status-message ${status.type}`}>{status.message}</div>
      )}
      <form onSubmit={handleSubmit} className="contact-form">
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
