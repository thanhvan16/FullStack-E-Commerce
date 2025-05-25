import CheckOutItem from "./CheckoutItem";

function Checkout() {
  return (
    <>
      <div className="container my-3 py-3">
        <h1 className="text-center fw-bold display-5 mb-4">Thanh toán</h1>
        <hr className="mb-4" />
        <CheckOutItem></CheckOutItem>
      </div>
    </>
  );
}
export default Checkout;
