import { createMDX } from "fumadocs-mdx/next";
const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/nextcollectors",  destination: "/nextcollectors/features", permanent: false },
      { source: "/nextcoinflip",  destination: "/nextcoinflip/features-and-installation", permanent: false },
      // tinggal tambah lagi contoh seperti di atas bg
    ];
  },
};

export default withMDX(nextConfig);