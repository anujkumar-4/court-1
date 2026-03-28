import { useState } from "react";

const initialState = {
  caseNumber: "",
  title: "",
  description: "",
  severity: 5,
  pendingDays: 30,
  peopleAffected: 50
};

export default function CaseForm({ onCreate, loading }) {
  const [form, setForm] = useState(initialState);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: ["severity", "pendingDays", "peopleAffected"].includes(name)
        ? Number(value)
        : value
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    onCreate(form);
    setForm(initialState);
  };

  return (
    <form className="case-form" onSubmit={onSubmit}>
      <h2>Add New Case</h2>
      <div className="form-grid">
        <label>
          Case Number
          <input name="caseNumber" value={form.caseNumber} onChange={onChange} required />
        </label>
        <label>
          Case Title
          <input name="title" value={form.title} onChange={onChange} required />
        </label>
        <label className="full-width">
          Description
          <textarea name="description" rows="3" value={form.description} onChange={onChange} required />
        </label>
        <label>
          Severity (1-10)
          <input type="number" min="1" max="10" name="severity" value={form.severity} onChange={onChange} required />
        </label>
        <label>
          Pending Days
          <input type="number" min="0" name="pendingDays" value={form.pendingDays} onChange={onChange} required />
        </label>
        <label>
          People Affected
          <input
            type="number"
            min="1"
            name="peopleAffected"
            value={form.peopleAffected}
            onChange={onChange}
            required
          />
        </label>
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Create Case"}
      </button>
    </form>
  );
}
