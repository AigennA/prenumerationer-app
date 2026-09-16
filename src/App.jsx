import { useEffect, useState } from 'react';
import PrenumerationList from './components/PrenumerationList';
import PrenumerationForm from './components/PrenumerationForm';
import { getPrenumerationer } from './services/prenumerationApi';
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