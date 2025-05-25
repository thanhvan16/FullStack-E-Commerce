import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import SummaryApi from "../../common";
import { useContext } from "react";
import Context from "../../context"
import {loadStripe} from '@stripe/stripe-js';
import { useNavigate } from "react-router-dom";

function CartList() {
  const [data, setData] = useState([])
  const {fetchUserAddToCart} = useContext(Context);
  const navigate = useNavigate()

  const fetchData = async() =>{
        
    const response = await fetch(SummaryApi.addToCartProductView.url,{
        method : SummaryApi.addToCartProductView.method,
        credentials : 'include',
        headers : {
            "content-type" : 'application/json'
        },
    })
   

    const responseData = await response.json()

    if(responseData.success){
        setData(responseData?.data)
    }
}
useEffect(()=>{
  fetchData()
},[])

  console.log("data",data)
  const increaseItem= async(id, qty)=>{
      const dataResponse= await fetch(SummaryApi.updateAddToCartProduct.url,{
        method: SummaryApi.updateAddToCartProduct.method,
        credentials:'include',
        headers:{
          "Content-Type":'application/json'
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty+1
        })
      })
      const dataApi = await dataResponse.json()
      if(dataApi.success){
        fetchData()
      }
  }

  const decreaseItem= async(id, qty)=>{
    const dataResponse= await fetch(SummaryApi.updateAddToCartProduct.url,{
      method: SummaryApi.updateAddToCartProduct.method,
      credentials:'include',
      headers:{
        "Content-Type":'application/json'
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty-1
      })
    })
    const dataApi = await dataResponse.json()
    if(dataApi.success){
      fetchData()
    }
  }

  const deleteItem= async (id)=>{
    const dataResponse = await fetch(SummaryApi.deleteAddToCartProduct.url,{
      method: SummaryApi.deleteAddToCartProduct.method,
      credentials:'include',
      headers:{
        "Content-Type":'application/json'
      },
      body: JSON.stringify({
        _id: id
      })

    })
    const dataApi = await dataResponse.json()
    if(dataApi.success){
      fetchData()
      fetchUserAddToCart()
    }
  }

  const handlePayment = async ()=>{
      navigate("/checkout")
  }

  const totalPrice = data.reduce((preve,curr)=> preve + (curr.quantity * curr?.productId?.price) ,0)
  const totalQty = data.reduce((previousValue,currentValue)=> previousValue + currentValue.quantity,0)
   let shipping="";
   if (data.length>1 || totalQty>1){
     shipping="0 đ "
   }
   else{
     shipping ="30 000 đ"
   }

   let totalAmount= parseInt((shipping).replace(/[^0-9]/g, ""),10)+totalPrice;

  return (
    <>
      <section className="h-100" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container py-5">
          <div className="row d-flex justify-content-center my-4">
            <div className="col-md-8">
              <div className="card mb-4 border-0 shadow-sm">
                <div className="card-header py-3" style={{ backgroundColor: '#fff', borderBottom: '2px solid #f1f1f1' }}>
                  {/* <h5 className="mb-0 fw-bold">Giỏ hàng của bạn</h5> */}
                </div>
                <div className="card-body">
                  {data.length === 0 ? (
                    <div className="text-center py-5">
                      <i className="fas fa-shopping-cart fa-3x mb-3 text-muted"></i>
                      <h4 className="text-muted">Giỏ hàng trống</h4>
                      <NavLink to="/" className="btn btn-outline-primary mt-3">
                        Tiếp tục mua sắm
                      </NavLink>
                    </div>
                  ) : (
                    data.map((item) => (
                      <div key={item?._id} className="mb-4">
                        <div className="row d-flex align-items-center justify-content-between p-2" style={{ backgroundColor: '#fff' }}>
                          {/* Hình ảnh sản phẩm */}
                          <div className="col-lg-3 col-md-12 mb-3 mb-lg-0">
                            <div 
                              className="rounded overflow-hidden position-relative" 
                              style={{ 
                                minHeight: '150px',
                                maxHeight: '200px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#fff',
                                padding: '10px'
                              }}
                            >
                              <img
                                src={item?.productId?.image}
                                alt={item?.productId?.title}
                                style={{ 
                                  maxWidth: '100%',
                                  maxHeight: '180px',
                                  objectFit: 'contain',
                                  display: 'block',
                                  margin: 'auto'
                                }}
                              />
                            </div>
                          </div>

                          {/* Tên và Size sản phẩm */}
                          <div className="col-lg-4 col-md-6">
                            <h6 className="fw-bold mb-2" style={{ fontSize: '1rem' }}>{item?.productId?.title}</h6>
                            <p className="text-muted mb-2" style={{ fontSize: '0.9rem' }}>Size: {item.size}</p>
                            <p className="text-danger fw-bold" style={{ fontSize: '1.1rem' }}>{item?.productId?.price.toLocaleString("en-US")}đ</p>
                          </div>

                          {/* Tăng / Giảm số lượng */}
                          <div className="col-lg-3 col-md-6">
                            <div className="d-flex align-items-center justify-content-center">
                              <button 
                                className="btn btn-outline-secondary px-3"
                                onClick={() => decreaseItem(item?._id, item?.quantity)}
                              >
                                <i className="fas fa-minus"></i>
                              </button>
                              <span className="mx-4 fw-bold">{item.quantity}</span>
                              <button 
                                className="btn btn-outline-secondary px-3"
                                onClick={() => increaseItem(item?._id, item?.quantity)}
                              >
                                <i className="fas fa-plus"></i>
                              </button>
                            </div>
                          </div>

                          {/* Nút Xóa */}
                          <div className="col-lg-1 col-md-1 text-end">
                            <button
                              className="btn btn-link text-danger"
                              onClick={() => deleteItem(item?._id)}
                            >
                              <i className="fas fa-trash-alt"></i>
                            </button>
                          </div>
                        </div>
                        <hr className="my-4" style={{ backgroundColor: '#f1f1f1' }} />
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm">
                <div className="card-header py-3" style={{ backgroundColor: '#fff', borderBottom: '2px solid #f1f1f1' }}>
                  <h5 className="mb-0 fw-bold">Hóa đơn</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-3">
                      <span>Tạm tính</span>
                      <span className="text-danger fw-bold">{totalPrice.toLocaleString("en-US")}đ</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-3">
                      <span>Phí vận chuyển</span>
                      <span className="fw-bold">{shipping}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-3" 
                        style={{ borderTop: '2px solid #f1f1f1', marginTop: '10px', paddingTop: '20px' }}>
                      <span className="fw-bold">Tổng cộng</span>
                      <span className="text-danger fw-bold">{totalAmount.toLocaleString("en-US")}đ</span>
                    </li>
                  </ul>

                  <button
                    className="btn btn-danger w-100 py-3 mt-3 fw-bold"
                    onClick={handlePayment}
                    style={{ 
                      backgroundColor: '#dc3545',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '15px 30px',
                      fontSize: '1.2rem',
                      fontWeight: '600',
                      letterSpacing: '0.5px',
                      boxShadow: '0 4px 6px rgba(220, 53, 69, 0.2)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 12px rgba(220, 53, 69, 0.3)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 6px rgba(220, 53, 69, 0.2)';
                    }}
                  >
                    Thanh toán ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CartList;
