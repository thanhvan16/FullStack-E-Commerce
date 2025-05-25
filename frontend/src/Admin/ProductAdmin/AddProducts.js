import React, { useEffect, useState } from "react";
import uploadImage from "../../helpers/uploadImage";
import SummaryApi from "../../common";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import "../../Css/productsAdmin.css";

function AddProducts({ isModalOpen, handleCloseModal, fetchAllProduct, fetchPaginatedProduct, page }) {
  const navigate = useNavigate();
  const sizes = ["39", "40", "40.5", "41", "41.5", "42"];
  const [category,setCategory]=useState([])
  const [imagePreview, setImagePreview] = useState(null);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    discount: "",
    description: "",
    category: "",
    size: [],
    image: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log('Input changed:', name, value);
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSizeChange = (event) => {
    const { value, checked } = event.target;
    setNewProduct((prev) => {
      const updatedSizes = checked
        ? [...prev.size, value]
        : prev.size.filter((s) => s !== value);
      return { ...prev, size: updatedSizes };
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);
    setImagePreview(uploadImageCloudinary.url);
    setNewProduct({
      ...newProduct,
      image: uploadImageCloudinary.url,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!newProduct.image) {
      toast.error("Vui lòng chọn ảnh cho sản phẩm.");
      return;
    }
    
    const dataResponse = await fetch(SummaryApi.addProduct.url, {
      method: SummaryApi.addProduct.method,
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newProduct)
    });
    
    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      toast.success(dataApi?.message);
      fetchAllProduct();
      fetchPaginatedProduct(page);
      handleCloseModal();
      // Reset form
      setNewProduct({
        title: "",
        price: "",
        discount: "",
        description: "",
        category: "",
        size: [],
        image: "",
      });
      setImagePreview(null);
    }
    if (dataApi.error) {
      toast.error(dataApi?.message);
    }
  };

   const fetchAllCategory = async () => {
    const dataResponse = await fetch(SummaryApi.getCategory.url);
    const dataApi = await dataResponse.json();
    setCategory(dataApi?.data || []);
  };

  useEffect(() => {
    fetchAllCategory();
  }, []);
  return (
    <>
      {isModalOpen && <div className="modal-backdrop" />}
      <div
        className={`modal ${isModalOpen ? "show" : ""}`}
        style={{ display: isModalOpen ? "block" : "none" }}
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Thêm sản phẩm mới</h4>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label htmlFor="title">Tên sản phẩm</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={newProduct.title}
                    onChange={handleInputChange}
                    placeholder="Nhập tên sản phẩm"
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="price">Giá (VNĐ)</label>
                      <input
                        type="number"
                        className="form-control"
                        id="price"
                        name="price"
                        value={newProduct.price}
                        onChange={handleInputChange}
                        placeholder="Nhập giá sản phẩm"
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
                        id="discount"
                        name="discount"
                        value={newProduct.discount}
                        onChange={handleInputChange}
                        placeholder="Nhập % giảm giá"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="description">Mô tả sản phẩm</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows="4"
                    value={newProduct.description}
                    onChange={handleInputChange}
                    placeholder="Nhập mô tả sản phẩm"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="category">Thương hiệu</label>
                  <select
                    className="form-control"
                    id="category"
                    name="category"
                    value={newProduct.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Chọn thương hiệu</option>
                    {category.map(cate=>{
                      return(
                        <option value={cate.name}>{cate.name}</option>
                      )
                    })}
                  </select>
                </div>

                <div className="form-group">
                  <label>Kích thước</label>
                  <div className="size-options">
                    {sizes.map((size) => (
                      <div key={size}>
                        <input
                          type="checkbox"
                          id={`size-${size}`}
                          value={size}
                          checked={newProduct.size.includes(size)}
                          onChange={handleSizeChange}
                          className="size-checkbox"
                        />
                        <label
                          htmlFor={`size-${size}`}
                          className="size-label"
                        >
                          {size}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="image">Hình ảnh sản phẩm</label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="image"
                    onChange={handleFileChange}
                    accept="image/*"
                    required
                  />
                  {imagePreview && (
                    <div className="preview-image">
                      <img src={imagePreview} alt="Preview" />
                    </div>
                  )}
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-default"
                    onClick={handleCloseModal}
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Thêm sản phẩm
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProducts;
