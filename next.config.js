/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push(
      {
        test: /\.svg$/,
        use: [{ loader: "@svgr/webpack", options: { icon: true } }],
      },
      {
        test: /\.pdf$/,
        type: "asset/resource",
        generator: {
          filename: "static/media/[name][ext]",
        },
      }
    );
    config.resolve.alias.canvas = false;
    return config;
  },
};

module.exports = nextConfig;
