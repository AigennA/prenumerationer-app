import { useState } from 'react';
import PrenumerationList from './components/PrenumerationList';
import PrenumerationForm from './components/PrenumerationForm';
import './App.css';

const initialData = [
  { id: 1, serviceName: "Netflix", note: "Månadsplan", startDate: "2025-01-01", endDate: "", isActive: true },
  { id: 2, serviceName: "Spotify", note: "Årsplan", startDate: "2024-06-01", endDate: "2025-06-01", isActive: false },
];

function App() {
  const [prenumerationer, setPrenumerationer] = useState(initialData);

  function handleAdd(newItem) {
    const id = prenumerationer.length === 0 ? 1 : Math.max(...prenumerationer.map(p => p.id)) + 1;
    setPrenumerationer([...prenumerationer, { ...newItem, id }]);
  }

  function handleToggle(id) {
    setPrenumerationer(prenumerationer.map(p =>
      p.id === id ? { ...p, isActive: !p.isActive } : p
    ));
  }

  function handleDelete(id) {
    setPrenumerationer(prenumerationer.filter(p => p.id !== id));
  }

  function handleEdit(id, updatedFields) {
    setPrenumerationer(prenumerationer.map(p =>
      p.id === id ? { ...p, ...updatedFields } : p
    ));
  }

  return (
    <div className="app">
      <h1>Mina prenumerationer</h1>
      <PrenumerationForm onAdd={handleAdd} />
      <PrenumerationList
        items={prenumerationer}
        onToggle={handleToggle}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default App;