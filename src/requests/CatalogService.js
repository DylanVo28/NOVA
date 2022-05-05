import Cookies from "js-cookie"

import axios from "axios";
const DOMAIN='https://api-deskita.herokuapp.com'
class CatalogService{
    getProvinces(){
        return new Promise((resolve,reject)=>{
            axios.get(`${DOMAIN}/catalog/provinces`,{   
                withCredentials:true,
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json", 
                }
                }).then(result=>{
                resolve(result.data)
            },reject)
        })
    }
    getDistricts(matp){
        return new Promise((resolve,reject)=>{
            axios.get(`${DOMAIN}/catalog/province/${matp}/districts`,{   
                withCredentials:true,
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json", 
                }
                }).then(result=>{
                resolve(result.data)
            },reject)
        })
    }
    getWards(maqh){
        return new Promise((resolve,reject)=>{
            axios.get(`${DOMAIN}/catalog/district/${maqh}/wards`,{   
                withCredentials:true,
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json", 
                }
                }).then(result=>{
                resolve(result.data)
            },reject)
        })
    }
}
const catalogService =new CatalogService();
export default catalogService;