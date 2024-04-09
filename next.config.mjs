import nextPWA from '@ducanh2912/next-pwa';
import analyzer from '@next/bundle-analyzer';

const isProd = process.env.NODE_ENV === 'production';
const output = process.env.BUILD_MODE || undefined;
const basePath = process.env.NEXT_PUBLIC_BASE_PATH;

// if you need to proxy the api endpoint to remote server
// const API_PROXY_ENDPOINT = process.env.API_PROXY_ENDPOINT || '';

const withBundleAnalyzer = analyzer({
  enabled: process.env.ANALYZE === 'true',
});

const withPWA = nextPWA({
  dest: 'public',
  register: true,
  workboxOptions: {
    skipWaiting: true,
  },
});

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
    ],
    webVitalsAttribution: ['CLS', 'LCP'],
  },

  output: output,

  reactStrictMode: true,

  // rewrites: async () => [
  //   // proxy to bypass the restriction
  //   { destination: `${API_PROXY_ENDPOINT}/api/chat/google`, source: '/api/chat/google' },
  // ],

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

    config.resolve.fallback = {
      child_process: false,
    };

    return config;
  },
};

export default isProd ? withBundleAnalyzer(withPWA(nextConfig)) : nextConfig;
