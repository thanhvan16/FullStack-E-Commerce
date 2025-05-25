function OrderDetails({ isModalOpen, handleCloseModal, orderDetails }) {
  const productsList = orderDetails.orderItems || [];

  return (
    <>
      {/* Backdrop */}
      {isModalOpen && (
        <div className="modal-backdrop fade show"></div>
      )}

      {/* Modal */}
      <div
        className={`modal fade ${isModalOpen ? "show" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{
          display: isModalOpen ? "block" : "none",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title w-100 text-center">Sản phẩm</h4>
              <button type="button" className="btn-close" onClick={handleCloseModal}></button>
            </div>

            <div className="modal-body" style={{ maxHeight: "70vh", overflowY: "auto" }}>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Hình ảnh</th>
                    <th>Tên sản phẩm</th>
                    <th>Size</th>
                    <th>Số lượng</th>
                    <th>Tổng</th>
                  </tr>
                </thead>
                <tbody>
                  {productsList.map((product) => (
                    <tr key={product._id}>
                      <td>
                        <img
                          src={product.image}
                          alt={product.title}
                          style={{ width: "50px" }}
                        />
                      </td>
                      <td>{product.title}</td>
                      <td>{product.size}</td>
                      <td>{product.quantity}</td>
                      <td className="text-danger fw-bold">
                        {product.price.toLocaleString()}đ
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="modal-footer">
              {/* <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCloseModal}
              >
                Đóng
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderDetails;