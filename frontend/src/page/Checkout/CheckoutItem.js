import toast from "react-hot-toast";
import { useState } from "react";
import { useEffect } from "react";
import SummaryApi from "../../common";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function CheckOutItem() {
  const navigate = useNavigate();
  const [cartList, setCartList] = useState([]);
  const user = useSelector((state) => state?.user?.user);
  const userId = user?._id


  const fetchData = async () => {
    const response = await fetch(SummaryApi.addToCartProductView.url, {
      method: SummaryApi.addToCartProductView.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    const responseData = await response.json();

    if (responseData.success) {
      setCartList(responseData?.data);
    }
  };



  const totalPrice = cartList.reduce(
    (preve, curr) => preve + curr.quantity * curr?.productId?.price,
    0
  );
  const totalQty = cartList.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );
  let shipping = "";
  if (cartList.length > 1 || totalQty > 1) {
    shipping = "0 đ ";
  } else {
    shipping = "30 000 đ";
  }
  let totalAmount = parseInt(shipping.replace(/[^0-9]/g, ""), 10) + totalPrice;




  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    payment_method: "",
  });
  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
   useEffect(() => {
    fetchData();
  }, []);

  const placeOrder= async (e) =>{
     e.preventDefault();
     let orderItems= cartList.map(item=>({
      productId : item?.productId?._id,
      title: item?.productId?.title,
      image: item?.productId?.image,
      price: item?.productId?.price,
      quantity: item.quantity,
      size: item.size
     }))

     let orderData = {
      orderItems : orderItems,
      userId: userId,
      address: data,
      amount: totalAmount
     }
     const dataApi = await fetch(SummaryApi.placeOrder.url,{
      method: SummaryApi.placeOrder.method,
      credentials: 'include',
      headers:{
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(orderData)
     })
     const dataResponse = await dataApi.json()
     if(dataResponse.success){
       if(data.payment_method==='bank-transfer'){
           window.location.replace(dataResponse.session_url);
       }
       else{
          //  navigate('/products')
          window.location.replace(`verify?success=true&orderId=${dataResponse.data._id}`);
       }
     }
     else{
       alert("error")
     }
    }
  return (
    <>
      <Toaster />
      <div className="container py-5" style={{backgroundColor: "#f8f9fa"}}>
        <div className="row my-4 g-4">
          <div className="col-md-5 col-lg-4 order-md-last">
            <div className="card mb-4" style={{borderRadius: "15px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)"}}>
              <div className="card-header py-3" style={{backgroundColor: "#f8f9fa", borderTopLeftRadius: "15px", borderTopRightRadius: "15px"}}>
                <h5 className="mb-0 fw-bold">Hóa đơn</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  {cartList.map((product) => (
                    <li
                      key={product?._id}
                      className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-3 mb-2 border-bottom"
                      style={{transition: "all 0.3s ease"}}
                    >
                      <div className="d-flex align-items-center">
                        <img
                          src={product?.productId?.image}
                          alt={product?.productId?.title}
                          className="img-fluid rounded"
                          style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "cover",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                          }}
                        />
                        <div className="ms-3">
                          <h6 className="mb-1 fw-bold">{product?.productId?.title}</h6>
                          <small className="text-muted">Size: {product?.size}</small>
                        </div>
                      </div>
                      <div className="text-end">
                        <p className="mb-1 fw-bold">x{product?.quantity}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card-body pt-0">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-2">
                    <span className="fw-bold">Tạm tính</span>
                    <span className="text-muted">{totalPrice.toLocaleString("en-US")} đ</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0 pb-2">
                    <span className="fw-bold">Phí ship</span>
                    <span className="text-muted">{shipping}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    <div>
                      <strong style={{fontSize: "1.2rem"}}>Tổng</strong>
                    </div>
                    <span style={{color: "#dc3545", fontSize: "1.2rem", fontWeight: "bold"}}>
                      {totalAmount.toLocaleString("en-US")} đ
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-7 col-lg-8">
            <div className="card mb-4" style={{borderRadius: "15px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)"}}>
              <div className="card-header py-3" style={{backgroundColor: "#f8f9fa", borderTopLeftRadius: "15px", borderTopRightRadius: "15px"}}>
                <h4 className="mb-0 fw-bold">Thông tin giao hàng</h4>
              </div>
              <div className="card-body p-4">
                <form className="needs-validation" noValidate onSubmit={placeOrder}>
                  <div className="row g-3">
                    <div className="col-sm-6 my-2">
                      <label htmlFor="firstName" className="form-label fw-bold">
                        Họ
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        style={{borderRadius: "10px"}}
                        id="firstName"
                        name="firstName"
                        onChange={handleOnChange}
                        value={data.firstName}
                        required
                      />
                    </div>

                    <div className="col-sm-6 my-2">
                      <label htmlFor="lastName" className="form-label fw-bold">
                        Tên
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        style={{borderRadius: "10px"}}
                        id="lastName"
                        name="lastName"
                        onChange={handleOnChange}
                        value={data.lastName}
                        required
                      />
                    </div>

                    <div className="col-12 my-2">
                      <label htmlFor="email" className="form-label fw-bold">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        style={{borderRadius: "10px"}}
                        id="email"
                        name="email"
                        value={data.email}
                        onChange={handleOnChange}
                        placeholder="example@email.com"
                        required
                      />
                    </div>

                    <div className="col-12 my-2">
                      <label htmlFor="phone" className="form-label fw-bold">
                        Số điện thoại
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        style={{borderRadius: "10px"}}
                        id="phone"
                        name="phone"
                        value={data.phone}
                        onChange={handleOnChange}
                        placeholder="0123456789"
                        required
                      />
                    </div>

                    <div className="col-12 my-2">
                      <label htmlFor="address" className="form-label fw-bold">
                        Địa chỉ
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        style={{borderRadius: "10px"}}
                        id="address"
                        name="address"
                        value={data.address}
                        onChange={handleOnChange}
                        placeholder="Địa chỉ chi tiết"
                        required
                      />
                    </div>
                  </div>

                  <hr className="my-4" />

                  <h4 className="mb-3 fw-bold">Phương thức thanh toán</h4>

                  <div className="row gy-3">
                    <div className="col-md-12">
                      <div className="form-check mb-3 p-3" style={{
                        border: data.payment_method === "bank-transfer" ? "2px solid #dc3545" : "1px solid #dee2e6",
                        borderRadius: "10px",
                        transition: "all 0.3s ease"
                      }}>
                        <input
                          type="radio"
                          className="form-check-input"
                          id="bank-transfer"
                          name="payment_method"
                          value="bank-transfer"
                          onChange={handleOnChange}
                          checked={data.payment_method === "bank-transfer"}
                          required
                        />
                        <label className="form-check-label fw-bold" htmlFor="bank-transfer">
                          Thanh toán online
                        </label>
                      </div>
                      <div className="form-check p-3" style={{
                        border: data.payment_method === "cash-on-delivery" ? "2px solid #dc3545" : "1px solid #dee2e6",
                        borderRadius: "10px",
                        transition: "all 0.3s ease"
                      }}>
                        <input
                          type="radio"
                          className="form-check-input"
                          id="cash-on-delivery"
                          name="payment_method"
                          value="cash-on-delivery"
                          onChange={handleOnChange}
                          checked={data.payment_method === "cash-on-delivery"}
                          required
                        />
                        <label className="form-check-label fw-bold" htmlFor="cash-on-delivery">
                          Thanh toán khi nhận hàng
                        </label>
                      </div>
                    </div>
                  </div>

                  <hr className="my-4" />

                  <button
                    className="w-100 btn btn-danger btn-lg"
                    style={{
                      borderRadius: '10px',
                      padding: '15px 30px',
                      fontSize: '1.2rem',
                      fontWeight: '600',
                      letterSpacing: '0.5px',
                      backgroundColor: '#dc3545',
                      border: 'none',
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
                    type="submit"
                  >
                    Hoàn tất đơn hàng
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default CheckOutItem;
