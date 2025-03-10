import React from 'react';
import * as PhosphorIcons from '@phosphor-icons/react';
import { Icon as PhosphorIcon } from '@phosphor-icons/react';
import '../styles/Button.scss';

type IconWeight = 'thin' | 'light' | 'regular' | 'bold' | 'duotone' | 'fill';

type ButtonProps = {
  className?: string;
  text?: string;
  iconName?: keyof typeof PhosphorIcons;
  withIcon?: boolean;
  iconDirection?: 'left' | 'right';
  withText?: boolean;
  size?: 's' | 'm' | 'l';
  variant?: 'primary' | 'secondary' | 'tertiary' | 'success';
  weight?: IconWeight;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean; // Added disabled prop
};

const Button: React.FC<ButtonProps> = ({
  className,
  text,
  iconName,
  withIcon = false,
  iconDirection = 'left',
  withText = true,
  size = 'm',
  variant = 'primary',
  weight = 'regular',
  type = 'button',
  onClick,
  disabled = false, // Default to false
}) => {
  const IconComponent = iconName ? (PhosphorIcons[iconName] as PhosphorIcon) : null;

  const sizeConfig = {
    s: { iconSize: '1.2em', fontSize: '1em' },
    m: { iconSize: '1.3em', fontSize: '1.2em' },
    l: { iconSize: '1.3em', fontSize: '1.4em' },
  };

  const { iconSize, fontSize } = sizeConfig[size];

  return (
    <button 
      className={`${className} custom-button custom-button-${size} custom-button-${variant} custom-button-${iconDirection}`}
      onClick={onClick}
      style={{ fontSize }}
      type={type}
      disabled={disabled}
    >
      {withIcon && IconComponent && (
        <IconComponent size={iconSize} weight={weight} />
      )}
      {withText && text && <span>{text}</span>}
    </button>
  );
};

export default Button;