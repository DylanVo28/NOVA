import { useNavigate } from "react-router-dom"

function PackageItem({item,sendPackageSelected,type,sendMovePayment}){
    const navigate=useNavigate()
    return  <div className="... ">
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
    <img className="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains" />
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{item.name}</div>
      <p className="text-gray-700 text-base">
        {item.desc}  </p>
        <p className="text-gray-700 text-base">
        {item.countDate+" "+item.typeDate}  </p>
        <p className="text-gray-700 text-base">Giá gốc: 
        {item.price}  VND</p>
        <p className="text-gray-700 text-base">Giá giảm: 
        {item.priceDiscount}  VND</p>
        <p className="text-gray-700 text-base">Ngày hết hạn 
        {item.expiredDisCount} </p>
        <p className="text-gray-700 text-base">Tổng cộng
        {new Date(item.expiredDisCount)>new Date()? (item.price-item.priceDiscount):(item.price)} </p>
    </div>
   { type==='submit'&&<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={e=>sendMovePayment(true)}>
Xác nhận
</button>}
{ type!=='submit'&&<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={e=>sendPackageSelected(item)}>
Đăng ký ngay
</button>}
  </div>
    </div>
}
export default PackageItem