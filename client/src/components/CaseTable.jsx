const statuses = ["Pending", "In Progress", "Closed"];

export default function CaseTable({ cases, onStatusChange }) {
  return (
    <section className="case-table-wrap">
      <h2>Prioritized Case Queue</h2>
      <table className="case-table">
        <thead>
          <tr>
            <th>Case #</th>
            <th>Title</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {cases.map((courtCase) => (
            <tr key={courtCase._id}>
              <td>{courtCase.caseNumber}</td>
              <td>{courtCase.title}</td>
              <td>{courtCase.priorityScore}</td>
              <td>
                <select
                  value={courtCase.status}
                  onChange={(event) => onStatusChange(courtCase._id, event.target.value)}
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
              <td>{courtCase.summary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
