import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { captainRegister } from "../features/APICall/captainSlice";

export default function CaptainSignUp() {
  const { response } = useSelector((store) => store.captain);

  const { success } = response;

  const disPatch = useDispatch();

  const navigate = useNavigate();

  const fnameRef = useRef();
  const lnameRef = useRef();
  const emailRef = useRef();
  const vehicleTypeRef = useRef();
  const vehicleNoRef = useRef();
  const vehicleColorRef = useRef();
  const passwordRef = useRef();
  const vehicleCapacityRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const captainInfo = {
      firstname: fnameRef.current.value,
      lastname: lnameRef.current.value,
      email: emailRef.current.value,
      color: vehicleColorRef.current.value,
      type: vehicleTypeRef.current.value,
      capacity: vehicleCapacityRef.current.value,
      numberplate: vehicleNoRef.current.value,
      password: passwordRef.current.value,
    };

    disPatch(captainRegister(captainInfo));
  };

  useEffect(() => {
    if (success) {
      navigate("/captain-login");
    }
  }, [success, navigate]);

  return (
    <div>
      <div className="vh-100 p-4 d-flex flex-column justify-content-between">
        <div>
          <Link to="/">
            <img
              className="logo mb-4"
              src="https://www.smartsheet.com/sites/default/files/2022-02/Uber_logo_2018_4.svg"
              alt="Uber Logo"
            />
          </Link>
          <form onSubmit={handleSubmit}>
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

            <div className="mb-4 ">
              <h5 className="border-bottom mb-3">Vehicle Information</h5>
              <div className="d-flex gap-3">
                <div className="w-50">
                  <label
                    htmlFor="vehicleType"
                    className="fw-medium text-dark fs-6"
                  >
                    Type:
                  </label>
                  <br />
                  <select
                    name="vehicleType"
                    id="vehicleType"
                    className="p-2 rounded border-secondary-subtle w-100"
                    ref={vehicleTypeRef}
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="car">Car</option>
                    <option value="bike">Bike</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>

                <div className="w-50">
                  <label
                    htmlFor="numberplate"
                    className="fw-medium text-dark fs-6"
                  >
                    Car No:
                  </label>
                  <br />
                  <input
                    type="text"
                    placeholder="car no"
                    id="numberplate"
                    className="rounded w-100 px-3 py-2"
                    name="numberplate"
                    ref={vehicleNoRef}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mb-4 ">
              <div className="d-flex gap-3">
                <div>
                  <label
                    htmlFor="capacity"
                    className="fw-medium text-dark fs-6"
                  >
                    Car capacity:
                  </label>
                  <br />
                  <input
                    type="text"
                    placeholder="car no"
                    id="capacity"
                    className="rounded w-100 px-3 py-2"
                    name="capacity"
                    ref={vehicleCapacityRef}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="color" className="fw-medium text-dark fs-6">
                    Car Color::
                  </label>
                  <br />
                  <input
                    type="text"
                    placeholder="color"
                    id="color"
                    className="rounded w-100 px-3 py-2"
                    name="color"
                    ref={vehicleColorRef}
                    required
                  />
                </div>
              </div>
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
              Sign Up
            </button>
          </form>

          <p className="text-center mt-2 fw-semibold">
            Already are a captain?
            <Link to="/captain-login" className="text-decoration-none">
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
