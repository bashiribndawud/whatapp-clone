/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_ZEGO_APP_ID: 2057820533,
    NEXT_PUBLIC_ZEGO_SERVER_ID: '6523bd70be0241cbe39a7321b9ad7227',
  },
  images: {
    domains: ["localhost"],
  },
};

module.exports = nextConfig;
 