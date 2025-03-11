import PinDropIcon from "@mui/icons-material/PinDrop";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import PaymentIcon from "@mui/icons-material/Payment";
import "../CSS/ConfirmRide.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function ConfirmRide({ closePanel, handlePanels }) {

  const { pickup, destination, vehicle } = useSelector((store) => store.state);
  const {fare} = useSelector((store)=>store.map);

  const fareData = fare.mapData.fare;

  const vehicleImages = {
    car:"https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_538/v1568070443/assets/82/6bf372-6016-492d-b20d-d81878a14752/original/Black.png",
    bike:"https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png",
    auto:"https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
  }

  return (
    <div className="v-description-panel bg-light p-4 text-dark d-flex flex-column justify-content-center align-items-center">
      <div className="panel-close" onClick={closePanel}></div>
      <h3 className="mt-4">Confirm your ride</h3>
      <img
        src={vehicleImages[vehicle]}
        alt=""
      />

      <div className="v-locations align-self-start">
        <div className="d-flex align-items-center gap-4">
          <PinDropIcon />
          <div className="d-location-text">
            <h4>562/11-A</h4>
            <p>{pickup}</p>
          </div>
        </div>

        <div className="d-flex align-items-center gap-4">
          <MyLocationIcon />
          <div className="d-location-text">
            <h4>562/11-A</h4>
            <p>{destination}</p>
          </div>
        </div>

        <div className="d-flex align-items-center gap-4">
          <PaymentIcon />
          <div className="d-location-text border-bottom-0 pb-0">
            <h4>${fareData[vehicle]}</h4>
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
