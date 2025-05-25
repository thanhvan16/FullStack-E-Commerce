import SummaryApi from "../../common";
import toast from "react-hot-toast";
const addToCart= async(e,id,size)=>{
    e?.stopPropagation()
    e?.preventDefault()
    const responseData = await fetch(SummaryApi.addToCart.url,{
        method: SummaryApi.addToCart.method,
        credentials:'include',
        headers:{
            "Content-Type":'application/json'
        },
        body:JSON.stringify({
            productId: id,
            size: size
        })

    })
    const dataApi = await responseData.json()
    if(dataApi.success){
        toast.success(dataApi.message)
    }
    if(dataApi.error){
    toast.error(dataApi.message)
    }
    return dataApi;



}
export default addToCart;