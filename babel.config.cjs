module.exports = {
  presets: [
    ['@babel/preset-react', { runtime: 'automatic' }],
    ['@babel/preset-typescript', { isTSX: true, allExtensions: true }],
  ],
  plugins: [
    [
      '@stylexjs/babel-plugin',
      {
        runtimeInjection: false,
        dev: process.env.NODE_ENV !== 'production',
        test: false,
        unstable_moduleResolution: {
          type: 'commonJS',
          rootDir: __dirname,
        },
      },
    ],
  ],
};
