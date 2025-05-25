import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import SummaryApi from "../../common";
import { toast } from 'react-toastify';
function Register() {
  const navigate=useNavigate()
  const [data,setData]=useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:""
  })
  const handleOnchange=(e)=>{
    const {name,value}=e.target;
    setData((pre)=>{
      return{
        ...pre,
        [name]:value
      
    }
  }
    )
  }
  console.log(data)
  const handleSubmit= async(e)=>{
    e.preventDefault();
    if(data.confirmPassword===data.password){
      const dataResponse= await fetch(SummaryApi.signUp.url,{
        method: SummaryApi.signUp.method,
        headers:{
          "content-type": "application/json"
        },
        body : JSON.stringify(data)
      })
      const dataApi = await dataResponse.json();
      console.log(dataApi)
      if(dataApi.success){
        toast.success(dataApi.message);
        navigate("/login")
      }
      if(dataApi.error){
        toast.error(dataApi.message);
      }
    }
    else{
       toast.error("Vui lòng kiểm tra lại mật khẩu")
    }
    }
  
  return (
    <>
      <div className="container my-3 py-3">
        <h1 className="text-center">Đăng kí</h1>
        <hr />
        <div class="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
              <div class="form my-3">
                <label for="Name">Họ tên</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  placeholder="VD:Trần Văn Thanh"
                  name="name"
                  value={data.name}
                  onChange={handleOnchange}
                  required
                />
              </div>
              <div class="form my-3">
                <label for="Email">Email </label>
                <input
                  type="email"
                  class="form-control"
                  id="Email"
                  placeholder="VD:thanh@gmail.com"
                  name="email"
                  value={data.email}
                  onChange={handleOnchange}
                  required
                />
              </div>
              <div class="form  my-3">
                <label for="Password">Mật khẩu</label>
                <input
                  type="password"
                  class="form-control"
                  id="Password"
                  placeholder="VD:12345678"
                  name="password"
                  value={data.password}
                  onChange={handleOnchange}
                  required
                />
              </div>
              <div class="form  my-3">
                <label for="Password">Nhập lại mật khẩu</label>
                <input
                  type="password"
                  class="form-control"
                  id="confirmPassword"
                  placeholder=""
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleOnchange}
                  required
                />
              </div>


              <div className="my-3">
                <p>
                  Bạn đã có tài khoản ?{" "}
                  <NavLink
                    to="/login"
                    className="text-decoration-underline text-info"
                  >
                    Đăng nhập
                  </NavLink>{" "}
                </p>
              </div>
              <div className="text-center">
                <button
                  class="my-2 mx-auto btn btn-danger"
                  type="submit"
                >
                  Đăng kí
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Register;
