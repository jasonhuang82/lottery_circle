const path = require('path');
const config = {
  // distDir: "../../dist",
  devIndicators: {
    autoPrerender: true, // 不顯示prender指標
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Important: return the modified config

    config.resolve = {
      modules: [__dirname, "node_modules"],
      alias: {
        ...config.resolve.alias,
        "components": path.resolve(__dirname, 'src/client/components'),
      },
    };

    return config;
  },
};


module.exports = config;
