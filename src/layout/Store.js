import { UserContext } from './../contexts/UserContext';
import { positions, transitions,Provider as AlertProvider } from 'react-alert';
import AlertTemplate  from 'react-alert-template-basic';
import { useState } from 'react';
import FormActiveStore from '../components/FormActiveStore';
function Store(){
    const [store,setStore]=useState({})

    const options = {
        // you can also just use 'bottom center'
        position: positions.BOTTOM_CENTER,
        timeout: 5000,
        offset: '30px',
        // you can also just use 'scale'
        transition: transitions.SCALE
      }
    return <>
    <UserContext.Provider value={{store,setStore}}>
         <AlertProvider template={AlertTemplate} {...options}>
<FormActiveStore/>
</AlertProvider>
</UserContext.Provider>
    </>
}
export default Store