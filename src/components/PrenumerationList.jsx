import { useState } from 'react';
import PrenumerationItem from './PrenumerationItem';

function PrenumerationList({ items, onToggle, onDelete, onEdit, onLogoUpload, onDocumentUpload }) {
  const [search, setSearch] = useState("");

  const filtered = items.filter(item =>
    item.serviceName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        className="search-input"
        placeholder="Sök prenumeration..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="list">
        {filtered.map(item => (
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
    </div>
  );
}

export default PrenumerationList;