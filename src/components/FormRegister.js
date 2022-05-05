import { useState } from "react";
import ReactSuccessPopup from "react-success-popup";
import userService from './../requests/UserService';
import { useAlert } from 'react-alert'
import { useNavigate } from "react-router-dom";
function FormRegister(){
  const alert = useAlert()
  const [firstName,setFirstName]=useState('');
  const [lastName,setLastName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [confirmPassword,setConfirmPassword]=useState('');
  const [redirect,setRedirect]=useState(false)
  const navigate=useNavigate()
  const registerSubmitForm=(e)=>{
    e.preventDefault();
    userService.register(firstName,lastName,password,email).then(
      alert.success("Đăng ký thành công"),
      navigate("/login")
    ).catch(err=>alert.error("Đăng ký thất bại"));
  }
    return (
      <>
          
         <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
          <h3 className="text-2xl font-bold text-center">Join us</h3>
          <form onSubmit={registerSubmitForm.bind(this)}>
            <div className="mt-4">
              <div>
                <label className="block" htmlFor="Name">Họ<label>
                    <input onChange={e=>setFirstName(e.currentTarget.value)} type="text" placeholder="Name" className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                  </label></label></div>
                  <div>
                <label className="block" htmlFor="Name">Tên<label>
                    <input  onChange={e=>setLastName(e.currentTarget.value)} type="text" placeholder="Name" className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                  </label></label></div>
              <div className="mt-4">
                <label className="block" htmlFor="email">Email<label>
                    <input  onChange={e=>setEmail(e.currentTarget.value)} type="email" placeholder="Email" className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                  </label></label></div>
              <div className="mt-4">
                <label className="block">Password<label>
                    <input  onChange={e=>setPassword(e.currentTarget.value)} type="password" placeholder="Password" className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                  </label></label></div>
              <div className="mt-4">
                <label className="block">Confirm Password<label>
                    <input  onChange={e=>setConfirmPassword(e.currentTarget.value)} type="password" placeholder="Password" className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                  </label></label></div>
              <span className="text-xs text-red-400">Password must be same!</span>
              <div className="flex">
                <button className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Create
                  Account</button>
              </div>
              <div className="mt-6 text-grey-dark">
                Already have an account?
                <a className="text-blue-600 hover:underline" href="#">
                  Log in
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
      </>
       
    )
}

export default FormRegister;