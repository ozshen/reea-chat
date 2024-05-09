import nextPWA from '@ducanh2912/next-pwa';
import analyzer from '@next/bundle-analyzer';

const isProd = process.env.NODE_ENV === 'production';
const output = process.env.BUILD_MODE || undefined;
const basePath = process.env.NEXT_PUBLIC_BASE_PATH;

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath,
  compress: isProd,
  experimental: {
    optimizePackageImports: [
      'emoji-mart',
      '@emoji-mart/react',
      '@emoji-mart/data',
      '@icons-pack/react-simple-icons',
      '@lobehub/ui',
      'gpt-tokenizer',
      'chroma-js',
      'shiki',
    ],
    webVitalsAttribution: ['CLS', 'LCP'],
  },

  output: output,

  reactStrictMode: true,

  webpack(config) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };

    config.module.rules.push({
      resolve: {
        fullySpecified: false,
      },
      test: /\.m?js$/,
      type: 'javascript/auto',
    });

    return config;
  },
};

const noWrapper = (config) => config;

const withBundleAnalyzer = process.env.ANALYZE === 'true' ? analyzer() : noWrapper;

const withPWA = isProd
  ? nextPWA({
      dest: 'public',
      register: true,
      workboxOptions: {
        skipWaiting: true,
      },
    })
  : noWrapper;

export default withBundleAnalyzer(withPWA(nextConfig));
