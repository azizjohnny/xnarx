const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = {
  ...nextConfig,
  env: {
    BASE_TOKEN: process.env.NEXT_PUBLIC_TOKEN,
  },
};
