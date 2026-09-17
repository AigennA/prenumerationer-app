import { useEffect, useState } from 'react';
import PrenumerationList from './components/PrenumerationList';
import PrenumerationForm from './components/PrenumerationForm';
import {
  createPrenumeration,
  deletePrenumeration,
  getPrenumerationer,
  MAX_FILE_SIZE_MB,
  updatePrenumeration,
  uploadDocument,
  uploadLogo,
} from './services/prenumerationApi';
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

  async function handleDelete(id) {
    if (!window.confirm("Vill du ta bort prenumerationen?")) return;
    setError("");
    try {
      await deletePrenumeration(id);
      setPrenumerationer(prenumerationer.filter(p => p.id !== id));
    } catch {
      setError("Kunde inte ta bort prenumerationen.");
    }
  }

  function handleEdit(id, updatedFields) {
    updateItem(id, updatedFields);
  }

  async function handleUpload(id, file, upload, errorMessage) {
    setError("");
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(`${errorMessage}: Filen får vara högst ${MAX_FILE_SIZE_MB} MB.`);
      return;
    }
    try {
      const updated = await upload(id, file);
      setPrenumerationer(prenumerationer.map(p => (p.id === id ? updated : p)));
    } catch (err) {
      setError(`${errorMessage}: ${err.message}`);
    }
  }

  function handleLogoUpload(id, file) {
    handleUpload(id, file, uploadLogo, "Kunde inte ladda upp loggan");
  }

  function handleDocumentUpload(id, file) {
    handleUpload(id, file, uploadDocument, "Kunde inte ladda upp filen");
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
          onLogoUpload={handleLogoUpload}
          onDocumentUpload={handleDocumentUpload}
        />
      )}
    </div>
  );
}

export default App;