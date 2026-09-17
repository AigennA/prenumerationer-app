import { useState } from 'react';
import PrenumerationItem from './PrenumerationItem';

const VISIBLE_LIMIT = 6;

function PrenumerationList({ items, onToggle, onDelete, onEdit, onLogoUpload, onDocumentUpload }) {
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);

  const filtered = items.filter(item =>
    item.serviceName.toLowerCase().includes(search.toLowerCase())
  );

  const visible = showAll ? filtered : filtered.slice(0, VISIBLE_LIMIT);
  const hidden = filtered.length - visible.length;

  function handleSearch(e) {
    setSearch(e.target.value);
    setShowAll(false);
  }

  return (
    <div>
      <input
        className="search-input"
        placeholder="Sök prenumeration..."
        value={search}
        onChange={handleSearch}
      />
      {filtered.length === 0 && (
        <p className="message empty">
          {items.length === 0
            ? "Inga prenumerationer ännu. Lägg till din första i formuläret ovan."
            : "Inga prenumerationer matchar sökningen."}
        </p>
      )}
      <div className="list">
        {visible.map(item => (
          <PrenumerationItem
            key={item.id}
            data={item}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
            onLogoUpload={onLogoUpload}
            onDocumentUpload={onDocumentUpload}
          />
        ))}
      </div>
      {filtered.length > VISIBLE_LIMIT && (
        <button className="btn-show-more" onClick={() => setShowAll(!showAll)}>
          {showAll ? "Visa färre" : `Visa fler (${hidden})`}
        </button>
      )}
    </div>
  );
}

export default PrenumerationList;
