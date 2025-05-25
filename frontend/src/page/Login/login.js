import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import SummaryApi from "../../common";
import { toast } from "react-toastify";
import Context from "../../context";
import { jwtDecode } from "jwt-decode";
function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const { fetchUserDetails } = useContext(Context);
  const { fetchUserAddToCart } = useContext(Context);

  const handleOnchange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataResponse = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dataApi = await dataResponse.json();
    console.log("datalogin", dataApi);
    if (dataApi.success) {
      toast.success(dataApi.message);
      const decoded = jwtDecode(dataApi.data); // dataApi.data là token
      console.log("decoded user:", decoded); // kiểm tra thông tin

      // Lưu vào redux store
      //  dispatch(setUserDetails(decoded)); // Lưu _id, email, role từ token
      // Chuyển hướng theo role
      if (decoded.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
      fetchUserDetails();
      fetchUserAddToCart();
    }
    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };
  return (
    <>
      <div className="container my-3 py-3">
        <h1 className="text-center">Đăng nhập</h1>
        <hr />
        <div class="row my-4 h-100 ">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto ">
            <form onSubmit={handleSubmit}>
              <div class="my-3">
                <label for="display-4">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="floatingInput"
                  placeholder="thanh@gmail.com"
                  name="email"
                  value={data.email}
                  onChange={handleOnchange}
                />
              </div>
              <div class="my-3">
                <label for="floatingPassword display-4">Mật khẩu</label>
                <input
                  type="password"
                  class="form-control"
                  id="floatingPassword"
                  placeholder="12345678"
                  name="password"
                  value={data.password}
                  onChange={handleOnchange}
                />
              </div>
              <div className="my-3">
                <p>
                  Bạn chưa có tài khoản?{" "}
                  <NavLink
                    to="/register"
                    className="text-decoration-underline text-info"
                  >
                    Đăng kí
                  </NavLink>{" "}
                </p>
              </div>
              <div className="text-center">
                <button class="my-2 mx-auto btn btn-danger " type="submit">
                  Đăng nhập
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
