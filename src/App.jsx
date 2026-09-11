import PrenumerationList from './components/PrenumerationList';
import PrenumerationForm from './components/PrenumerationForm';
import './App.css';

function App() {
  return (
    <div className="app">
      <h1>Mina prenumerationer</h1>
      <PrenumerationForm />
      <PrenumerationList />
    </div>
  );
}

export default App;