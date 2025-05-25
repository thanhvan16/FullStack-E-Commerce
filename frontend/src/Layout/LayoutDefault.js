import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Outlet } from "react-router-dom";
function LayoutDefault(){
    return(
        <>
           
           <Navbar></Navbar>
        
           
            <Outlet></Outlet>
        
            
            <Footer></Footer>
            
        </>
    )
}export default LayoutDefault;