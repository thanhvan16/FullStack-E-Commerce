import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import ProductSlider from "./productSlicer";
import SummaryApi from "../../common";
function ProductRelated({product}) {
  const item=product
  const [allProduct,setAllProduct] = useState([]);
  const fetchAllProduct = async()=>{
    const dataResponse= await fetch(SummaryApi.getProduct.url)
    const dataApi=await dataResponse.json()
    setAllProduct(dataApi?.data|| [])
  }
  
  useEffect(() => {
    fetchAllProduct()
  }, []);

  const relatedItem = allProduct.filter(
    (product) => product.category === item.category
  );
  return (
    <>
       <div>
      <ProductSlider products={relatedItem} />
    </div>
    </>
  );
}
export default ProductRelated;
