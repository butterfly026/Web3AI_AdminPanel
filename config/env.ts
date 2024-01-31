// https://umijs.org/config/
import { defineConfig } from "umi";

const env = process.env.REACT_APP_ENV || "dev";
if (!env) throw "REACT_APP_ENV need to set!!!";

const config = {
  // 开发环境
  dev: defineConfig({
    define: {
      "process.env.BASE_URL": "/api/admin/",
      "process.env.TOKEN_NAME": "ADMIN_TOKEN_DEV",
    },
    proxy: {
      "/api/": {
        // target: "http://0.0.0.0:8000",
        target: "https://www.aid.com.co",
        changeOrigin: true,
        pathRewrite: { "^": "" },
      },
    },
  }),
  // 生产环境
  main: defineConfig({
    define: {
      "process.env.BASE_URL": "/api/admin/",
      "process.env.TOKEN_NAME": "ADMIN_TOKEN",
    },
  }),
} as Record<string, any>;

export default config[env];
