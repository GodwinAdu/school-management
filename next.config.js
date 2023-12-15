/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  experimental: {
    serverComponentsExternalPackages: ["mongoose", '@trpc/server'],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    // This is only intended to pass CI and should be skiped in your app
    if (config.name === 'server')
      config.optimization.concatenateModules = false;

    return config;
  },
}

module.exports = nextConfig
