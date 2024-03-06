const path = require("path");

module.exports = (env, argv) => ({
  entry: `./packages/loader.${process.env.TARGET}.ts`,
  output: {
    filename: `bundle.${process.env.TARGET}.js`,
    path: path.join(__dirname, argv.mode === "production" ? "dist" : ".dev"),
  },
  resolve: {
    extensions: [".ts", ".js", ".jsx"],
    alias: {
      react: "preact/compat",
      "react-dom/test-utils": "preact/test-utils",
      "react-dom": "preact/compat",
      "react/jsx-runtime": "preact/jsx-runtime",
    },
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
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.jsx$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              plugins: [["@babel/plugin-transform-react-jsx", {pragma:'h'}]],
            },
          },
        ],
      },
    ],
  },
  devServer: {
    allowedHosts: "all",
    server: "https",
    client: {
      webSocketURL: "wss://localhost:8080/ws",
      progress: true,
      reconnect: true,
      overlay: false,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
      "X-Requested-With, content-type, Authorization",
    },
  },
});
