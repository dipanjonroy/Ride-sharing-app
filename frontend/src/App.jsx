import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserLogIn from "./pages/UserLogin";
import UserSignUp from "./pages/UserSignUp";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignUp from "./pages/CaptainSignUp";
import Profile from "./pages/Profile";
import UserProtectWrapper from "./components/UserProtectWrapper";
import UserLogout from "./pages/UserLogout";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<UserLogIn />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignUp />} />
        <Route path="/profile" element={<UserProtectWrapper><Profile /></UserProtectWrapper>} />
        <Route path="/user/logout" element={<UserProtectWrapper><UserLogout/></UserProtectWrapper>} />
      </Routes>
    </div>
  );
}
