import React from 'react';
import * as PhosphorIcons from '@phosphor-icons/react';
import { Icon as PhosphorIcon } from '@phosphor-icons/react';
import '../styles/Button.scss';

type IconWeight = 'thin' | 'light' | 'regular' | 'bold' | 'duotone' | 'fill';

type ButtonProps = {
  className?:string;
  text?: string;
  iconName?: keyof typeof PhosphorIcons;
  withIcon?: boolean;
  iconDirection?: 'left' | 'right';
  withText?: boolean;
  size?: 's' | 'm' | 'l';
  variant?: 'primary' | 'secondary' | 'tertiary' | 'success';
  weight?: IconWeight;
  type?: 'button' | 'submit' | 'reset'; // Added type options for button
  onClick?: () => void;
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
  type = 'button', // Default type to 'button'
  onClick,
}) => {
  // Properly type the IconComponent
  const IconComponent = iconName ? (PhosphorIcons[iconName] as PhosphorIcon) : null;

  const sizeConfig = {
    s: { iconSize: '1.2em', fontSize: '1em' },
    m: { iconSize: '1.5em', fontSize: '1.25em' },
    l: { iconSize: '1.8em', fontSize: '1.5em' },
  };

  const { iconSize, fontSize } = sizeConfig[size];

  return (
    <button 
      className={`${className} custom-button custom-button-${size} custom-button-${variant} custom-button-${iconDirection}`}
      onClick={onClick}
      style={{ fontSize }}
      type={type} // Set the button type
    >
      {withIcon && IconComponent && (
        <IconComponent size={iconSize} weight={weight} />
      )}
      {withText && text && <span>{text}</span>}
    </button>
  );
};

export default Button;
