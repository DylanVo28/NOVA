import NavBar from "../components/NavBar"
import { useState, React } from 'react';
import FormLogin from './../components/FormLogin';
import { positions, transitions,Provider as AlertProvider } from 'react-alert';
import AlertTemplate  from 'react-alert-template-basic';
import { UserContext } from "../contexts/UserContext";

const options = {
    // you can also just use 'bottom center'
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: '30px',
    // you can also just use 'scale'
    transition: transitions.SCALE
  }
  
function Login(){
    const [user,setUser]=useState({})
    return (<>
    <UserContext.Provider value={{user,setUser}}>
         <AlertProvider template={AlertTemplate} {...options}>

    <FormLogin />
</AlertProvider>
</UserContext.Provider>
    </>)
}

export default Login