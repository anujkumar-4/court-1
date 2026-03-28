const normalize = (value, max) => Math.min(value / max, 1);

export const computePriorityScore = ({ severity, pendingDays, peopleAffected }) => {
  const severityWeight = 0.45;
  const pendingWeight = 0.3;
  const impactWeight = 0.25;

  const score =
    normalize(severity, 10) * severityWeight +
    normalize(pendingDays, 365) * pendingWeight +
    normalize(peopleAffected, 5000) * impactWeight;

  return Number((score * 100).toFixed(2));
};

export const buildCaseSummary = ({ title, description, pendingDays, severity, peopleAffected }) => {
  return `${title}: ${description.slice(0, 140)}${
    description.length > 140 ? "..." : ""
  } | Pending ${pendingDays} days | Severity ${severity}/10 | Affects ~${peopleAffected} citizens.`;
};

export const suggestHearingWindow = (priorityScore) => {
  if (priorityScore >= 80) return "Schedule within 7 days";
  if (priorityScore >= 60) return "Schedule within 21 days";
  if (priorityScore >= 40) return "Schedule within 45 days";
  return "Schedule within 90 days";
};
