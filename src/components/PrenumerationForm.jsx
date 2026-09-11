import { useState } from 'react';

function PrenumerationForm() {
  const [serviceName, setServiceName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Ny prenumeration:", serviceName);
    setServiceName("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Tjänstens namn"
        value={serviceName}
        onChange={(e) => setServiceName(e.target.value)}
      />
      <button type="submit">Lägg till</button>
    </form>
  );
}

export default PrenumerationForm;