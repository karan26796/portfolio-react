import React, { useState, FormEvent, useMemo } from 'react';
import '../styles/ContactForm.scss';
import Button from './Buttons';

const vibrantColors = [
  { bg: '#fefefe', text: '#FF4D4D' }, // Red
  { bg: '#fefefe', text: '#00CC66' }, // Green
  { bg: '#fefefe', text: '#3399FF' }, // Blue
  { bg: '#fefefe', text: '#FF9933' }, // Orange
  { bg: '#fefefe', text: '#9933FF' }, // Purple
];

const Tag: React.FC<{ text: string; color: typeof vibrantColors[0]; rotation: number }> = ({ text, color, rotation }) => {
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', { name, company, phone, email, message });
    // Add your form submission logic here
  };

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
      <form onSubmit={handleSubmit} className="contact-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />

        <Button
          className='submit-button'
          text="Submit"
          // iconName="XLogo"
          withIcon={false}
          iconDirection="left"
          withText={true}
          size="l"
          variant="primary"
          weight="regular"
          type='submit'
        />
      </form>
    </div>
  );
};

export default ContactForm;