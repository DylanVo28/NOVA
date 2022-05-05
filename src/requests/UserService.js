import Cookies from "js-cookie"

import axios from "axios";
const DOMAIN='https://api-deskita.herokuapp.com'
// const DOMAIN='http://localhost:4000'

var getCookies = function(){
    var pairs = document.cookie.split(";");
    var cookies = {};
    for (var i=0; i<pairs.length; i++){
      var pair = pairs[i].split("=");
      cookies[(pair[0]+'').trim()] = unescape(pair.slice(1).join('='));
    }
    return cookies;
  }
  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
class UserService{
    register(firstName,lastName,password,userName){
        return new Promise((resolve,reject)=>{
            axios.post(`${DOMAIN}/user`,{
                firstName,
                lastName,
                password,
                userName
            }).then(result=>{
                resolve(result.data)
            },reject)
        })
    }
    login(userName,password){
        return new Promise((resolve,reject)=>{
            axios.post(`${DOMAIN}/login`,{
               
                password,
                userName
            }).then(result=>{
                resolve(result.data)
            },reject)
        })
    }
    getProfile(){
        return new Promise((resolve,reject)=>{
            axios.get(`${DOMAIN}/user/profile`,{   
                withCredentials:true,
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json", 
                    "Authorization":Cookies.get('Authorization')    ,
                }
                }).then(result=>{
                resolve(result.data)
            },reject)
        })
    }

    postAddress(userAddress){
        return new Promise((resolve,reject)=>{
            axios.post(`${DOMAIN}/user-address`,
                userAddress
            ,{   
                withCredentials:true,
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json", 
                    "Authorization":Cookies.get('Authorization')    ,
                }
                }).then(result=>{
                resolve(result.data)
            },reject)
        })
    }
    getAddress(){
        return new Promise((resolve,reject)=>{
            axios.get(`${DOMAIN}/user-address`,{   
                withCredentials:true,
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json", 
                    "Authorization":Cookies.get('Authorization')    ,
                }
                }).then(result=>{
                resolve(result.data)
            },reject)
        })
    }
    deleteAddress(id){
        return new Promise((resolve,reject)=>{
            axios.delete(`${DOMAIN}/user-address/${id}`,{   
                withCredentials:true,
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json", 
                    "Authorization":Cookies.get('Authorization')    ,
                }
                }).then(result=>{
                resolve(result.data)
            },reject)
        })
    }
}
const userService =new UserService();
export default userService;
