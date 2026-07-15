import React, { useState } from "react";
import { Plus, Minus } from "@phosphor-icons/react";
import ScrollReveal, { scrollRevealStagger } from "./ScrollReveal";
import "../styles/FAQ.scss";

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

interface FAQProps {
  data: FAQItem[];
  hideTitle?: boolean;
  title?: string;
}

const FAQ: React.FC<FAQProps> = ({ data, hideTitle = false, title = "About my process" }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      {!hideTitle && (
        <ScrollReveal>
          <h2 style={{ textAlign: "center" }}>{title}</h2>
        </ScrollReveal>
      )}
      {data.map((item, index) => (
        <ScrollReveal key={index} delay={scrollRevealStagger(index, 70)}>
          <div className="faq-item">
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              <h4>{item.question}</h4>
              <span className="faq-icon" style={{ transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                {openIndex === index ? <Minus size={24} /> : <Plus size={24} />}
              </span>
            </div>
            <div className={`faq-answer ${openIndex === index ? 'open' : 'closed'}`}>
              <div dangerouslySetInnerHTML={{ __html: item.answer as string }} />
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
};

export default FAQ;