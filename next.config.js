/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "rc-util",
    "@ant-design",
    "antd",
    "rc-pagination",
    "rc-picker",
  ],
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
