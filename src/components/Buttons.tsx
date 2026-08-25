import React from 'react';
import * as stylex from '@stylexjs/stylex';
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
  Sparkle,
  X,
  XLogo,
  YoutubeLogo,
  Sun,
  Moon,
} from '@phosphor-icons/react';
import { vars } from '../styles/stylex/theme.stylex';

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
  | 'Sparkle'
  | 'X'
  | 'XLogo'
  | 'YoutubeLogo'
  | 'Sun'
  | 'Moon';

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
  Sparkle,
  X,
  XLogo,
  YoutubeLogo,
  Sun,
  Moon,
};

const styles = stylex.create({
  base: {
    width: 'auto',
    height: 'fit-content',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'none',
    fontWeight: 600,
    letterSpacing: '-0.01em',
    cursor: 'pointer',
    gap: '.5em',
    whiteSpace: 'nowrap',
    transitionProperty: 'all',
    transitionDuration: '0.2s',
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    ':hover': {
      transform: 'translateY(-1px)',
    },
  },
  directionLeft: {
    flexDirection: 'row',
  },
  directionRight: {
    flexDirection: 'row-reverse',
  },
  sizeS: {
    padding: '0.5em 0.9em',
    gap: '0.25em',
    borderRadius: vars.radiusPill,
  },
  sizeM: {
    padding: '0.65em 1.25em',
    borderRadius: vars.radiusPill,
  },
  sizeL: {
    padding: '0.8em 1.5em',
    borderRadius: vars.radiusPill,
  },
  primary: {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'transparent',
    backgroundColor: vars.buttonColor,
    color: 'white',
    ':hover': {
      backgroundColor: vars.buttonColorHover,
      opacity: 1,
    },
  },
  secondary: {
    backgroundColor: vars.bgColorHigh,
    color: vars.primaryText,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: vars.borderColor,
    ':hover': {
      backgroundColor: `color-mix(in srgb, ${vars.primaryText} 5%, transparent)`,
      borderColor: vars.tertiaryText,
      opacity: 1,
    },
  },
  tertiary: {
    backgroundColor: 'transparent',
    color: vars.highlightColor,
    padding: '0.5em',
    borderRadius: vars.radiusPill,
    ':hover': {
      backgroundColor: `color-mix(in srgb, ${vars.highlightColor} 10%, transparent)`,
      opacity: 1,
    },
  },
  ai: {
    borderRadius: vars.radiusPill,
    borderStyle: 'none',
    color: 'white',
    backgroundImage: 'linear-gradient(115deg, #4f46e5 0%, #9333ea 45%, #ec4899 100%)',
    backgroundSize: '160% 160%',
    backgroundPosition: '0% 50%',
    boxShadow: '0 4px 20px rgba(147, 51, 234, 0.35)',
    transitionProperty: 'background-position, box-shadow, transform',
    transitionDuration: '0.4s, 0.3s, 0.2s',
    transitionTimingFunction: 'ease, ease, ease-in-out',
    ':hover': {
      backgroundPosition: '100% 50%',
      boxShadow: '0 6px 26px rgba(147, 51, 234, 0.45)',
    },
  },
});

const sizeStyles = {
  s: styles.sizeS,
  m: styles.sizeM,
  l: styles.sizeL,
};

const directionStyles = {
  left: styles.directionLeft,
  right: styles.directionRight,
};

const variantStyles = {
  primary: styles.primary,
  secondary: styles.secondary,
  tertiary: styles.tertiary,
  success: undefined,
  ai: styles.ai,
};

type ButtonProps = {
  className?: string;
  text?: string;
  iconName?: ButtonIconName;
  withIcon?: boolean;
  iconDirection?: 'left' | 'right';
  withText?: boolean;
  size?: 's' | 'm' | 'l';
  variant?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'ai';
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

  const stylexProps = stylex.props(
    styles.base,
    sizeStyles[size],
    directionStyles[iconDirection],
    variantStyles[variant],
  );

  const legacyClassNames = [
    'custom-button',
    `custom-button-${size}`,
    `custom-button-${variant}`,
    `custom-button-${iconDirection}`,
  ].join(' ');

  return (
    <button
      className={[className, legacyClassNames, stylexProps.className].filter(Boolean).join(' ')}
      onClick={onClick}
      style={{ ...stylexProps.style, fontSize }}
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
