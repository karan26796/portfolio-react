import React from 'react';
import '../styles/CircleArrowIcon.scss';

type CircleArrowIconProps = {
  className?: string;
  size?: number;
  variant?: 'default' | 'primary';
};

const CircleArrowIcon: React.FC<CircleArrowIconProps> = ({
  className = '',
  size = 40,
  variant = 'default',
}) => (
  <span
    className={`circle-arrow-icon circle-arrow-icon--${variant} ${className}`.trim()}
    style={{ width: size, height: size }}
    aria-hidden="true"
  >
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
);

export default CircleArrowIcon;
