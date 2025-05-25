import "./admin.js"
import SideBarAdmin from "../components/SideBarAdmin";
import { Outlet } from "react-router-dom";
function Admin() {
  return (
    <div className="container-fluid">
    {/* NavBar */}
    <div className="row">
      {/* Sidebar (3 parts) */}
      <div className="col-2">
        <SideBarAdmin />
      </div>
      {/* Main content (9 parts) */}
      <div className="col-10">
        <div>
          <Outlet></Outlet> 
        </div>
      </div>
    </div>
  </div>
  );
}
export default Admin;
