import React from 'react';
import { Switch, Route, BrowserRouter} from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './views/Home';
import Tutorial from './views/Tutorial';
import Login from './views/Login';
import Register from './views/Register';


const Routes = () => {
  return (
    <>
    <Header/>
    <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/cadastro" component={Register} />
      <Route exact path="/tutorial" component={Tutorial} />
    </Switch>
    </BrowserRouter>
    <Footer/>
    </>
  );
}

export default Routes;