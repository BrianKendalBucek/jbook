import express from "express";
import fs from "fs/promises";
import path from "path";
 
interface Cell {
  id: string;
  content: string;
  type: "text" | "code";
}
 
interface LocalApiError {
  code: string;
}
 
export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();
 
  const fullPath = path.join(dir, filename);
 
  router.get("/cells", async (req, res) => {
    const isLocalApiError = (err: any): err is LocalApiError => {
      return typeof err.code === "string";
    };
    try {
      const result = await fs.readFile(fullPath, { encoding: "utf8" });
 
      res.send(JSON.parse(result));
    } catch (err) {
      if (isLocalApiError(err)) {
        if (err.code === "ENOENT") {
          // Create new file with default cells
          await fs.writeFile(fullPath, "[]", "utf8");
          res.send([]);
        } else {
          throw err;
        }
      }
    }
  });
 
  router.post("/cells", async (req, res) => {

    const { cells }: { cells: Cell[] } = req.body;

    await fs.writeFile(fullPath, JSON.stringify(cells), "utf8");
 
    res.send({ status: "ok" });
  });
  return router;
};