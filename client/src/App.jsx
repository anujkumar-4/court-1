import { useEffect, useMemo, useState } from "react";
import CaseForm from "./components/CaseForm";
import CaseTable from "./components/CaseTable";
import InsightCard from "./components/InsightCard";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function App() {
  const [cases, setCases] = useState([]);
  const [insights, setInsights] = useState({ total: 0, pending: 0, avgPriority: 0, suggestedWindow: "N/A" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCases = async () => {
    const response = await fetch(`${API_URL}/cases`);
    if (!response.ok) throw new Error("Unable to fetch case list");
    setCases(await response.json());
  };

  const fetchInsights = async () => {
    const response = await fetch(`${API_URL}/cases/insights/summary`);
    if (!response.ok) throw new Error("Unable to fetch insights");
    setInsights(await response.json());
  };

  const bootstrap = async () => {
    setError("");
    try {
      await Promise.all([fetchCases(), fetchInsights()]);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    bootstrap();
  }, []);

  const createCase = async (payload) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_URL}/cases`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Failed to create case");
      }

      await bootstrap();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    setError("");
    try {
      const response = await fetch(`${API_URL}/cases/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });

      if (!response.ok) throw new Error("Failed to update status");
      await bootstrap();
    } catch (err) {
      setError(err.message);
    }
  };

  const topCase = useMemo(() => cases[0], [cases]);

  return (
    <main className="layout">
      <header className="hero">
        <p className="hero-id">04</p>
        <div>
          <h1>Judiciary Case Backlog Reduction</h1>
          <p className="hero-copy">
            AI-assisted prioritization, automated summaries, and scheduling recommendations for faster justice
            delivery.
          </p>
        </div>
      </header>

      {error ? <p className="error">{error}</p> : null}

      <section className="insight-grid">
        <InsightCard label="Total Cases" value={insights.total} />
        <InsightCard label="Pending Cases" value={insights.pending} />
        <InsightCard label="Average Priority" value={insights.avgPriority} />
        <InsightCard label="Top Case Schedule" value={insights.suggestedWindow} helper={topCase?.title} />
      </section>

      <CaseForm onCreate={createCase} loading={loading} />
      <CaseTable cases={cases} onStatusChange={updateStatus} />
    </main>
  );
}
