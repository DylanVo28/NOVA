import { useEffect, useState } from "react"
import PackageItem from "../components/PackageItem"
import storeService from "../requests/StoreService"
import { positions, transitions,Provider as AlertProvider } from 'react-alert';
import AlertTemplate  from 'react-alert-template-basic';
import { PackageContext } from './../contexts/PackageContext';
import FormPayment from './../components/FormPayment';

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}
function Package(){
    const [packages,setPackages]=useState([])
    const [packageSelected,setPackageSelected]=useState(null)
   const [move,setMove]=useState(false)

    useEffect(()=>{
        async function fetchMyAPI() {
            const packages=await storeService.getPackages()
        setPackages(packages)
          
          }
      
          fetchMyAPI()
       
    },[])
    const sendPackageSelected=index=>{
      setPackageSelected(index)
    }
    const sendMovePayment=index=>{
      setMove(index)
    }
    return<> <PackageContext.Provider value={{packageSelected,setPackageSelected}}>
         <AlertProvider template={AlertTemplate} {...options}>
   {!move&& <><div className="grid grid-cols-3 gap-4">
      {packages.map(item=>
        <PackageItem item={item} sendPackageSelected={sendPackageSelected} />
       )}
      </div>
        {
          packageSelected &&   <PackageItem item={packageSelected} type={'submit'} sendMovePayment={sendMovePayment}/>
        }</>}
        {move&& <FormPayment/>}
        </AlertProvider>
        </PackageContext.Provider>
        
    </>
}
export default Package