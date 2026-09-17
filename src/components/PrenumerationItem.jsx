import { useState } from 'react';
import { getFileUrl } from '../services/prenumerationApi';

function PrenumerationItem({ data, onToggle, onDelete, onEdit, onLogoUpload, onDocumentUpload }) {
  const [isEditing, setIsEditing] = useState(false);
  const [serviceName, setServiceName] = useState(data.serviceName);
  const [note, setNote] = useState(data.note || "");
  const [startDate, setStartDate] = useState(data.startDate || "");
  const [endDate, setEndDate] = useState(data.endDate || "");

  function handleSave() {
    onEdit(data.id, { serviceName, note, startDate, endDate });
    setIsEditing(false);
  }

  function handleCancel() {
    setServiceName(data.serviceName);
    setNote(data.note || "");
    setStartDate(data.startDate || "");
    setEndDate(data.endDate || "");
    setIsEditing(false);
  }

  function handleFileChange(e, onUpload) {
    const file = e.target.files[0];
    e.target.value = "";
    if (file) onUpload(data.id, file);
  }

  if (isEditing) {
    return (
      <div className="item editing">
        <input value={serviceName} onChange={(e) => setServiceName(e.target.value)} />
        <input value={note} onChange={(e) => setNote(e.target.value)} />
        <label className="date-label">
          Startdatum
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </label>
        <label className="date-label">
          Slutdatum
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </label>
        <div className="item-actions">
          <button className="btn-save" onClick={handleSave}>Spara</button>
          <button className="btn-cancel" onClick={handleCancel}>Avbryt</button>
        </div>
      </div>
    );
  }

  return (
    <div className="item">
      <div className="item-header">
        {data.logoUrl ? (
          <img className="item-logo" src={getFileUrl(data.logoUrl)} alt={`Logga för ${data.serviceName}`} />
        ) : (
          <div className="item-logo item-logo-placeholder">
            {data.serviceName.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <h3>{data.serviceName}</h3>
          <p>{data.note}</p>
          {(data.startDate || data.endDate) && (
            <p className="date-range">
              {data.startDate || "?"} → {data.endDate || "pågående"}
            </p>
          )}
        </div>
      </div>
      <div className="item-actions">
        <span
          className={`status ${data.isActive ? "active" : "inactive"}`}
          onClick={() => onToggle(data.id)}
        >
          {data.isActive ? "Aktiv" : "Avslutad"}
        </span>
        <button className="btn-edit" onClick={() => setIsEditing(true)}>Redigera</button>
        <button className="btn-delete" onClick={() => onDelete(data.id)}>Ta bort</button>
      </div>
      <div className="item-actions">
        <label className="btn-upload">
          {data.logoUrl ? "Byt logga" : "Ladda upp logga"}
          <input type="file" accept=".jpg,.jpeg,.png,.webp,.gif" hidden onChange={(e) => handleFileChange(e, onLogoUpload)} />
        </label>
        <label className="btn-upload">
          {data.documentUrl ? "Byt fil" : "Ladda upp fil"}
          <input type="file" accept=".pdf,.jpg,.jpeg,.png,.webp" hidden onChange={(e) => handleFileChange(e, onDocumentUpload)} />
        </label>
        {data.documentUrl && (
          <a className="item-document" href={getFileUrl(data.documentUrl)} target="_blank" rel="noreferrer">
            📄 {data.documentName}
          </a>
        )}
      </div>
    </div>
  );
}

export default PrenumerationItem;