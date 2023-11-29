import { BrowserRouter as Routes, Route, BrowserRouter } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Form from './components/URLform'

function App() {
  return (
    <>
      <div className="App">
        <div className='auth-wrapper'>
          <div className='auth-inner'>
            <Form/>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
