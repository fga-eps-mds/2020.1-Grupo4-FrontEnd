import React, { lazy, Suspense } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import Home from '../views/Home';
// import Login from '../views/Login';
// import Register from '../views/Register';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Chat from '../components/Chat';
import PrivateRoute from './components/privateRoute';
import PublicRoute from './components/publicRoute';
import { Loading } from '../views/Loading';

const Tutorial = lazy(() => import('../views/Tutorial'));
const Exam = lazy(() => import('../views/Exam'));
const Login = lazy(() => import('../views/Login'));
const Register = lazy(() => import('../views/Register'));
const ForgotPassword = lazy(() => import('../views/ForgotPassword'));
const Change = lazy(() => import('../views/Change'));
const Profile = lazy(() => import('../views/Profile'));
const Dashboard = lazy(() => import('../views/Dashboard'));
const Welcome = lazy(() => import('../views/Welcome'));
const Mentorship = lazy(() => import('../views/Mentorship'));
const Certificate = lazy(() => import('../views/Certificate'));
const CourseCertificate = lazy(() => import('../views/CourseCertificates'));
const ChangeEmailConfirm = lazy(()=> import('../views/ChangeEmailConfirm'));
const RegisterConfirm = lazy(()=> import('../views/RegisterConfirm'));

const Routes = () => {
  const location = useLocation();
  if (location.pathname.includes('/certificado/')) {
    return (
      <Suspense fallback={<div />}>
        <Route exact path="/certificado/:_id">
          <Certificate />
        </Route>
      </Suspense>
    );
  }

  return (
    <>
      <Header />
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <PublicRoute exact path="/login">
            <Login />
          </PublicRoute>
          <PublicRoute exact path="/cadastro">
            <Register />
          </PublicRoute>
          <PrivateRoute exact path="/bem-vindo">
            <Welcome />
          </PrivateRoute>
          <PrivateRoute path="/tutorial">
            <Tutorial />
          </PrivateRoute>
          <PrivateRoute path="/avaliacao">
            <Exam />
          </PrivateRoute>
          <PrivateRoute exact path="/mentoria">
            <Mentorship />
          </PrivateRoute>
          <PublicRoute exact path="/forgotPassword">
            <ForgotPassword />
          </PublicRoute>
          <PublicRoute exact path="/change/:resetLink">
            <Change />
          </PublicRoute>
          <PrivateRoute exact path="/perfil">
            <Profile />
          </PrivateRoute>
          <PrivateRoute exact path="/dashboard">
            <Dashboard />
          </PrivateRoute>
          <PrivateRoute exact path="/certificados/">
            <CourseCertificate />
          </PrivateRoute>
          <PublicRoute exact path="/confirma-mudanca-email/:changeEmailLink">
            <ChangeEmailConfirm />
          </PublicRoute>
          <PublicRoute exact path="/confirma-cadastro">
            <RegisterConfirm />
          </PublicRoute>
        </Switch>
      </Suspense>
      <Chat />
      <Footer />
    </>
  );
};

export default Routes;
