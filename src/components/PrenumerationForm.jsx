import { useState } from 'react';

function PrenumerationForm({ onAdd }) {
  const [serviceName, setServiceName] = useState("");
  const [note, setNote] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!serviceName.trim()) return;
    onAdd({ serviceName, note, startDate, endDate, isActive: true });
    setServiceName("");
    setNote("");
    setStartDate("");
    setEndDate("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <input
          type="text"
          placeholder="Tjänstens namn"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Anteckning (valfritt)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>
      <div className="form-row form-row-dates">
        <label className="date-label">
          Startdatum
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </label>
        <label className="date-label">
          Slutdatum
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </label>
        <button type="submit">Lägg till</button>
      </div>
    </form>
  );
}

export default PrenumerationForm;