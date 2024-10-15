import React, { useState, FormEvent, ChangeEvent } from 'react';
import Button from './Buttons';

type StatusType = {
  type: "" | "success" | "error";
  message: string;
};

type FormDataType = {
  companyName: string;
  contactPerson: string;
  email: string;
  teamSize: string;
  message: string;
};

const CompanyForm: React.FC = () => {
  const [formData, setFormData] = useState<FormDataType>({
    companyName: "",
    contactPerson: "",
    email: "",
    teamSize: "",
    message: ""
  });
  const [status, setStatus] = useState<StatusType>({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        message: "Thank you for your message. We'll get back to you soon.",
      });
      setFormData({
        companyName: "",
        contactPerson: "",
        email: "",
        teamSize: "",
        message: ""
      });
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
        </div>
      )}
      <form id="companyForm" onSubmit={handleSubmit}>
        <input
          type="text"
          name="companyName"
          placeholder="Company/Institution Name"
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
          placeholder="Cohort Size"
          value={formData.teamSize}
          onChange={handleChange}
          required
        />
        <textarea
        className="textarea-full"
          name="message"
          placeholder="What topics do you want a workshop on?"
          value={formData.message}
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