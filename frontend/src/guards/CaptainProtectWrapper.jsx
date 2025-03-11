import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { captainProfile } from "../features/APICall/captainSlice";

function CaptainProtect({ children }) {
  const token = Cookies.get("captainToken");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      dispatch(captainProfile())
      navigate("/captain-dashboard");
    } else {
      navigate("/captain-login");
    }
  }, [token, dispatch, navigate]);

  return <>{children}</>;
}

export default CaptainProtect;
