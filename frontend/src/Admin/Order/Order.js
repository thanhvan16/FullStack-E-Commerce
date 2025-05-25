
import { use } from "react";
import { useEffect } from "react";
import { useState } from "react";
import OrderDetails from "./OrderDetails";
import SummaryApi from "../../common";
import moment from "moment";
import { toast } from "react-toastify";
import "../../Css/Order.css";

function Order() {
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState({});

  const handleViewOrderDetails = (order) => {
    setOrderDetails(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const fetchAllOrder = async () => {
    const dataApi = await fetch(SummaryApi.allOrder.url, {
      method: SummaryApi.allOrder.method,
      credentials: "include",
    });
    const dataResponse = await dataApi.json();
    setOrders(dataResponse.data);
  };

  useEffect(() => {
    fetchAllOrder();
  });

  const handleChangeOrderStatus = async (orderId, currentStatus) => {
    let nextStatus;

    if (currentStatus === "Pending") {
      nextStatus = "Shipping";
    } else if (currentStatus === "Shipping") {
      nextStatus = "Delivered";
    } else if (currentStatus === "Delivered") {
      return;
    }

    const updateOrder = await fetch(SummaryApi.updateOrder.url, {
      method: SummaryApi.updateOrder.method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        orderId: orderId,
        status: nextStatus
      })
    });

    const dataResponse = await updateOrder.json();
    if (dataResponse.success) {
      const updatedOrders = orders.map((order) =>
        order._id === orderId ? { ...order, status: nextStatus } : order
      );
      setOrders(updatedOrders);
      toast.success(dataResponse.message);
    } else {
      toast.error("Cập nhật trạng thái thất bại");
    }
  };

  const getStatusClassName = (status) => {
    switch (status) {
      case "Pending":
        return "status-btn status-pending";
      case "Shipping":
        return "status-btn status-shipping";
      case "Delivered":
        return "status-btn status-delivered";
      default:
        return "status-btn";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "Pending":
        return "Đang xử lí";
      case "Shipping":
        return "Đang giao";
      case "Delivered":
        return "Đã giao";
      default:
        return status;
    }
  };

  return (
    <div className="order-container">
      <div id="ordersBtn" className={isModalOpen ? "blur" : ""}>
        <h2 className="order-title">Đơn hàng</h2>
        <div className="order-table">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Khách hàng</th>
                <th>SĐT</th>
                <th>Địa chỉ</th>
                <th>Ngày đặt hàng</th>
                <th>Trạng thái đơn hàng</th>
                <th>Trạng thái thanh toán</th>
                <th>Chi tiết</th>
              </tr>
            </thead>
            <tbody>
              {orders && orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order._id}>
                    <td>
                      {order.address.firstName + " " + order.address.lastName}
                    </td>
                    <td>{order.address.phone}</td>
                    <td>{order.address.address}</td>
                    <td>{moment(order.date).format("DD/MM/YYYY HH:mm")}</td>
                    <td>
                      <button
                        className={getStatusClassName(order.status)}
                        onClick={() =>
                          handleChangeOrderStatus(order._id, order.status)
                        }
                        disabled={order.status === "Delivered"}
                      >
                        {getStatusText(order.status)}
                      </button>
                    </td>
                    <td>
                      <button
                        className={`payment-btn ${
                          order.payment ? "payment-paid" : "payment-unpaid"
                        }`}
                      >
                        {order.payment ? "Đã thanh toán" : "Chưa thanh toán"}
                      </button>
                    </td>
                    <td>
                      <button
                        className="view-details-btn"
                        onClick={() => handleViewOrderDetails(order)}
                      >
                        <i className="fa fa-eye"></i> Xem
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="empty-message">
                    Không tìm thấy đơn hàng
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <OrderDetails
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        orderDetails={orderDetails}
      />
    </div>
  );
}

export default Order;
