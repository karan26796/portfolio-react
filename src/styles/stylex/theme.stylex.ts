import * as stylex from '@stylexjs/stylex';

// Mirrors src/styles/themes.scss (light values = defaults) and the radius
// tokens from src/styles/sizes.scss that migrated components rely on.
export const vars = stylex.defineVars({
  bgColor: '#ffffff',
  bgColorHigh: '#f6f8fa',
  cardBg: '#ffffff',
  cardBgHover: '#f3f5f8',
  borderColor: '#e1e4e8',
  projectCardBorder: '#e1e4e8',

  primaryText: '#0d1117',
  secondaryText: '#57606a',
  tertiaryText: '#6e7781',

  highlightColor: '#1d9bf0',
  highlightColorLight: '#1a8cd8',
  highlightColorHigh: '#1a8cd8',

  buttonColor: '#1d9bf0',
  buttonColorHover: '#1a8cd8',

  tagBg: 'rgba(0, 0, 0, 0.04)',
  tagBorder: 'rgba(0, 0, 0, 0.08)',

  logoFilter: 'invert(0.6)',

  radiusPill: '999px',
  radiusCard: '16px',
  radiusSm: '8px',
});

export const darkTheme = stylex.createTheme(vars, {
  bgColor: '#111112',
  bgColorHigh: '#19191b',
  cardBg: '#111722',
  cardBgHover: '#17202e',
  borderColor: 'rgba(255, 255, 255, 0.1)',
  projectCardBorder: 'rgba(255, 255, 255, 0.1)',

  primaryText: '#f0f6fc',
  secondaryText: '#8b949e',
  tertiaryText: '#6e7681',

  highlightColor: '#1d9bf0',
  highlightColorLight: '#1a8cd8',
  highlightColorHigh: '#ffffff',

  buttonColor: '#1d9bf0',
  buttonColorHover: '#1a8cd8',

  tagBg: 'rgba(255, 255, 255, 0.06)',
  tagBorder: 'rgba(255, 255, 255, 0.12)',

  logoFilter: 'invert(1)',
});
