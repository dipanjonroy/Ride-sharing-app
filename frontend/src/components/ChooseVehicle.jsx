import PersonIcon from "@mui/icons-material/Person";
import "../CSS/ChooseVehicle.css";

function ChooseVehicle({ showDesPanle }) {
  return (
    <div className="overflow-auto">
      <div
        className="vehicle d-flex align-items-center justify-content-between text-dark"
        onClick={showDesPanle}
      >
        <img
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_538/v1568070443/assets/82/6bf372-6016-492d-b20d-d81878a14752/original/Black.png"
          alt=""
        />
        <div className="vehicle-info">
          <div className="vehicle-type d-flex gap-3">
            <h4 className="m-0 ">UberGo</h4>
            <span className="d-flex align-items-center gap-1">
              <PersonIcon /> 4
            </span>
          </div>
          <p className="away-time d-flex gap-2">
            2 mins away
            <span>
              <li>15.35</li>
            </span>
          </p>
          <p className="vehicle-condition">Affordable, compact rides</p>
        </div>

        <h3 className="align-self-start price">$10.24</h3>
      </div>

      <div
        className="vehicle d-flex align-items-center justify-content-between text-dark"
        onClick={showDesPanle}
      >
        <img
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
          alt=""
        />
        <div className="vehicle-info">
          <div className="vehicle-type d-flex gap-3">
            <h4 className="m-0 ">UberMoto</h4>
            <span className="d-flex align-items-center gap-1">
              <PersonIcon /> 1
            </span>
          </div>
          <p className="away-time d-flex gap-2">
            15 mins away
            <span>
              55.35
            </span>
          </p>
          <p className="vehicle-condition">Affordable, compact rides</p>
        </div>

        <h3 className="align-self-start price">$09.24</h3>
      </div>
      <div
        className="vehicle d-flex align-items-center justify-content-between text-dark"
        onClick={showDesPanle}
      >
        <img
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
          alt=""
        />
        <div className="vehicle-info">
          <div className="vehicle-type d-flex gap-3">
            <h4 className="m-0 ">UberAuto</h4>
            <span className="d-flex align-items-center gap-1">
              <PersonIcon /> 2
            </span>
          </div>
          <p className="away-time d-flex gap-2">
            7 mins away
            <span>
              <li>20.35</li>
            </span>
          </p>
          <p className="vehicle-condition">Affordable, compact rides</p>
        </div>

        <h3 className="align-self-start price">$5.25</h3>
      </div>
    </div>
  );
}

export default ChooseVehicle;
