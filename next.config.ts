import { NextConfig } from "next";

/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find(
      (rule: { test: { test: (arg0: string) => any } }) =>
        rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      {
        loader: "@svgr/webpack",
        options: {
          prettier: false,
          svgo: true,
          svgoConfig: {
            plugins: [
              {
                name: "preset-default",
                params: {
                  overrides: { removeViewBox: false },
                },
              },
            ],
          },
          titleProp: true,
        },
        test: /\.svg$/,
      },
      {
        test: /\.pdf$/,
        type: "asset/resource",
        generator: {
          filename: "static/media/[name][ext]",
        },
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;
    config.resolve.alias.canvas = false;

    return {
      ...config,
      externals: [
        ...config.externals,
        // {
        //   sharp: 'commonjs sharp'
        // }
      ],
    };

    // config.module.rules.push(
    //   {
    //     test: /\.svg$/,
    //     use: [{ loader: "@svgr/webpack", options: { icon: true } }],
    //   },

    // );
    // return config;
  },

  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  output: "export",
  images: { unoptimized: true },
};

module.exports = nextConfig;
