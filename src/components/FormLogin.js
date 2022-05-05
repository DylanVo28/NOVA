
import { useState, React, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import userService from './../requests/UserService';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './../contexts/UserContext';
import { useDispatch } from 'react-redux';
import { loginAction } from '../slices/UserSlice';
function FormLogin(props){
  const alert = useAlert()
  const navigate=useNavigate()
    const {setUser}=useContext(UserContext)
    const [login,setLogin]=useState({
        userName:"",
        password:""
    })
    useEffect(()=>{
      if(Cookies.get('Authorization')){
        navigate("/")
      }
   },[])
    const handleChange = e => {
        const { name, value } = e.target;
        setLogin(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const submitLogin=async (e)=>{
        e.preventDefault();
       
        await userService.login(login.userName,login.password).then(res=>{
          Cookies.set("Authorization",res.jwt)
          alert.success("Đăng nhập thành công")

          userService.getProfile().then(res2=>setUser(res2))
          navigate("/profile")
        })
    }
    return (
        <>
        <div
  class="container max-w-md mx-auto xl:max-w-3xl h-full flex bg-white rounded-lg shadow overflow-hidden"
>
  <div class="relative hidden xl:block xl:w-1/2 h-full">
    <img
      class="absolute h-auto w-full object-cover"
      src="https://images.unsplash.com/photo-1541233349642-6e425fe6190e"
      alt="my zomato"
    />
  </div>
  <div class="w-full xl:w-1/2 p-8">
    <form method="post" action="#" onSubmit={submitLogin.bind(this)}>
      <h1 class=" text-2xl font-bold">Sign in to your account</h1>
      <div>
        <span class="text-gray-600 text-sm">
          Don't have an account?
        </span>
        <span class="text-gray-700 text-sm font-semibold">
          Sign up
        </span>
      </div>
      <div class="mb-4 mt-6">
        <label
          class="block text-gray-700 text-sm font-semibold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          class="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
          id="email"
          type="text"
          placeholder="Your email address"
          name="userName"
          onChange={handleChange}
        />
      </div>
      <div class="mb-6 mt-6">
        <label
          class="block text-gray-700 text-sm font-semibold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          class="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
          id="password"
          type="password"
          placeholder="Your password"
          name="password"
          onChange={handleChange}
        />
        <a
          class="inline-block align-baseline text-sm text-gray-600 hover:text-gray-800"
          href="/forgot"
        >
          Forgot Password?
        </a>
      </div>
      <div class="flex w-full mt-8">
        <button
          class="w-full bg-gray-800 hover:bg-grey-900 text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10"
          type="submit"
        >
          Sign in
        </button>
      </div>
    </form>
  </div>
</div></>
    )
}

export default FormLogin