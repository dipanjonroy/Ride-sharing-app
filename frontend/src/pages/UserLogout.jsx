import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/user/userLogOutSlice";

const UserLogout = () => {
  const disPatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    disPatch(logout());
    navigate("/login")
  },[])
  return (
    <div>
      <button></button>
    </div>
  );
};

export default UserLogout;
