import { Router } from "express";
import {
  createCase,
  getCases,
  getInsights,
  updateCaseStatus
} from "../controllers/caseController.js";

const router = Router();

router.get("/", getCases);
router.post("/", createCase);
router.patch("/:id/status", updateCaseStatus);
router.get("/insights/summary", getInsights);

export default router;
