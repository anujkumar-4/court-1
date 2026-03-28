import Case from "../models/Case.js";
import {
  buildCaseSummary,
  computePriorityScore,
  suggestHearingWindow
} from "../services/prioritizationService.js";

export const getCases = async (_req, res, next) => {
  try {
    const cases = await Case.find().sort({ priorityScore: -1, createdAt: -1 });
    res.json(cases);
  } catch (error) {
    next(error);
  }
};

export const createCase = async (req, res, next) => {
  try {
    const payload = req.body;
    const priorityScore = computePriorityScore(payload);
    const summary = buildCaseSummary(payload);

    const courtCase = await Case.create({
      ...payload,
      priorityScore,
      summary
    });

    res.status(201).json(courtCase);
  } catch (error) {
    next(error);
  }
};

export const updateCaseStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const courtCase = await Case.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!courtCase) {
      return res.status(404).json({ message: "Case not found" });
    }

    return res.json(courtCase);
  } catch (error) {
    return next(error);
  }
};

export const getInsights = async (_req, res, next) => {
  try {
    const cases = await Case.find();

    const total = cases.length;
    const pending = cases.filter((courtCase) => courtCase.status === "Pending").length;
    const avgPriority =
      total === 0
        ? 0
        : Number(
            (
              cases.reduce((sum, courtCase) => sum + courtCase.priorityScore, 0) /
              total
            ).toFixed(2)
          );

    const topCase = [...cases].sort((a, b) => b.priorityScore - a.priorityScore)[0] || null;

    res.json({
      total,
      pending,
      avgPriority,
      suggestedWindow: topCase ? suggestHearingWindow(topCase.priorityScore) : "N/A",
      topCase
    });
  } catch (error) {
    next(error);
  }
};
