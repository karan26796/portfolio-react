import React, { useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { vars } from "../styles/stylex/theme.stylex";

const pulsate = stylex.keyframes({
  '0%': { transform: 'scale(1)', opacity: 1 },
  '50%': { transform: 'scale(1.4)', opacity: 0.5 },
  '100%': { transform: 'scale(1)', opacity: 1 },
});

const styles = stylex.create({
  tagParent: {
    display: 'inline-flex',
    height: 'fit-content',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '0.5em',
    padding: '0.35em 0.85em',
    borderRadius: vars.radiusPill,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: vars.tagBorder,
    transitionProperty: 'all',
    transitionDuration: '0.2s',
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    ':hover': {
      transform: 'translateY(-1px)',
    },
  },
  nobg: {
    backgroundColor: 'transparent',
    borderColor: vars.borderColor,
  },
  nobgText: {
    fontWeight: 600,
  },
  small: {
    gap: '0.35em',
    padding: '0.25em 0.65em',
  },
  smallDot: {
    width: '0.35em',
    height: '0.35em',
  },
  smallText: {
    fontSize: '0.85em',
  },
  dot: {
    width: '0.5em',
    height: '0.5em',
    borderRadius: '50%',
    backgroundColor: vars.highlightColor,
  },
  dotPulsating: {
    animationName: pulsate,
    animationDuration: '1.8s',
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite',
  },
  tagIcon: {
    height: '1.1em',
    width: 'auto',
    maxHeight: '18px',
    objectFit: 'contain',
    filter: vars.logoFilter,
    display: 'inline-block',
    verticalAlign: 'middle',
  },
  text: {
    fontSize: '0.9em',
    fontWeight: 500,
    letterSpacing: '-0.01em',
    color: vars.primaryText,
    margin: 0,
  },
});

export interface VibrantColor {
  bg?: string;
  text: string;
}

interface TagProps {
  text: string;
  color: VibrantColor;
  rotation?: number;
  dot?: boolean;
  pulsatingDot?: boolean;
  variant?: 'default' | 'nobg' | 'small';
  icon?: string | React.ReactNode;
}

const Tag: React.FC<TagProps> = ({
  text,
  color,
  rotation,
  dot,
  pulsatingDot = false,
  variant = 'default',
  icon
}) => {
  // Use state to ensure stable random value across re-renders
  const [randomRotation] = useState(() => Math.random() * 4 - 2);

  const finalRotation = rotation !== undefined ? rotation : randomRotation;
  const isNobg = variant === 'nobg';
  const isSmall = variant === 'small';

  const parentStylex = stylex.props(
    styles.tagParent,
    isNobg && styles.nobg,
    isSmall && styles.small,
  );
  const dotStylex = stylex.props(
    styles.dot,
    isSmall && styles.smallDot,
    pulsatingDot && styles.dotPulsating,
  );
  const iconStylex = stylex.props(styles.tagIcon);
  const textStylex = stylex.props(
    styles.text,
    isNobg && styles.nobgText,
    isSmall && styles.smallText,
  );

  return (
    <div
      className={`tag-parent ${variant} ${parentStylex.className}`}
      style={{
        backgroundColor: isNobg ? undefined : color.bg,
        transform: `rotate(${finalRotation}deg)`,
      }}
    >
      {dot && (
        <div
          className={`dot ${pulsatingDot ? 'pulsating' : ''} ${dotStylex.className}`}
          style={{ backgroundColor: color.text }}
        ></div>
      )}
      {icon && (
        typeof icon === 'string' ? (
          <img src={icon} alt="" className={`tag-icon ${iconStylex.className}`} />
        ) : (
          <span className={`tag-icon ${iconStylex.className}`}>{icon}</span>
        )
      )}
      <p
        className={`tag ${textStylex.className}`}
        style={{
          color: color.text,
        }}
      >
        {text}
      </p>
    </div>
  );
};

export default Tag;