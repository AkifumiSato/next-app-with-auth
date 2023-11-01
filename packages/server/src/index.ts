import express, { Express } from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//一覧取得
app.get("/health_check", (req: express.Request, res: express.Response) => {
  res.send(
    JSON.stringify({
      status: "OK",
    }),
  );
});

export function getServer(): Express {
  return app;
}
