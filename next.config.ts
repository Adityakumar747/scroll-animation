import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "export",
    basePath: "/REPOSITORY_NAME", // Replace with your repo name!
    images: {
        unoptimized: true,
    },
};

export default nextConfig;
