import Cookies from "js-cookie"

import axios from "axios";
const DOMAIN='https://api-deskita.herokuapp.com'
// const DOMAIN='localhost:4000'

class StoreService{
    active(store){
        const formData=new FormData()
        formData.append('logo',store.logo)
        formData.append('storeAddress',store.storeAddress)
        formData.append('storeDesc',store.storeDesc)
        formData.append('phoneNumber',store.phoneNumber)
        formData.append('storeName',store.storeName)
        return new Promise((resolve,reject)=>{
            axios.post(`${DOMAIN}/store/active`,
            formData
            ,{   
                withCredentials:true,
                headers: {
                    "Accept": "application/json",
                    "Content-type": "multipart/form-data; boundary=MyBoundary",
                    "Authorization":Cookies.get('Authorization')    ,
                }
                }).then(result=>{
                resolve(result.data)
            },reject)
        })
    }

    getPackages(){
            return new Promise((resolve,reject)=>{
                axios.get(`${DOMAIN}/package`,{   
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
const storeService =new StoreService();
export default storeService;