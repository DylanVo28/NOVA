import React, { Fragment, useContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { render } from "react-dom";
import { BrowserRouter, Navigate, Outlet, Route, Router, Routes, useNavigate, useRoutes } from 'react-router-dom';
import Register from './layout/Register';
import AlertTemplate from 'react-alert-template-basic';
import { positions } from 'react-alert';
import { transitions } from 'react-alert';
import Login from './layout/Login';
import Profile from './layout/Profile';
import { UserContext } from './contexts/UserContext';
import { RootContext } from './contexts/RootContext';
import { Provider } from 'react-redux'
// import store from './store';
import { applyMiddleware, compose } from 'redux';
import logger from './middleware/logger';
import thunkMiddleware from 'redux-thunk'
import monitorReducerEnhancer from './enhancers/monitorReducer';
import NavBar from './components/NavBar';
import ListAddress from './components/ListAddress';
import  Cookies  from 'js-cookie';
import Store from './layout/Store';
import Package from './layout/Package';
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}
const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={
      props => <Component {...rest} {...props} />
    } />
  )
}
function MultiRoute({ element: Element, path: paths, ...rest }) {
  return (
      <>
          {Array.isArray(paths) ? paths.map((path) =>
              <Route path={path} {...rest} element={props => <Element {...props} />} />
          ) :
              <Route path={paths} {...rest} element={props => <Element {...props} />} />
          }
      </>
  );
}
const middlewareEnhancer = applyMiddleware(logger, thunkMiddleware)
const composedEnhancers = compose(middlewareEnhancer, monitorReducerEnhancer)
const rootElement = document.getElementById("root");

render( 
  <>

   <BrowserRouter>
   <Routes>
    {['/', '/login','/profile','/user-address','/store','/package'].map(path => <Route path={path} element={<NavBar />} />)}
</Routes>
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/register" element={Cookies.get("Authorization")? <Navigate to={"/"}/>:<Register />} />
    <Route path="/login" element={Cookies.get("Authorization")? <Navigate to={"/"}/>:<Login />} />
    <Route path="/profile" element={Cookies.get("Authorization")? <Profile />:<Navigate to={"/"}/>} />
    <Route path="/user-address" element={Cookies.get("Authorization")?<ListAddress />:<Navigate to={"/"}/> }/>
    
    <Route path="/store" element={Cookies.get("Authorization")?<Store />:<Navigate to={"/"}/> }/>
    <Route path="/package" element={Cookies.get("Authorization")?<Package />:<Navigate to={"/"}/> }/>
 
   </Routes>
 </BrowserRouter>
  </>
 
,
rootElement);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
