import './App.css';
import Home from './Pages/Home/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import Navigation from './Pages/Shared/Navigation/Navigation';
import AllProducts from './Pages/AllProducts/AllProducts/AllProducts';
import Login from './Pages/Login/Login/Login';
import AuthProvider from './contexts/AuthProvider/AuthProvider';
import Register from './Pages/Login/Register/Register';
import OrderNow from './Pages/OrderNow/OrderNow';
import Dashboard from './Pages/Dashboard/Dashboard/Dashboard';
import PrivateRoute from './Pages/Login/PrivateRoute/PrivateRoute';
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path='/'>
              <Navigation/>
              <Home/>
            </Route>
            <Route path='/home'>
              <Navigation/>
              <Home/>
            </Route>
            <Route path='/allProducts'>
              <Navigation/>
              <AllProducts/>
            </Route>
            <PrivateRoute path='/product/:id'>
              <Navigation/>
              <OrderNow/>
            </PrivateRoute>
            <Route path='/login'>
              <Navigation/>
              <Login/>
            </Route>
            <Route path='/register'>
              <Navigation/>
              <Register/>
            </Route>
            <PrivateRoute path='/dashboard'>
              <Dashboard/>
            </PrivateRoute>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
