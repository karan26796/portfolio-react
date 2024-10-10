import React from 'react';
import { IconProps } from 'phosphor-react';
import '../styles/Button.scss';

type ButtonProps = {
  text?: string; // Optional text for the button
  iconName?: keyof typeof import('phosphor-react'); // Icon name from phosphor icons
  withIcon?: boolean; // Whether the button has an icon or not
  withText?: boolean; // Whether the button has text or not
  size?: 's' | 'm' | 'l'; // Size variant for the button (small, medium, large)
  variant?: 'primary' | 'secondary' | 'danger' | 'success'; // Style variant
  onClick?: () => void; // Click handler for the button
};

const Buttons: React.FC<ButtonProps> = ({
  text,
  iconName,
  withIcon = false,
  withText = true,
  size = 'm', // Default to medium size
  variant = 'primary', // Default to primary style
  onClick,
}) => {
  // Dynamically import the icon from Phosphor Icons
  const IconComponent = iconName ? (require('phosphor-react')[iconName] as React.FC<IconProps>) : null;

  // Define sizes for the icon and text
  const sizeConfig = {
    s: { iconSize: 16, fontSize: '0.75em' }, // Small size
    m: { iconSize: 24, fontSize: '1em' },   // Medium size
    l: { iconSize: 32, fontSize: '1.25em' }, // Large size
  };

  const { iconSize, fontSize } = sizeConfig[size];

  return (
    <button 
      className={`custom-button custom-button-${size} custom-button-${variant}`}
      onClick={onClick}
      style={{ fontSize }}
    >
      {withIcon && IconComponent && <IconComponent size={iconSize} />}
      {withText && text && <span>{text}</span>}
    </button>
  );
};

export default Buttons;
