import React, { useState, FormEvent, useMemo } from 'react';
import '../styles/ContactForm.scss'
import Button from './Buttons';

// Define types
type VibrantColor = {
  bg: string;
  text: string;
};

type TagProps = {
  text: string;
  color: VibrantColor;
  rotation: number;
};

type StatusType = {
  type: '' | 'success' | 'error';
  message: string;
};

const vibrantColors: VibrantColor[] = [
  { bg: '#fefefe', text: '#FF4D4D' },
  { bg: '#fefefe', text: '#00CC66' },
  { bg: '#fefefe', text: '#3399FF' },
  { bg: '#fefefe', text: '#FF9933' },
  { bg: '#fefefe', text: '#9933FF' },
];

const Tag: React.FC<TagProps> = ({ text, color, rotation }) => {
  return (
    <h3
      className='tag'
      style={{
        backgroundColor: color.bg,
        color: color.text,
        transform: `rotate(${rotation}deg)`
      }}
    >
      {text}
    </h3>
  );
};

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<StatusType>({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tagTexts = ['App/Website redesign', 'MVP Design', 'XR Design', '0-1 Product Design', 'Corporate Figma Training', '1:1 Figma Session'];

  const tagProperties = useMemo(() => {
    return tagTexts.map(() => ({
      color: vibrantColors[Math.floor(Math.random() * vibrantColors.length)],
      rotation: Math.random() * 4 - 2
    }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('https://formspree.io/f/mldeerwo', {
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
        message: 'Thank you for your message. We will get back to you soon!'
      });
      setFormData({
        name: '',
        company: '',
        phone: '',
        email: '',
        message: ''
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'There was an error submitting your message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact" className="contact-form-container">
      <h1>Get in touch for</h1>
      <div className='tag-container'>
        {tagTexts.map((text, index) => (
          <Tag
            key={index}
            text={text}
            color={tagProperties[index].color}
            rotation={tagProperties[index].rotation}
          />
        ))}
      </div>
      {status.type && (
        <div className={`status-message ${status.type}`}>
          {status.message}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="contact-form"
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
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
        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          required
        />

        <Button
          className='submit-button'
          text={isSubmitting ? 'Sending...' : 'Submit'}
          withIcon={false}
          iconDirection="left"
          withText={true}
          size="l"
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