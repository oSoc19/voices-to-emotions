const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  target: 'serverless',
  cssModules: true,
  webpack(config, options) {
    config.resolve.extensions.push('.ts', '.tsx');
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [require.resolve('@babel/preset-typescript'), require.resolve('next/babel')]
          }
        }
      ]
    });

    return config;
  }
});
