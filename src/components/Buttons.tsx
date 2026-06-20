import React from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowSquareOut,
  BuildingOffice,
  Calendar,
  DownloadSimple,
  FigmaLogo,
  FileText,
  Icon as PhosphorIcon,
  InstagramLogo,
  LinkedinLogo,
  X,
  XLogo,
  YoutubeLogo,
} from '@phosphor-icons/react';
import '../styles/Button.scss';

type IconWeight = 'thin' | 'light' | 'regular' | 'bold' | 'duotone' | 'fill';

export type ButtonIconName =
  | 'ArrowDown'
  | 'ArrowRight'
  | 'ArrowSquareOut'
  | 'BuildingOffice'
  | 'Calendar'
  | 'DownloadSimple'
  | 'FigmaLogo'
  | 'FileText'
  | 'InstagramLogo'
  | 'LinkedinLogo'
  | 'X'
  | 'XLogo'
  | 'YoutubeLogo';

const iconMap: Record<ButtonIconName, PhosphorIcon> = {
  ArrowDown,
  ArrowRight,
  ArrowSquareOut,
  BuildingOffice,
  Calendar,
  DownloadSimple,
  FigmaLogo,
  FileText,
  InstagramLogo,
  LinkedinLogo,
  X,
  XLogo,
  YoutubeLogo,
};

type ButtonProps = {
  className?: string;
  text?: string;
  iconName?: ButtonIconName;
  withIcon?: boolean;
  iconDirection?: 'left' | 'right';
  withText?: boolean;
  size?: 's' | 'm' | 'l';
  variant?: 'primary' | 'secondary' | 'tertiary' | 'success';
  weight?: IconWeight;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
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
  disabled = false,
}) => {
  const IconComponent = iconName ? iconMap[iconName] : null;

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
