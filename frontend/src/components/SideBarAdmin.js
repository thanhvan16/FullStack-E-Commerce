import { NavLink } from "react-router-dom";
import "../Admin/admin.css";
import { useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function SideBarAdmin() {
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    const dataResponse = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });
    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate("/");
      dispatch(setUserDetails(dataApi.data));
    }
    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };
  return (
    <>
      <>
        <div className="sidebar" id="mySidebar">
          <div className="side-header">
            <img
              src="https://th.bing.com/th/id/OIP.SkI6J0FIhZBY8vnNjTCzZgHaEo?rs=1&pid=ImgDetMain"
              width="120"
              height="120"
              alt="Swiss Collection"
            />
            <h5 style={{ marginTop: "10px" }}>{user?.name}</h5>
          </div>

          <div className="side-list">
            <ul>
              <li>
                <NavLink to="" className="sidebar-link">
                  <i className="fa fa-chart-column"></i>Thống kê
                </NavLink>
              </li>

              <li>
                <NavLink to="users" className="sidebar-link">
                  <i className="fa fa-users"></i> Tài khoản 
                </NavLink>
              </li>
              <li>
                <NavLink to="category" className="sidebar-link">
                  <i className="fa fa-tag"></i> Thương hiệu
                </NavLink>
              </li>
              <li>
                <NavLink to="productsAdmin" className="sidebar-link">
                  <i className="fa fa-shirt"></i> Sản phẩm
                </NavLink>
              </li>
              <li>
                <NavLink to="orders" className="sidebar-link">
                  <i className="fa fa-truck"></i> Đơn hàng
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/"
                  className="sidebar-link"
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  <i className="fa fa-right-from-bracket text-danger"></i> <span className="text-danger">Đăng xuất</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </>
    </>
  );
}

export default SideBarAdmin;
