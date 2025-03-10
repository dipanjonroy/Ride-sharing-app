import PinDropIcon from "@mui/icons-material/PinDrop";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { useRef, useState } from "react";

function SubmitOtp({ closePanel }) {
  const otpRef = useRef();

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    const otp = otpRef.current.value;
  };

  return (
    <div className="vh-100 bg-body py-4 text-dark">
      <div className="px-3 passenger-area">
        <div className="d-flex justify-content-between align-items-center">
          <div className="captain-profile d-flex align-items-center gap-3">
            <img
              src="https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww"
              alt=""
            />

            <div className="captain-name">
              <h3>Milon roy</h3>
              <p>ApplePay</p>
            </div>
          </div>

          <div className="captain-earning text-end">
            <h3>$325.00</h3>
            <p>2.2 km</p>
          </div>
        </div>
      </div>

      <div className="border-top mt-3 px-3">
        <div className="d-flex align-items-center gap-3 py-3">
          <PinDropIcon />
          <div className="passenger-location">
            <h4>562/11-A</h4>
            <p>modern furniture more, khulna</p>
          </div>
        </div>

        <div className="d-flex align-items-center gap-3 py-3 border-top">
          <MyLocationIcon />
          <div className="passenger-location">
            <h4>Bhangonpar bazar</h4>
            <p>Gouramva Road, Shuvadia, Fakirhat, Bagerhat</p>
          </div>
        </div>
      </div>

      <div className="otp-area p-3 border-top mt-2">
        <form onSubmit={handleOtpSubmit}>
          <input type="text" ref={otpRef} />
          <div className="text-end px-3 mt-4">
            <button className="pop-up-button rounded" onClick={closePanel}>
              Cancel
            </button>
            <button
              className="accept-btn pop-up-button rounded ms-3"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SubmitOtp;
