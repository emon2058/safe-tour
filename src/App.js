import './App.css';
import Home from './Pages/Home/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import Navigation from './Pages/Shared/Navigation/Navigation';
import AllProducts from './Pages/AllProducts/AllProducts/AllProducts';
function App() {
  return (
    <div className="App">
      <Router>
        <Navigation/>
        <Switch>
          <Route exact path='/'>
            <Home/>
          </Route>
          <Route path='/home'>
            <Home/>
          </Route>
          <Route path='/allProducts'>
            <AllProducts/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
