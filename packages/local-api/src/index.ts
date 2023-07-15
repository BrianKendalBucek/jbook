import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

export const serve = (port: number, filename: string, dir: string) => {
  const app = express();

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

  return new Promise<void>((resolve, reject) => {
    app.listen(port, "0.0.0.0", resolve).on("error", reject);
  });
};
