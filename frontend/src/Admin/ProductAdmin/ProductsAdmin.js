import { useState } from "react";
import { useEffect } from "react";
import "../../Css/productsAdmin.css";
import { toast } from "react-toastify";
import AddProducts from "./AddProducts";
import EditProduct from "./EditProduct";
import SummaryApi from "../../common";
import formatPrice from "../../helpers/formatPrice";

const ProductsAdmin = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [productEdit, setProductEdit] = useState([]);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const handleEditProduct = (product) => {
    setProductEdit(product);
    setEditModalOpen(true);
  };
  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setProductEdit(null);
  };
  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const [allProduct, setAllProduct] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;
  const [page, setPage] = useState(1);

  // all product
  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.getProduct.url);
    const dataResponse = await response.json();
    setAllProduct(dataResponse?.data || []);
  };
  //  page
  const fetchPaginatedProduct = async () => {
    const response = await fetch(
      SummaryApi.getPaginatedProduct.url + "?page=" + page + "&limit=" + limit
    );
    const dataResponse = await response.json();
    setAllProduct(dataResponse?.data || []);
    setTotalPages(dataResponse?.totalPages);
  };

  useEffect(() => {
    fetchAllProduct();
    fetchPaginatedProduct(page);
  }, [page]);

  // Xóa sản phẩm
  const handleDelete = async (productId) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?"))
      return;
    const dataResponse = await fetch(SummaryApi.deleteProduct.url, {
      method: SummaryApi.deleteProduct.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: productId,
      }),
    });
    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      toast.success(dataApi.message);
      fetchAllProduct();
      fetchPaginatedProduct(page);
    }
    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  return (
    <div className={`products-admin-container ${isModalOpen ? "modal-blur" : ""}`}>
      <div className="products-admin-header">
        <h2 className="products-admin-title">Danh sách sản phẩm</h2>
        <button
          type="button"
          className="add-product-btn"
          onClick={handleOpenModal}
        >
          <i className="fa fa-plus"></i>
          Thêm sản phẩm
        </button>
      </div>

      <div className="products-table">
        <table className="table">
          <thead>
            <tr>
              <th className="text-center">STT</th>
              <th className="text-center">Hình ảnh</th>
              <th className="text-center">Tên sản phẩm</th>
              <th className="text-center">Hãng</th>
              <th className="text-center">Giá</th>
              <th className="text-center" colSpan="2">
                Thao tác
              </th>
            </tr>
          </thead>

          <tbody>
            {allProduct.length > 0 ? (
              allProduct.map((product, index) => (
                <tr key={product._id || product.id}>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">
                    <img
                      className="product-image"
                      src={product.image}
                      alt={product.title}
                    />
                  </td>
                  <td className="text-center">{product.title}</td>
                  <td className="text-center">{product.category}</td>
                  <td className="text-center">
                    {formatPrice(product.price)} đ
                  </td>
                  <td className="text-center">
                    <div className="action-buttons">
                      <button
                        className="edit-btn"
                        onClick={() => handleEditProduct(product)}
                      >
                        <i className="fa fa-pen-to-square"></i>
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(product._id)}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="empty-message">
                  Không tìm thấy sản phẩm nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`page-btn ${i + 1 === page ? "active" : ""}`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <AddProducts
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        fetchAllProduct={fetchAllProduct}
        fetchPaginatedProduct={fetchPaginatedProduct}
        page={page}
      />
      <EditProduct
        isModalOpen={isEditModalOpen}
        product={productEdit}
        handleClose={handleCloseEditModal}
        fetchAllProduct={fetchAllProduct}
        fetchPaginatedProduct={fetchPaginatedProduct}
        page={page}
      />
    </div>
  );
};

export default ProductsAdmin;
