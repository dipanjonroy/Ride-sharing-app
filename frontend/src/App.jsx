import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserLogIn from "./pages/UserLogin";
import UserSignUp from "./pages/UserSignUp";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignUp from "./pages/CaptainSignUp";
import DashBoard from "./pages/DashBoard";
import UserLogout from "./pages/UserLogout";
import Error from "./pages/Error";
import UserProtecttor from "./guards/UserProtectWrapper";
import CaptainDashboard from "./pages/CaptainDashboard";
import CaptainProtect from "./guards/CaptainProtectWrapper";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <UserProtecttor>
              <UserLogIn />
            </UserProtecttor>
          }
        />

        <Route path="/signup" element={<UserSignUp />} />

        <Route
          path="/captain-login"
          element={
            <CaptainProtect>
              <CaptainLogin />
            </CaptainProtect>
          }
        />

        <Route path="/captain-signup" element={<CaptainSignUp />} />

        <Route
          path="/dashboard"
          element={
            <UserProtecttor>
              <DashBoard />
            </UserProtecttor>
          }
        />
        <Route
          path="/captain-dashboard"
          element={
            <CaptainProtect>
              <CaptainDashboard />
            </CaptainProtect>
          }
        />
      </Routes>
    </div>
  );
}
