import React, { useEffect, useRef, useState } from 'react';
import { useScrollRevealDefaults } from './ScrollRevealContext';
import '../styles/ScrollReveal.scss';

export type ScrollRevealVariant = 'fade-up' | 'fade' | 'scale' | 'image-reveal';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: ScrollRevealVariant;
  once?: boolean;
  threshold?: number;
  rootMargin?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  role?: string;
  tabIndex?: number;
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}

export const scrollRevealStagger = (index: number, step = 80) => index * step;

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  variant = 'fade-up',
  once: onceProp,
  threshold = 0.05,
  rootMargin = '100px 0px -2% 0px',
  style,
  onClick,
  role,
  tabIndex,
  onKeyDown,
}) => {
  const { once: defaultOnce } = useScrollRevealDefaults();
  const once = onceProp ?? defaultOnce;
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, threshold, rootMargin]);

  return (
    <div
      ref={ref}
      className={`scroll-reveal scroll-reveal--${variant}${visible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      style={{ '--scroll-reveal-delay': `${delay}ms`, ...style } as React.CSSProperties}
      onClick={onClick}
      role={role}
      tabIndex={tabIndex}
      onKeyDown={onKeyDown}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
