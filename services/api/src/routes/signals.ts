import { Router } from "express";
import { listSignals } from "../controllers/signals-controller";

export const signalsRouter = Router();

signalsRouter.get("/", listSignals);
