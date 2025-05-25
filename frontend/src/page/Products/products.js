import ProductList from "./ProductList";
import "./Products.css";

function Products() {
  return (
    <div className="products-page">
      <div className="container py-5">
        <div className="row">
          <div className="col-12 mb-4">
            <h2 className="display-5 text-center fw-bold">Sản Phẩm</h2>
            <div className="text-center">
              <div className="heading-line mx-auto"></div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <ProductList />
        </div>
      </div>
    </div>
  );
}

export default Products;
