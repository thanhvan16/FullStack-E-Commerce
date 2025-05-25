import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SummaryApi from "../../common";
import { toast } from "react-toastify";
import "../../Css/AddCategory.css";

function AddCategory({ isModalOpen, handleCloseModal, fetchAllCategory }) {
  const navigate = useNavigate();
  const [newCategory, setNewCategory] = useState({
    name: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const dataResponse = await fetch(SummaryApi.addCategory.url, {
        method: SummaryApi.addCategory.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory),
      });
      const dataApi = await dataResponse.json();
      if (dataApi.success) {
        toast.success(dataApi?.message);
        setNewCategory({ name: "" });
        fetchAllCategory();
        handleCloseModal();
      }
      if (dataApi.error) {
        toast.error(dataApi?.message);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra. Vui lòng thử lại!");
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-content">
          <div className="modal-header">
            <h4>Thêm Thương hiệu Mới</h4>
            <button className="close-button" onClick={handleCloseModal}>
              ×
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleAddCategory}>
              <div className="form-group">
                <label htmlFor="name">Tên thương hiệu</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newCategory.name}
                  onChange={handleInputChange}
                  placeholder="Nhập tên danh mục"
                  required
                />
              </div>
              <div className="button-group">
                <button type="button" className="cancel-button" onClick={handleCloseModal}>
                  Hủy
                </button>
                <button type="submit" className="submit-button">
                  Thêm 
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCategory;