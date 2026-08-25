import React, { useState, useEffect, useRef } from 'react';
import ScrollReveal from './ScrollReveal';
import '../styles/Testimonials.scss';

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  companyLogoUrl?: string;
  avatarUrl?: string;
  title?: string;
  testimonial: string;
  highlightedWords?: string[];
}

interface TestimonialsProps {
  data: Testimonial[];
  title: string;
  subtitle?: string;
}

const AUTO_ADVANCE_MS = 6000;

const Testimonials: React.FC<TestimonialsProps> = ({ data }) => {
  const [activeId, setActiveId] = useState<number | string>(() => data[0]?.id);

  useEffect(() => {
    if (data.length > 0 && !data.some((item) => item.id === activeId)) {
      setActiveId(data[0].id);
    }
  }, [data, activeId]);

  // `data` is a new array reference on every parent render (it's an inline
  // literal in the caller), so a ref avoids that identity churn resetting
  // the timer below before it ever fires.
  const dataRef = useRef(data);
  dataRef.current = data;

  // Auto-advance through testimonials; re-armed whenever activeId changes,
  // so a manual dot click resets the countdown instead of fighting it.
  useEffect(() => {
    if (data.length <= 1) return;

    const timer = setInterval(() => {
      const list = dataRef.current;
      setActiveId((current) => {
        const index = list.findIndex((item) => item.id === current);
        const next = list[(index + 1) % list.length];
        return next.id;
      });
    }, AUTO_ADVANCE_MS);

    return () => clearInterval(timer);
  }, [data.length, activeId]);

  const handleNext = () => {
    if (data.length <= 1) return;
    const index = data.findIndex((item) => item.id === activeId);
    const next = data[(index + 1) % data.length];
    setActiveId(next.id);
  };

  const active = data.find((item) => item.id === activeId) || data[0];
  if (!active) return null;

  return (
    <div className="testimonials-section">
      <ScrollReveal
        key={active.id}
        className="testimonial-spotlight"
        onClick={handleNext}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleNext();
          }
        }}
      >
        {active.companyLogoUrl && (
          <div className="testimonial-icon-wrap">
            <img
              src={active.companyLogoUrl}
              alt={active.company || active.name}
              className="testimonial-icon"
            />
          </div>
        )}

        <div className="testimonial-copy">
          {active.title && <h3 className="testimonial-title">{active.title}</h3>}
          <p className="testimonial-quote">&ldquo;{active.testimonial}&rdquo;</p>
        </div>

        <div className="testimonial-attribution">
          {active.avatarUrl ? (
            <img src={active.avatarUrl} alt={active.name} className="testimonial-avatar" />
          ) : (
            <div className="testimonial-avatar placeholder" />
          )}
          <div className="testimonial-attribution-text">
            <span className="testimonial-name">{active.name}</span>
            <span className="testimonial-role">
              {active.role}
              {active.role && active.company ? `, ${active.company}` : active.company}
            </span>
          </div>
        </div>
      </ScrollReveal>

      {data.length > 1 && (
        <div className="testimonial-dots">
          {data.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`testimonial-dot${item.id === activeId ? ' active' : ''}`}
              onClick={() => setActiveId(item.id)}
              aria-label={`Show testimonial from ${item.name}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Testimonials;
