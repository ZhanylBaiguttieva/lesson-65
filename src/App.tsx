import './App.css';
import {NavLink, Route, Routes} from 'react-router-dom';
import Pages from './containers/Pages/Pages';
import EditForm from './containers/EditForm/EditForm';

function App() {


  return (
    <div>
      <header>
        <NavLink to="/pages/home" >Home</NavLink>
        <span style={{margin: '0 10px'}}>|</span>
        <NavLink to="/pages/about" >About</NavLink>
        <span style={{margin: '0 10px'}}>|</span>
        <NavLink to="/pages/contacts" >Contacts</NavLink>
        <span style={{margin: '0 10px'}}>|</span>
        <NavLink to="/pages/quotes" >Quotes</NavLink>
        <span style={{margin: '0 10px'}}>|</span>
        <NavLink to="/pages/admin" >Admin</NavLink>
      </header>
      <div>
        <Routes>
          <Route path='/pages/:pageName' element={(<Pages />)}></Route>
          <Route path='/' element={(<Pages />)}></Route>
          <Route path='/pages/admin' element={(<EditForm />)}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
