/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/leads",
        destination: "/partners",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
