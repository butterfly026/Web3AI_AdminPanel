import { defineConfig } from "umi";
import env from "./env";

export default defineConfig({
  ...env,
  ...{
    npmClient: "npm",
    hash: true,
    mfsu: false,
    history: { type: "hash" },
    plugins: [
      "@umijs/plugins/dist/antd",
      "@umijs/plugins/dist/request",
      "@umijs/plugins/dist/initial-state",
      "@umijs/plugins/dist/model",
      "@umijs/plugins/dist/valtio",
      "@umijs/plugins/dist/layout",
    ],
    antd: {},
    request: {},
    initialState: {},
    model: {},
    valtio: {},
    layout: {},
    favicons: ["./img/logo.ico"],
  },
});
