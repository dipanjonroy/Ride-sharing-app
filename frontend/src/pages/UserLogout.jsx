import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
