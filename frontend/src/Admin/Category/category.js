import { useState, useEffect } from "react";
import AddCategory from "./Addcategory";
import SummaryApi from "../../common";
import { toast } from "react-toastify";
import "../../Css/category.css";

function Category() {
  const [category, setCategory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddCategory = () => {
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Xóa danh mục
  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa danh mục này không?"))
      return;
    const dataResponse = await fetch(SummaryApi.deleteCategoy.url, {
      method: SummaryApi.deleteCategoy.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        categoryId: id,
      }),
    });
    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      toast.success(dataApi.message);
      fetchAllCategory();
    }
    if (dataApi.error) {
      toast.error(dataApi.message);
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
    <div className="category-container">
      <div className="category-header">
        <h2>Quản lý thương hiệu</h2>
        <button className="add-button" onClick={handleAddCategory}>
          <i className="fas fa-plus"></i> Thêm thương hiệu
        </button>
      </div>

      <div className="table-container">
        <table className="category-table">
          <thead>
            <tr>
              <th>Thương hiệu</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {category.length > 0 ? (
              category.map((cate) => (
                <tr key={cate._id}>
                  <td>{cate.name}</td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteCategory(cate._id)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="no-data">
                  <i className="fas fa-inbox"></i>
                  <p>Không có thương hiệu nào</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AddCategory
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        fetchAllCategory={fetchAllCategory}
      />
    </div>
  );
}

export default Category;
