import React, { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      {!hideTitle && (
        <ScrollReveal>
          <h2>{title}</h2>
        </ScrollReveal>
      )}
      <div className="faq-list">
        {data.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <ScrollReveal key={index} delay={scrollRevealStagger(index, 60)}>
              <div className={`faq-item ${isOpen ? "open" : ""}`}>
                <div 
                  className="faq-question" 
                  onClick={() => toggleFAQ(index)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleFAQ(index);
                    }
                  }}
                >
                  <h4>{item.question}</h4>
                  <div className={`faq-icon-circle ${isOpen ? "open" : ""}`}>
                    <CaretDown size={20} weight="bold" />
                  </div>
                </div>
                <div className={`faq-answer ${isOpen ? "open" : "closed"}`}>
                  <div dangerouslySetInnerHTML={{ __html: item.answer as string }} />
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
};

export default FAQ;