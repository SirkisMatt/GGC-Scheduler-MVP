/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
    // Ensure this matches your project structure
    appDirectory: "app",
    assetsBuildDirectory: "public/build",
    serverBuildPath: "build/index.js",
    publicPath: "/build/",
    tailwind: true,
    postcss: true,
    // Add any other necessary configuration options
  };