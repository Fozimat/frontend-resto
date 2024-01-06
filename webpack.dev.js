const path = require("path");
const { merge } = require("webpack-merge");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: path.resolve(__dirname, "dist"),
    open: true,
    port: 9000,
    compress: true,
    client: {
      overlay: {
        errors: true,
        warnings: true,
      },
    },
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerPort: 4000,
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 20000,
      maxSize: 70000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: "~",
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
});
