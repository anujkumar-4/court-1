export default function InsightCard({ label, value, helper }) {
  return (
    <article className="insight-card">
      <p className="insight-label">{label}</p>
      <p className="insight-value">{value}</p>
      {helper ? <p className="insight-helper">{helper}</p> : null}
    </article>
  );
}
