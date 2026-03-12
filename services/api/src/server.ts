import cors from "cors";
import express from "express";
import { healthRouter } from "./routes/health";
import { signalsRouter } from "./routes/signals";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/health", healthRouter);
app.use("/signals", signalsRouter);

const port = Number(process.env.PORT ?? 4000);
app.listen(port, () => {
  console.log(`EtherOS API listening on port ${port}`);
});
