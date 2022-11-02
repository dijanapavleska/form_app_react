import logo from './logo.svg';
import './App.scss';
import Form from './Form';
import ActivityLog from './ActivityLog';

function App() {
  return (
    <div className="App">

      <h1>Healthlify.ly</h1>

      <div className="App__content">

        <Form />

        <ActivityLog />

      </div>

    </div>
  );
}

export default App;