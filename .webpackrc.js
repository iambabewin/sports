const path = require('path');

export default {
  extraBabelPlugins: [
    ["import", { libraryName: "antd", libraryDirectory: "es", style: "css" }]
  ],
  alias: {
    Components: path.resolve(__dirname, 'src/components/'),
    Utils: path.resolve(__dirname, 'src/utils/'),
  },
  "proxy": {
    "/api": {
      "target": "http://sports.handley.cn",
      "changeOrigin": true
    }
  },
  copy: [
    {
      from: "src/utils/particles.min.js",
      to: "src/utils/"
    }
  ],
  env: {
    development: {
      extraBabelPlugins: ["dva-hmr"]
    }
  },
  theme: {
    "primary-color": "#2FAEA8"
  }

}
