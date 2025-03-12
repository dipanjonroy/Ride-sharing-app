import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userRegister } from "../features/APICall/userSlice";

export default function UserSignUp() {
  const { register} = useSelector((store) => store.user);
  const { success } = register.response;

  const disPatch = useDispatch();

  const navigate = useNavigate();

  const fnameRef = useRef();
  const lnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const userInfo = {
      firstname: fnameRef.current.value,
      lastname: lnameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    disPatch(userRegister(userInfo));

    if (error) {
      fnameRef.current.value = "";
      lnameRef.current.value = "";
      emailRef.current.value = "";
      passwordRef.current.value = "";
    }
  };

  useEffect(() => {
    if (success) {
      navigate("/login");
    }
  }, [success, navigate]);

  return (
    <div>
      <div className="vh-100 p-4 d-flex flex-column justify-content-between">
        <div>
          <Link to="/">
            <img
              className="logo mb-5"
              src="https://www.smartsheet.com/sites/default/files/2022-02/Uber_logo_2018_4.svg"
              alt="Uber Logo"
            />
          </Link>

          <form className="needs-validation" onSubmit={handleSubmit} noValidate>
            <h3 className="text-dark fs-6 fw-semibold">Your Fullname</h3>
            <div className="d-flex gap-3 mb-4">
              <div>
                <input
                  type="text"
                  placeholder="firstname"
                  id="firstname"
                  className="rounded w-100 px-3 py-2"
                  name="firstname"
                  ref={fnameRef}
                  required
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="lastname"
                  id="lastname"
                  className="rounded w-100 px-3 py-2"
                  name="lastname"
                  ref={lnameRef}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="fw-medium text-dark fs-6">
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
              <label htmlFor="password" className="fw-medium text-dark fs-6">
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
              Create account
            </button>
          </form>

          <p className="text-center mt-2 fw-semibold">
            Already have an account?{" "}
            <Link to="/login" className="text-decoration-none">
              Login here
            </Link>
          </p>
        </div>

        <div>
          <p
            className="footer-para text-dark fw-medium"
            style={{ fontSize: "0.7rem", lineHeight: "0.9rem" }}
          >
            By proceeding, you consent to get calls, WhatsApp or SMS messgaes,
            including by automated means, from Uber and its affiliates to the
            number provided.
          </p>
        </div>
      </div>
    </div>
  );
}
