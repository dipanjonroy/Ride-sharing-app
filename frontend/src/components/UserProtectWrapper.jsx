import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userProfile } from "../features/APICall/userSlice";

function UserProtecttor({ children }) {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      dispatch(userProfile(token));
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [token, dispatch, navigate]);

  return <>{children}</>;
}

export default UserProtecttor;
