import { Link, useNavigate } from "react-router-dom";
import "../CSS/UserLogIn.css";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../features/APICall/userSlice";

export default function UserLogIn() {
  const { login } = useSelector((store) => store.user);
 
  const { success } = login.response;

  const disPatch = useDispatch();

  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleLogin = (e) => {
    e.preventDefault();

    const loginInfo = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    disPatch(userLogin(loginInfo));
  };

  useEffect(() => {
    if (success) {
      navigate("/dashboard");
    }
  }, [success, navigate]);

  return (
    <div className="vh-100 p-4 d-flex flex-column justify-content-between">
      <div>
        <Link to="/">
          <img
            className="logo mb-5"
            src="https://www.smartsheet.com/sites/default/files/2022-02/Uber_logo_2018_4.svg"
            alt="Uber Logo"
          />
        </Link>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="fw-medium text-dark">
              Enter Email:
            </label>
            <br />
            <input
              type="email"
              placeholder="email@example.com"
              id="email"
              className="rounded w-100 px-3 py-2"
              name="email"
              ref={emailRef}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="fw-medium text-dark">
              Enter password:
            </label>
            <br />
            <input
              className="rounded w-100 px-3 py-2 "
              type="password"
              placeholder="your password"
              id="password"
              name="password"
              ref={passwordRef}
              required
            />
          </div>

          <button className="bg-dark text-white border-0 w-100 py-2 rounded fw-medium mt-2">
            Log in
          </button>
        </form>

        <p className="text-center mt-2 fw-semibold">
          New here?{" "}
          <Link to="/signup" className="text-decoration-none">
            Create new account
          </Link>
        </p>
      </div>

      <div>
        <Link
          to="/captain-login"
          className="text-white border-0 w-100 py-2 rounded fw-medium mt-4 captain-signin-btn mb-5 d-inline-block text-center text-decoration-none"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
}
