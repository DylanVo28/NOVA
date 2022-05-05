
import { useEffect, useState } from 'react';
import catalogService from './../requests/CatalogService';
import userService from './../requests/UserService';
function ListAddress(){
  const [address,setAddress]=useState({
    address:"",
    wardCode:"",
    customerName:"",
    phoneNumber:""
  })
  const [provinces,setProvinces]=useState([])
  const [districts,setDistricts]=useState([])
  const [wards,setWards]=useState([])
  const [listAddress,setListAddress]=useState([])
  useEffect(()=>{
    catalogService.getProvinces().then(res=>setProvinces(res))
    userService.getAddress().then(res=>setListAddress(res))
  },[])
  const provinceChange=(matp)=>{
    catalogService.getDistricts(matp).then(res=>setDistricts(res))
  }
  const districtChange=(maqh)=>{
    catalogService.getWards(maqh).then(res=>setWards(res))
  }
  const removeAddress=async (id)=>{
    await userService.deleteAddress(id)
    userService.getAddress().then(res=>setListAddress(res))

  }
  const handleChange = e => {
    const { name, value } = e.target;
    setAddress(prevState => ({
        ...prevState,
        [name]: value
    }));
};
const addAddress=async ()=>{
    await userService.postAddress(address)
    userService.getAddress().then(res=>setListAddress(res))
}
    return (<div className="w-full h-screen bg-gray-100 pt-8">
    <div className="bg-white p-3 max-w-md mx-auto" style={{maxWidth:'80rem'}}>
      <div className="text-center">
        <h1 className="text-3xl font-bold">ToDo App</h1>
        <select onChange={e=>provinceChange(e.target.value)}>
  {provinces.map(province=><option value={province.matp}>{province.name}</option>)}
</select>
<select onChange={e=>districtChange(e.target.value)}>
  {districts.map(district=><option value={district.maqh}>{district.name}</option>)}
</select>
<select onChange={e=>handleChange(e)} name="wardCode">
  {wards.map(ward=><option value={ward.xaid}>{ward.name}</option>)}
</select>
        <div className="mt-4 flex">
          <input className="w-80 border-b-2 border-gray-500 text-black" onChange={handleChange} type="text" placeholder="Nhập địa chỉ" name="address"/>
          <input className="w-80 border-b-2 border-gray-500 text-black" onChange={handleChange} type="text" placeholder="Tên Người nhận" name="customerName" />

          <input className="w-80 border-b-2 border-gray-500 text-black" onChange={handleChange} type="text" placeholder="Số điện thoại" name="phoneNumber"/>

          <button className="ml-2 border-2 border-green-500 p-2 text-green-500 hover:text-white hover:bg-green-500 rounded-lg flex" onClick={e=>addAddress()}>   
            <svg className="h-6 w-6" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx={12} cy={12} r={9} />  <line x1={9} y1={12} x2={15} y2={12} />  <line x1={12} y1={9} x2={12} y2={15} /></svg>
            <span>Add</span>
          </button>
        </div>        
      </div>
      <div className="mt-8">
        <ul>
         {listAddress.map(item=>
           <li className="p-2 rounded-lg">
           <div className="flex align-middle flex-row justify-between">
            
             <div className="p-2">
               <p className="text-lg text-black">{item.customerName}</p>
             </div>
             <div className="p-2">
               <p className="text-lg text-black">{item.phoneNumber}</p>
             </div>
             <div className="p-2">
               <p className="text-lg text-black">{item.full_address.district_province.matp.name+" "+
               item.full_address.district_province.name+" "+item.full_address.ward_district.name}</p>
             </div>
             <div className="p-2">
               <p className="text-lg text-black">{item.address}</p>
             </div>
             <button className="flex text-red-500 border-2 border-red-500 p-2 rounded-lg" onClick={e=>removeAddress(item.id)}>
               <svg className="h-6 w-6 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">  <circle cx={12} cy={12} r={10} />  <line x1={15} y1={9} x2={9} y2={15} />  <line x1={9} y1={9} x2={15} y2={15} /></svg>
               <span>Remove</span>
             </button>
           </div>
           <hr className="mt-2" />
         </li>
         )}
          
        </ul>
      </div>
      
    </div>    
  </div>)
}
export default ListAddress