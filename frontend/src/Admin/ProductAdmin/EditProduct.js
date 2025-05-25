import React, { useState } from "react";
import { useEffect } from "react";
import uploadImage from "../../helpers/uploadImage";
import SummaryApi from "../../common";
import { toast } from "react-toastify";
import "../../Css/EditProduct.css";

function EditProduct({ isModalOpen, product, handleClose, fetchAllProduct, fetchPaginatedProduct, page }) {
  const sizes = ["39", "40", "40.5", "41", "41.5", "42"];
  const [data, setData] = useState({
    ...product,
    title: product?.title,
    price: product?.price,
    discount: product?.discount,
    description: product?.description,
    category: product?.category,
    size: product?.size || [],
    image: product?.image || [],
  });
  useEffect(() => {
    if (product) {
      setData({
        ...product,
        title: product?.title,
        price: product?.price,
        discount: product?.discount,
        description: product?.description,
        category: product?.category,
        size: product?.size || [],
        image: product?.image || [],
      });
      setImagePreview(product.image || null);
    }
  }, [product]);
  const [imagePreview, setImagePreview] = useState(null);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSizeChange = (event) => {
    const { value, checked } = event.target;
    setData((prev) => {
      const updatedSizes = checked
        ? [...prev.size, value] // thêm size nếu được chọn
        : prev.size.filter((s) => s !== value); // bỏ size nếu bỏ chọn

      return { ...prev, size: updatedSizes };
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);
    setImagePreview(uploadImageCloudinary.url);
    setData((prevData) => ({
      ...prevData,
      image: uploadImageCloudinary.url,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const dataResponse = await fetch(SummaryApi.editProduct.url, {
      method: SummaryApi.editProduct.method,
      credentials: "include",
      headers: {
        "content-type": " application/json",
      },
      body: JSON.stringify(data),
    });
    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      toast.success(dataApi?.message);
      fetchAllProduct();
      fetchPaginatedProduct(page)
      handleClose();
    }
    if (dataApi.error) {
      toast.error(dataApi?.message);
    }
  };

  return (
    <div
      className={`modal fade edit-product-modal ${isModalOpen ? "show" : ""}`}
      id="myModal"
      role="dialog"
      style={{ display: isModalOpen ? "block" : "none" }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Chỉnh sửa sản phẩm</h4>
          </div>
          <div className="modal-body">
            <form onSubmit={onSubmit} encType="multipart/form-data">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="name">Tên sản phẩm</label>
                    <input
                      type="text"
                      className="form-control"
                      id="p_name"
                      name="title"
                      value={data.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="category">Danh mục</label>
                    <select
                      className="form-control"
                      name="category"
                      value={data.category}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Chọn danh mục</option>
                      <option value="Nike">Nike</option>
                      <option value="Adidas">Adidas</option>
                      <option value="Puma">Puma</option>
                      <option value="Mizuno">Mizuno</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="price">Giá</label>
                    <input
                      type="number"
                      className="form-control"
                      id="p_price"
                      name="price"
                      value={data.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="discount">Giảm giá (%)</label>
                    <input
                      type="number"
                      className="form-control"
                      id="p_discount"
                      name="discount"
                      value={data.discount}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">Mô tả</label>
                <textarea
                  className="form-control"
                  rows={4}
                  id="p_desc"
                  name="description"
                  value={data.description}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Kích thước</label>
                <div className="size-options">
                  {sizes.map((size) => (
                    <label key={size} className="size-checkbox">
                      <input
                        type="checkbox"
                        value={size}
                        checked={data.size.includes(size)}
                        onChange={handleSizeChange}
                      />
                      <span>{size}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="file">Hình ảnh sản phẩm</label>
                <input
                  type="file"
                  className="form-control-file"
                  id="file"
                  onChange={handleFileChange}
                />
                {imagePreview && (
                  <div className="image-preview">
                    <img src={imagePreview} alt="Preview" />
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClose}>
                  Hủy
                </button>
                <button type="submit" className="btn btn-primary">
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
