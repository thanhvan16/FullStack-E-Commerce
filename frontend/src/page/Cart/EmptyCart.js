import { NavLink } from "react-router-dom";
function EmptyCart() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">Không có sản phẩm nào trong giỏ hàng!</h4>
            <NavLink to="/products" className="btn  btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Tiếp tục mua hàng
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
export default EmptyCart;
