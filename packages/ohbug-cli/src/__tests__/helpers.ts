import { mkdir, rm, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import type { IncomingMessage, Server, ServerResponse } from "node:http";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const uploadsDir = resolve(__dirname, "./uploads");
const port = 10086;
export const endpoint = `http://localhost:${port}/upload`;

let server: Server | null = null;
let uploadCounter = 0;

/**
 * Create a simple test HTTP server that accepts file uploads.
 * Each successful upload writes a marker file to the uploads directory.
 * 创建一个简单的测试 HTTP 服务器来接收文件上传。
 * 每次成功上传都会在 uploads 目录写入一个标记文件。
 */
export async function createTestServer(): Promise<void> {
  await mkdir(uploadsDir, { recursive: true });

  return new Promise((resolvePromise) => {
    server = createServer((req: IncomingMessage, res: ServerResponse) => {
      if (req.method === "POST" && req.url === "/upload") {
        const chunks: Buffer[] = [];
        req.on("data", (chunk: Buffer) => chunks.push(chunk));
        req.on("end", () => {
          uploadCounter++;
          const markerFile = join(uploadsDir, `upload-${String(uploadCounter)}`);
          // Wait for file write to complete before responding
          // 等待文件写入完成后再响应
          writeFile(markerFile, "uploaded").then(
            () => {
              res.writeHead(200);
              res.end("good");
            },
            () => {
              res.writeHead(500);
              res.end("write failed");
            },
          );
        });
      } else {
        res.writeHead(404);
        res.end("not found");
      }
    });

    server.listen(port, () => {
      resolvePromise();
    });
  });
}

/**
 * Close the test server.
 * 关闭测试服务器。
 */
export async function closeTestServer(): Promise<void> {
  return new Promise((resolvePromise) => {
    if (server) {
      server.close(() => {
        server = null;
        resolvePromise();
      });
    } else {
      resolvePromise();
    }
  });
}

/**
 * Clear all files in the uploads directory and reset counter.
 * 清除 uploads 目录中的所有文件并重置计数器。
 */
export async function clearUploads(): Promise<void> {
  uploadCounter = 0;
  await rm(uploadsDir, { recursive: true, force: true });
  await mkdir(uploadsDir, { recursive: true });
}
