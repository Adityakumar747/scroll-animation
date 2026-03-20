import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "export",
    basePath: "/scroll-animation-", // Set to your repository name
    trailingSlash: true,
    images: {
        unoptimized: true,
    },
};

export default nextConfig;
