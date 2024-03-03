const path = require("path");

module.exports = (env, argv) => ({
  entry: "./src/index.ts",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, argv.mode === "production" ? "dist" : ".dev"),
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      }
    ],
  },
  devServer: {
    allowedHosts: 'all',
    server: 'https',
    client: {
      webSocketURL: 'wss://localhost:8080/ws',
      progress: true,
      reconnect: true,
      overlay: false,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    }
  },
});
