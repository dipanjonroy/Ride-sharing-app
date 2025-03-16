import "../CSS/Riding.css";
import GradeIcon from "@mui/icons-material/Grade";
import PaymentIcon from "@mui/icons-material/Payment";
import PinDropIcon from "@mui/icons-material/PinDrop";
import HomeIcon from "@mui/icons-material/Home";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import LiveTracking from "../components/LiveTracking";

function Riding() {
  const location = useLocation();

  const ride = location.state?.ride;


  return (
    <div className="vw-100 vh-100 position-relative text-dark overflow-hidden">
      <Link to="/dashboard" className="home-icon text-dark">
        <HomeIcon />
      </Link>
      <div className="riding-map">
        <LiveTracking/>
      </div>
      <div className="w-100 px-3 riding-details">
        <div className="d-flex justify-content-between w-100 mt-3">
          <div className="payment-car">
            <img
              src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png"
              alt=""
            />
          </div>

          <div className="drive-details text-dark">
            <h4>{ride?.captain.fullname.firstname}</h4>
            <h3>{ride?.captain.vehicle.numberplate}</h3>
          </div>
        </div>

        <div>
          <div className="d-flex align-items-center gap-4 border-bottom">
            <PinDropIcon />
            <div className="d-location-text border-0">
              <h4 className="m-0 text-uppercase">562/11-A</h4>
              <p className="m-0 text-capitalize text-muted">
                {ride?.pickup}
              </p>
            </div>
          </div>

          <div className="d-flex align-items-center gap-4">
            <PaymentIcon />
            <div className="d-location-text border-bottom-0 pb-0">
              <h4 className="m-0 text-uppercase">${ride?.fare}</h4>
              <p className="m-0 text-capitalize text-muted">cash cash</p>
            </div>
          </div>
        </div>

        <button className="payment-btn w-100 rounded mt-3">Make a Payment</button>
      </div>
    </div>
  );
}

export default Riding;
