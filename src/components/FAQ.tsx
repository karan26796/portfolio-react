import React, { useState } from "react";
import { Plus, Minus } from "phosphor-react";
import "../styles/FAQ.scss";

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

interface FAQProps {
  data: FAQItem[];
}

const FAQ: React.FC<FAQProps> = ({ data }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
        <h1 style={{ textAlign: "center" }}>Hear from me</h1>
      {data.map((item, index) => (
        <div key={index} className="faq-item">
          <div className="faq-question" onClick={() => toggleFAQ(index)}>
            <h3>{item.question}</h3>
            <span className="faq-icon" style={{ transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)' }}>
              {openIndex === index ? <Minus size={24} /> : <Plus size={24} />}
            </span>
          </div>
          <div className={`faq-answer ${openIndex === index ? 'open' : 'closed'}`}>
            <h4>{item.answer}</h4>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;