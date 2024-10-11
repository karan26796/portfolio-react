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
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<StatusType>({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tagTexts = ['App/Website redesign', 'MVP Design', 'XR Design', '0-1 Product Design', 'Corporate Figma Training', '1:1 Figma Session'];

  const tagProperties = useMemo(() => {
    return tagTexts.map(() => ({
      color: vibrantColors[Math.floor(Math.random() * vibrantColors.length)],
      rotation: Math.random() * 4 - 2
    }));
  }, []);

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
        action="https://formsubmit.co/7fb200f3e6e189e8a15af2f523cf79dd" // Replace with your FormSubmit email
        method="POST"
        className="contact-form"
        onSubmit={() => setIsSubmitting(true)}
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          name="message"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />

        {/* Hidden inputs for additional configurations */}
        <input type="hidden" name="_subject" value="New contact form submission" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_next" value="https://yourdomain.com/thank-you" />

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
