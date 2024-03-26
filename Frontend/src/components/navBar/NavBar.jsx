import "./NavBar.css";
import navLogo from "../../assets/images/Econsync.png";

import HomeIcon from "@mui/icons-material/Home";

import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

import { message } from "antd";

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <>
      <div className="navCanvas">
        <div
          onClick={() => {
            navigate("/userProfile");
          }}
          className="navLogo"
        >
          <img src={navLogo} alt="" />
        </div>

        <div className="navRightContainer">
          <div
            className="navElement"
            onClick={() => {
              navigate("/STSList");
            }}
          >
            <HomeIcon fontSize="large" />
            <span className="dashboadNavText">STS LIST</span>
          </div>

          <div
            className="navElement"
            onClick={() => {
              navigate("/landfillList");
            }}
          >
             <span className="firmsNavText">Landfill List</span> 
          </div>

          <div
            className="navButton"
            onClick={() => {
              localStorage.removeItem("token");
                message.success("লগআউট সম্পন্ন হয়েছে");
              navigate("/login");
            }}
          >
            <LogoutIcon fontSize="medium" />
            <span className="logoutNavText">লগআউট</span>
          </div>
        </div>
      </div>
    </>
  );
}