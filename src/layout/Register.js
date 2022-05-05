import FormRegister from "../components/FormRegister";
import NavBar from "../components/NavBar";
import { positions, transitions,Provider as AlertProvider } from 'react-alert';
import AlertTemplate  from 'react-alert-template-basic';

const options = {
    // you can also just use 'bottom center'
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: '30px',
    // you can also just use 'scale'
    transition: transitions.SCALE
  }

function Register(){

    return(
        <>
         <AlertProvider template={AlertTemplate} {...options}>
         <NavBar/>
        <FormRegister/>
         </AlertProvider>
        
        </>
      
    )
}

export default Register;