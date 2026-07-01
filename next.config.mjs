/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };

// const nextConfig = {
//   output: 'export', // Outputs a static 'out' folder instead of starting a Node server
//   images: {
//     unoptimized: true, // Required because Next.js default Image Optimization requires a production server
//   },
//   // Only include basePath and assetPrefix if your repository is NOT a User/Organization page (i.e. username.github.io)
//   basePath: process.env.NODE_ENV === 'production' ? '/MathPractice' : '',
//   assetPrefix: process.env.NODE_ENV === 'production' ? '/MathPractice/' : '',
// };

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
