import { useEffect, useState } from 'react';
import PrenumerationList from './components/PrenumerationList';
import PrenumerationForm from './components/PrenumerationForm';
import { createPrenumeration, getPrenumerationer, updatePrenumeration } from './services/prenumerationApi';
import './App.css';

function App() {
  const [prenumerationer, setPrenumerationer] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getPrenumerationer()
      .then(data => setPrenumerationer(data))
      .catch(() => setError("Kunde inte hämta prenumerationer. Kontrollera att API:et är igång."))
      .finally(() => setIsLoading(false));
  }, []);

  async function handleAdd(newItem) {
    setError("");
    try {
      const created = await createPrenumeration(newItem);
      setPrenumerationer([...prenumerationer, created]);
    } catch {
      setError("Kunde inte lägga till prenumerationen.");
    }
  }

  async function updateItem(id, changes) {
    const current = prenumerationer.find(p => p.id === id);
    const updated = { ...current, ...changes };
    setError("");
    try {
      await updatePrenumeration(updated);
      setPrenumerationer(prenumerationer.map(p => (p.id === id ? updated : p)));
    } catch {
      setError("Kunde inte uppdatera prenumerationen.");
    }
  }

  function handleToggle(id) {
    const current = prenumerationer.find(p => p.id === id);
    updateItem(id, { isActive: !current.isActive });
  }

  function handleDelete(id) {
    setPrenumerationer(prenumerationer.filter(p => p.id !== id));
  }

  function handleEdit(id, updatedFields) {
    updateItem(id, updatedFields);
  }

  return (
    <div className="app">
      <h1>Mina prenumerationer</h1>
      <PrenumerationForm onAdd={handleAdd} />
      {error && <p className="message error">{error}</p>}
      {isLoading ? (
        <p className="message">Laddar...</p>
      ) : (
        <PrenumerationList
          items={prenumerationer}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
}

export default App;