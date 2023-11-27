import { BrowserRouter } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Form from './components/URLform'

function App() {
  return (
    <div className="App">
      <div className='auth-wrapper'>
        <div className='auth-inner'>
          <Switch>
            <Route exact path='/' component={Form} />
            <Route path='/App' component={Form} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
