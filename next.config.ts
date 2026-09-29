import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/resume/:path*",
        headers: [
          {
            key: "Content-Disposition",
            value: 'attachment; filename="Manthan_Mehta_Resume.pdf"',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
