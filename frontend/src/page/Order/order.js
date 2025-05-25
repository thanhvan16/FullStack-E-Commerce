import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { FaBox, FaCalendarAlt, FaCreditCard, FaShippingFast, FaMoneyBillWave } from "react-icons/fa";
import SummaryApi from "../../common";

const OrderView = () => {
  const [orderList, setOrderList] = useState([]);
  const user = useSelector((state) => state?.user?.user);
  const userId = user?._id;

  const userOrder = async () => {
    const dataApi = await fetch(SummaryApi.userOrder.url, {
      method: SummaryApi.userOrder.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
      }),
    });
    const dataResponse = await dataApi.json();
    setOrderList(dataResponse?.data);
  };

  useEffect(() => {
    userOrder();
  }, []); // Added dependency array to prevent infinite loop

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center fw-bold">
        <FaBox className="me-2" />
        Đơn hàng của tôi
      </h2>
      
      {orderList.length === 0 ? (
        <div className="alert alert-info d-flex align-items-center">
          <FaBox className="me-2" size={20} />
          <span>Bạn chưa có đơn hàng nào.</span>
        </div>
      ) : (
        orderList.map((order) => (
          <div 
            className="card mb-4 shadow border-0 hover-effect" 
            key={order._id}
            style={{
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
          >
            <div className="card-header bg-primary bg-gradient text-white py-3 px-4">
              <div className="d-flex justify-content-between align-items-center">
                <span><strong>Mã đơn:</strong> #{order._id}</span>
                <span className="badge bg-light text-primary">
                  {order.status === "Pending" ? (
                    <span className="text-warning">⏳ Đang xử lí</span>
                  ) : order.status === "Shipping" ? (
                    <span className="text-primary">🚚 Đang giao</span>
                  ) : (
                    <span className="text-success">✓ Đã giao</span>
                  )}
                </span>
              </div>
            </div>

            <div className="card-body p-4">
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="d-flex align-items-center">
                    <FaCalendarAlt className="text-muted me-2" />
                    <div>
                      <strong>Ngày đặt:</strong><br />
                      {moment(order.date).format("DD/MM/YYYY HH:mm")}
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="d-flex align-items-center">
                    <FaCreditCard className="text-warning me-2" />
                    <div>
                      <strong>Thanh toán:</strong><br />
                      {order.payment ? (
                        <span className="text-success">✓ Đã thanh toán</span>
                      ) : (
                        <span className="text-danger">✗ Chưa thanh toán</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="d-flex align-items-center">
                    <FaMoneyBillWave className="text-success me-2" />
                    <div>
                      <strong>Tổng tiền:</strong><br />
                      <span className="fs-5 fw-bold text-danger">
                        {order.amount.toLocaleString()} VND
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="my-4" />

              <h6 className="mb-3 d-flex align-items-center">
                <FaShippingFast className="me-2" />
                Sản phẩm trong đơn
              </h6>

              <div className="row g-3">
                {order.orderItems.map((item, index) => (
                  <div className="col-12" key={index}>
                    <div className="d-flex align-items-center p-3 bg-light rounded">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="me-3 rounded"
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                        }}
                      />
                      <div className="flex-grow-1">
                        <h6 className="mb-1">{item.title}</h6>
                        <div className="text-muted small">
                          <span className="me-3">Size: {item.size}</span>
                          <span className="me-3">Số lượng: {item.quantity}</span>
                          <span className="fw-bold text-danger">
                            {item.price.toLocaleString()} VND
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))
      )}

      <style jsx>{`
        .hover-effect:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
        }
      `}</style>
    </div>
  );
};

export default OrderView;
