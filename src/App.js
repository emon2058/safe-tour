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
import Footer from './Pages/Shared/Footer/Footer';
import NotFound from './Pages/NotFound/NotFound';
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path='/'>
              <Navigation/>
              <Home/>
              <Footer/>
            </Route>
            <Route path='/home'>
              <Navigation/>
              <Home/>
              <Footer/>
            </Route>
            <Route path='/allProducts'>
              <Navigation/>
              <AllProducts/>
              <Footer/>
            </Route>
            <PrivateRoute path='/product/:id'>
              <Navigation/>
              <OrderNow/>
              <Footer/>
            </PrivateRoute>
            <Route path='/login'>
              <Navigation/>
              <Login/>
              <Footer/>
            </Route>
            <Route path='/register'>
              <Navigation/>
              <Register/>
              <Footer/>
            </Route>
            <PrivateRoute path='/dashboard'>
              <Dashboard/>
            </PrivateRoute>
            <Route path='*'>
              <NotFound/>
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
