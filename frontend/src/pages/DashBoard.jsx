import { useRef, useState } from "react";
import "../CSS/UserDashboard.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SearchLocationPanel from "../components/SearchLocationPanel";
import PersonIcon from "@mui/icons-material/Person";
import ChooseVehicle from "../components/ChooseVehicle";

const DashBoard = () => {
  const [showPanel, setShowPanel] = useState(false);
  const [showVehiclePanel, setShowVehiclePanel] = useState(false);

  const pickUpRef = useRef();
  const destinationRef = useRef();
  const vehiclePanelRef = useRef();

  const locationSearchBodyRef = useRef();
  const resultPanelRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const topSearchPanel = () => {
    setShowPanel(true);
  };

  useGSAP(() => {
    if (showPanel) {
      gsap.to(resultPanelRef.current, {
        height: "70%",
      });

      gsap.to(locationSearchBodyRef.current, {
        borderRadius: 0,
      });
    } else {
      gsap.to(resultPanelRef.current, {
        height: "0%",
      });
      gsap.to(locationSearchBodyRef.current, {
        borderRadius: "25px 25px 0 0;",
      });
    }

    if (showVehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(0%)",
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [showPanel, showVehiclePanel]);

  return (
    <div className="user-dashboard">
      <img
        src="https://www.smartsheet.com/sites/default/files/2022-02/Uber_logo_2018_4.svg"
        alt="uber logo"
        className="logo user-dashboard-logo"
      />
      <div className="user-map w-100 h-100">
        <img
          src="https://simonpan.com/wp-content/themes/sp_portfolio/assets/uber-challenge.jpg"
          alt=""
          className="w-100 h-100 object-fit-cover"
        />
      </div>

      <div className="find-trip w-100 h-100">
        <div ref={locationSearchBodyRef} className="location-search bg-body">
          {showPanel ? (
            <KeyboardArrowDownIcon onClick={() => setShowPanel(false)} />
          ) : (
            <h4 className="text-dark">Find a trip</h4>
          )}
          <form className="mt-2" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Add a pick-up location"
              className="mb-3"
              ref={pickUpRef}
              onClick={topSearchPanel}
            />

            <input
              type="text"
              placeholder="Enter your destination"
              ref={destinationRef}
              onClick={topSearchPanel}
            />
          </form>
        </div>

        <div className="search-result-panel" ref={resultPanelRef}>
          <SearchLocationPanel vehiclePanel={() => setShowVehiclePanel(true)} />
        </div>
      </div>

      <div className="vehicle-panel" ref={vehiclePanelRef}>
        <center className="mt-2 mb-4">
          <div
            className="vehicle-panel-close"
            onClick={() => setShowVehiclePanel(false)}
          ></div>
        </center>

        <div className="choose-vehicle">
          <h4>Choose a vehicle</h4>
          <ChooseVehicle/>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
