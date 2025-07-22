import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import withBundleAnalyzer from '@next/bundle-analyzer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const nextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  // eslint: {
    // ignoreDuringBuilds: true,
  // },

  reactStrictMode: true,
};

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default bundleAnalyzer(nextConfig);
