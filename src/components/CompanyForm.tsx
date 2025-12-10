import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import Button from './Buttons';
import Tag, { VibrantColor } from './Tag';
import '../styles/CompanyForm.scss';


type StatusType = {
  type: '' | 'success' | 'error';
  message: string;
};

type FormDataType = {
  message: string;
  email: string;
};


const CompanyForm: React.FC = () => {
  const [formData, setFormData] = useState<FormDataType>({
    message: '',
    email: '',
  });
  const [status, setStatus] = useState<StatusType>({ type: '', message: '' });
  // Auto-dismiss status message after 3 seconds
  useEffect(() => {
    if (status.type) {
      const timer = setTimeout(() => {
        setStatus({ type: '', message: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMessageField, setShowMessageField] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('https://formspree.io/f/mqakkbgl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setStatus({
        type: 'success',
        message: "Thank you for your message. I'll get back within a day.",
      });
      setFormData({ message: '', email: '' });
      setShowMessageField(false);
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'There was an error submitting your message. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Tag logic (copied from WorkTogether)
  const vibrantColors: VibrantColor[] = [
    { bg: '#fefefe', text: '#FF4D4D' },
    { bg: '#fefefe', text: '#00CC66' },
    { bg: '#fefefe', text: '#3399FF' },
    { bg: '#fefefe', text: '#FF9933' },
    { bg: '#fefefe', text: '#9933FF' },
  ];
  const tagTexts = [
    'Design systems',
    'Figma for PMs',
    'AI * Design',
    'Design thinking',
  ];
  const tagProperties = tagTexts.map(() => ({
    color: vibrantColors[Math.floor(Math.random() * vibrantColors.length)],
    rotation: Math.random() * 4 - 2,
  }));

  return (
    <div className="company-form-container" id='#company'>
      <h2>Book a Figma/Design Training for Yourself or your Team</h2>
      <div className="tags-row">
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
      <h4>I run hands-on Figma workshops and design sprints for teams, startups, and individuals. Book a session or send a message to discuss your needs.</h4>
      {status.type && (
        <div
          className={`status-message ${status.type}`}
          style={{
            color: status.type === 'success' ? '#1a7f37' : status.type === 'error' ? '#d32f2f' : undefined,
            borderColor: status.type === 'success' ? '#1a7f37' : status.type === 'error' ? '#d32f2f' : undefined,
            background: status.type === 'success' ? '#e6f4ea' : status.type === 'error' ? '#fdeaea' : undefined,
          }}
        >
          {status.message}
        </div>
      )}
      <div className="cta-row">
        <Button
          text="Book a corporate training"
          iconName="BuildingOffice"
          withIcon={true}
          iconDirection="left"
          variant="primary"
          size="m"
          onClick={() => setShowMessageField((v) => !v)}
        />
        <a
          href="https://calendly.com/karankapoor/figma-1-1-session"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            text="Book a 1:1 Training"
            iconName="Calendar"
            withIcon={true}
            iconDirection="left"
            variant="secondary"
            size="m"
          />
        </a>
      </div>
      {showMessageField && (
        <form id="companyForm" onSubmit={handleSubmit} autoComplete="off" style={{ width: '100%', maxWidth: 500, margin: '1em auto 0 auto' }}>
          <input
            className="textarea-full"
            name="email"
            type="email"
            placeholder="Work Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: '100%' }}
          />
          <textarea
            className="textarea-full"
            name="message"
            placeholder="Tell me what your team needs help with, and number of people.."
            value={formData.message}
            onChange={handleChange}
            required
            style={{ width: '100%', minHeight: 100 }}
          />
          <Button
            className="submit-button"
            text={isSubmitting ? 'Sending...' : 'Send Message'}
            variant="primary"
            type="submit"
            disabled={isSubmitting}
          />
        </form>
      )}
    </div>
  );
};


export default CompanyForm;