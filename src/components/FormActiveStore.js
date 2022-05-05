import { useContext, useEffect, useState } from "react"
import { useAlert } from "react-alert"
import { useNavigate } from "react-router-dom"
import { StoreContext } from "../contexts/StoreContext"
import storeService from "../requests/StoreService"

function FormActiveStore(props){
    const alert = useAlert()
    const navigate=useNavigate()
    //   const {setStore}=useContext(StoreContext)
      const [store,setStore]=useState({
        storeAddress:"",
        storeDesc:"",
        phoneNumber:"",
        storeName:"",
        logo:""
      })
      const [selectedFile, setSelectedFile] = useState()
      const [preview, setPreview] = useState()

      useEffect(() => {
        if (!store.logo) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(store.logo)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [store.logo])

    const handleChange = e => {
        const { name, value } = e.target;
        setStore(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setStore(prevState => ({
                ...prevState,
                logo: undefined
            }));
            return
        }
     
        // I've kept this example simple by using the first image instead of multiple
        setStore(prevState => ({
            ...prevState,
            logo: e.target.files[0]
        }));
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
      
        storeService.active(store).then(res=>console.log(res))
    }
    return <>
     <div className="flex justify-center mt-8">
        <div className="max-w-2xl rounded-lg shadow-xl bg-gray-50">
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
          Storename
        </label>
        <input  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="storeName" type="text" placeholder="storeName" name="storeName"  onChange={handleChange}/>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
          StoreAddress
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="storeAddress" type="text" placeholder="storeAddress" name="storeAddress"  onChange={handleChange}/>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
          Phone Number
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phoneNumber" type="text" placeholder="phoneNumber" name="phoneNumber"  onChange={handleChange}/>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
          Store desc
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="storeDesc" type="text" placeholder="storeDesc" name="storeDesc"  onChange={handleChange}/>
      </div>
          <div className="m-4">
            <label className="inline-block mb-2 text-gray-500">File Upload</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                <div className="flex flex-col items-center justify-center pt-7">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400 group-hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                    Attach a file</p>
                </div>
                <input type="file" className="opacity-0" onChange={onSelectFile} />
                {store.logo &&  <img src={preview} /> }
              </label>
            </div>
          </div>
          <div className="flex justify-center p-2">
            <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded shadow-xl">Create</button>
          </div>
          </form>
        </div>
      </div>
    </>
    }
export default FormActiveStore