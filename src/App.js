
import {Routes,Route,} from 'react-router-dom'
import './App.css';
import Home from './MyComponent/Home.jsx'
import Login from './MyComponent/Login.jsx';
import Table from './MyComponent/Table.jsx';

function App() {
  return (
    <div className="App">
    <Routes>
      <Route path='/' Component={Home}/>
      <Route path='/Login' Component={Login}/>
      <Route path='/Table' Component={Table}/>
    </Routes>
    </div>
  );
}

export default App;
