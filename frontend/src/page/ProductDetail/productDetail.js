import { useParams } from "react-router-dom";
import ProductDetailItem from "./productDetailItem";
import ProductRelated from "./productRelated";
import { useState } from "react";
import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import SummaryApi from "../../common";
function ProductDetail() {
    const {id}=useParams();
    const [item, setItem] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);

    const Loading = () => {
        return (
          <>
            <div className="container my-5 py-2">
              <div className="row">
                <div className="col-md-6 py-3">
                  <Skeleton height={400} width={400} />
                </div>
                <div className="col-md-6 py-5">
                  <Skeleton height={30} width={250} />
                  <Skeleton height={90} />
                  <Skeleton height={40} width={70} />
                  <Skeleton height={50} width={110} />
                  <Skeleton height={120} />
                  <Skeleton height={40} width={110} inline={true} />
                  <Skeleton className="mx-3" height={40} width={110} />
                </div>
              </div>
            </div>
          </>
        );
      };

      const Loading2 = () => {
        return (
          <>
            <div className="my-4 py-4">
              <div className="d-flex">
                <div className="mx-4">
                  <Skeleton height={400} width={250} />
                </div>
                <div className="mx-4">
                  <Skeleton height={400} width={250} />
                </div>
                <div className="mx-4">
                  <Skeleton height={400} width={250} />
                </div>
                <div className="mx-4">
                  <Skeleton height={400} width={250} />
                </div>
              </div>
            </div>
          </>
        );
      };



     const fetchProductDetail = async()=>{
      setLoading(true)
      setLoading2(true)
      const dataResponse = await fetch(SummaryApi.productDetail.url,{
        method:SummaryApi.productDetail.method,
        credentials:'include',
        headers:{
          'content-type':"application/json"
        },
        body:JSON.stringify({
          id:id
        })
      })
      const dataApi= await dataResponse.json()
      setItem(dataApi?.data || [])
      setLoading(false)
      setLoading2(false)
     }

     useEffect(() => {
        fetchProductDetail()
      }, [id]);
  return (
    <>
      <div className="container">
        <div className="row">
         {loading ?(<Loading></Loading>):( <ProductDetailItem product={item} ></ProductDetailItem>)}
        </div>
        <div className="row my-5 py-5">
          <div className="d-none d-md-block">
            {loading2 ? (<Loading2></Loading2>):(<ProductRelated product={item}></ProductRelated>)}
          </div>
        </div>
      </div>
    </>
  );
}
export default ProductDetail;
