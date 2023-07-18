import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";

export const serve = (
  port: number,
  filename: string,
  dir: string,
  useProxy: boolean
) => {
  const app = express();

  if (useProxy) {
    app.use(
      createProxyMiddleware("/", {
        target: "http://127.0.0.1:3000/",
        ws: true,
        changeOrigin: true,
        logLevel: "silent",
        headers: {
          Connection: "keep-alive",
        },
      })
      );
    } else {
    const packagePath = require.resolve("local-client/build/index.html");
    app.use(express.static(path.dirname(packagePath)));
  }

  return new Promise<void>((resolve, reject) => {
    app.listen(port, "0.0.0.0", resolve).on("error", reject);
  });
};
