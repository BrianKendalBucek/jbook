"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
const express_1 = __importDefault(require("express"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const serve = (port, filename, dir) => {
    const app = (0, express_1.default)();
    app.use((0, http_proxy_middleware_1.createProxyMiddleware)("/", {
        target: "http://127.0.0.1:3000/",
        ws: true,
        changeOrigin: true,
        logLevel: "silent",
        headers: {
            Connection: "keep-alive",
        },
    }));
    return new Promise((resolve, reject) => {
        app.listen(port, "0.0.0.0", resolve).on("error", reject);
    });
};
exports.serve = serve;
