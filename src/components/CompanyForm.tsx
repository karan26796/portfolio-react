import React, { useState, FormEvent, useEffect } from 'react';
import Button from './Buttons';

type StatusType = {
  type: "" | "success" | "error";
  message: string;
};

const CompanyForm: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    teamSize: "",
  });
  const [status, setStatus] = useState<StatusType>({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState<number | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (redirectCountdown !== null && redirectCountdown > 0) {
      timer = setTimeout(() => {
        setRedirectCountdown(redirectCountdown - 1);
      }, 1000);
    } else if (redirectCountdown === 0) {
      window.open("https://calendly.com/karankapoor/project-discussion", "_blank");
    }
    return () => clearTimeout(timer);
  }, [redirectCountdown]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch("https://formspree.io/f/mqakkbgl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setStatus({
        type: "success",
        message: "Thank you for your message. You will be redirected to schedule a meeting in",
      });
      setFormData({
        companyName: "",
        contactPerson: "",
        email: "",
        teamSize: "",
      });
      setRedirectCountdown(3);
    } catch (error) {
      setStatus({
        type: "error",
        message: "There was an error submitting your message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="company-form-container">
      {status.type && (
        <div className={`status-message ${status.type}`}>
          {status.message}
          {redirectCountdown !== null && ` ${redirectCountdown} seconds.`}
        </div>
      )}
      <form id="companyForm" onSubmit={handleSubmit}>
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="contactPerson"
          placeholder="Contact Person"
          value={formData.contactPerson}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="teamSize"
          placeholder="Team Size"
          value={formData.teamSize}
          onChange={handleChange}
          required
        />
        <Button
          className="submit-button"
          text={isSubmitting ? "Sending..." : "Get a quote"}
          variant="primary"
          type="submit"
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
};

export default CompanyForm;