import PinDropIcon from "@mui/icons-material/PinDrop";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import PaymentIcon from "@mui/icons-material/Payment";
import "../CSS/ConfirmRide.css";
import { Link } from "react-router-dom";

function ConfirmRide({ closePanel, handlePanels }) {
  return (
    <div className="v-description-panel bg-light p-4 text-dark d-flex flex-column justify-content-center align-items-center">
      <div className="panel-close" onClick={closePanel}></div>
      <h3 className="mt-4">Confirm your ride</h3>
      <img
        src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png"
        alt=""
      />

      <div className="v-locations align-self-start">
        <div className="d-flex align-items-center gap-4">
          <PinDropIcon />
          <div className="d-location-text">
            <h4>562/11-A</h4>
            <p>modern furniture more, khulna</p>
          </div>
        </div>

        <div className="d-flex align-items-center gap-4">
          <MyLocationIcon />
          <div className="d-location-text">
            <h4>Bhangonpar bazar</h4>
            <p>Gouramva Road, Shuvadia, Fakirhat, Bagerhat</p>
          </div>
        </div>

        <div className="d-flex align-items-center gap-4">
          <PaymentIcon />
          <div className="d-location-text border-bottom-0 pb-0">
            <h4>$55.35</h4>
            <p>cash cash</p>
          </div>
        </div>

        <button onClick={handlePanels} className="w-100 rounded mt-4">
          Confirm
        </button>
      </div>
    </div>
  );
}

export default ConfirmRide;
