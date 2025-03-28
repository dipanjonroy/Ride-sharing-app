import { useContext, useEffect, useRef, useState } from "react";
import "../CSS/UserDashboard.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SearchLocationPanel from "../components/SearchLocationPanel";
import PersonIcon from "@mui/icons-material/Person";
import ChooseVehicle from "../components/ChooseVehicle";
import ConfirmRide from "../components/ConfirmRide";
import FindDriver from "../components/FindDriver";
import Driverinfo from "../components/DriverInfo";
import MakePayment from "../components/MakePayment";
import { useDispatch, useSelector } from "react-redux";
import { getFare, getSuggestions } from "../features/APICall/mapSlice";
import {
  setActiveField,
  setDestination,
  setPickUp,
} from "../features/State management/stateSlice";
import { socketContext } from "../context/socketContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

const DashBoard = () => {
  const { destination, pickup } = useSelector((store) => store.state);
  const { profile } = useSelector((store) => store.user);
  const { user } = profile.response;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { socket } = useContext(socketContext);

  const [showPanel, setShowPanel] = useState(false);
  const [showVehiclePanel, setShowVehiclePanel] = useState(false);
  const [showConfirmRidePanel, setShowConfirmRidePanel] = useState(false);
  const [showFindDriverPanel, setShowFindDriverPanel] = useState(false);
  const [driverInfoPanel, setDriverInfoPanel] = useState(false);

  const [acceptedRide, setAcceptedRide] = useState(null);

  const vehiclePanelRef = useRef();
  const mapPanelRef = useRef();
  const searchPanelRef = useRef();
  const locationSearchBodyRef = useRef();
  const resultPanelRef = useRef();
  const confirmRideRef = useRef();
  const findDriverRef = useRef();
  const driverInfoRef = useRef();

  const handleAcceptRide = (data) => {
    setDriverInfoPanel(true);
    setAcceptedRide(data);
  };

  const handleConfirmRide = (data) => {
    navigate("/riding", { state: { ride: data } });
  };

  useEffect(() => {
    socket.emit("join", { userId: user?._id, userType: "user" });
  }, [user]);

  useEffect(() => {
    socket.on("accept-ride", handleAcceptRide);
    socket.on("confirm-ride", handleConfirmRide);

    return () => {
      socket.off("accept-ride", handleAcceptRide);
      socket.off("confirm-ride", handleConfirmRide);
    };
  }, []);

  const handlePickupSuggestion = (e) => {
    dispatch(setPickUp(e.target.value));
    dispatch(getSuggestions(e.target.value));
  };

  const handleDestinationSuggestion = (e) => {
    dispatch(setDestination(e.target.value));
    dispatch(getSuggestions(e.target.value));
  };

  const onClickShowVehiclePanel = () => {
    setShowVehiclePanel(true);
    setShowPanel(false);
  };

  const handleConfirmRidePanel = () => {
    setShowConfirmRidePanel(true);
    setShowVehiclePanel(false);
  };

  const handleFindDriverPanel = () => {
    setShowFindDriverPanel(true);
    setShowConfirmRidePanel(false);
  };

  useGSAP(()=>{
    if (showPanel) {
      gsap.to(resultPanelRef.current, {
        height: "70%",
      });

      gsap.to(locationSearchBodyRef.current, {
        borderRadius: 0,
        height: "30%"
      });

      gsap.to(mapPanelRef.current, {
        height: "100%",
      });

      gsap.to(searchPanelRef.current, {
        height: "100%",
      });
    } else {
      gsap.to(resultPanelRef.current, {
        height: "0%",
      });
      gsap.to(locationSearchBodyRef.current, {
        borderRadius: "20px 20px 0 0",
        height: "100%",
      });
      gsap.to(mapPanelRef.current, {
        height: "70%",
      });
      gsap.to(searchPanelRef.current, {
        height: "30%",
      });
    }
  },[showPanel])

  useGSAP(() => {
    

    if (showVehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(0%)",
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(100%)",
      });
    }

    if (showConfirmRidePanel) {
      gsap.to(confirmRideRef.current, {
        transform: "translateY(0%)",
      });
    } else {
      gsap.to(confirmRideRef.current, {
        transform: "translateY(100%)",
      });
    }

    if (showFindDriverPanel) {
      gsap.to(findDriverRef.current, {
        transform: "translateY(0%)",
      });
    } else {
      gsap.to(findDriverRef.current, {
        transform: "translateY(100%)",
      });
    }

    if (driverInfoPanel) {
      gsap.to(driverInfoRef.current, {
        transform: "translateY(0%)",
      });
    } else {
      gsap.to(driverInfoRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [
    ,
    showVehiclePanel,
    showConfirmRidePanel,
    showFindDriverPanel,
    driverInfoPanel,
  ]);

  return (
    <div className="user-dashboard overflow-hidden">
      <img
        src="https://www.smartsheet.com/sites/default/files/2022-02/Uber_logo_2018_4.svg"
        alt="uber logo"
        className="logo user-dashboard-logo"
      />
      <div className="user-map w-100" ref={mapPanelRef}>
        {/* <img
          src="https://simonpan.com/wp-content/themes/sp_portfolio/assets/uber-challenge.jpg"
          alt=""
          className="w-100 h-100 object-fit-cover"
        /> */}
        <LiveTracking />
      </div>

      <div ref={searchPanelRef} className="find-trip w-100">
        <div ref={locationSearchBodyRef} className="location-search bg-body">
          {showPanel ? (
            <KeyboardArrowDownIcon onClick={() => setShowPanel(false)} />
          ) : (
            <h4 className="text-dark">Find a trip</h4>
          )}
          <form
            className="mt-2"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              type="text"
              placeholder="Add a pick-up location"
              className="mb-3"
              value={pickup}
              onChange={handlePickupSuggestion}
              onClick={() => {
                setShowPanel(true);
                dispatch(setActiveField("pickup"));
              }}
            />

            <input
              type="text"
              placeholder="Enter your destination"
              onChange={handleDestinationSuggestion}
              value={destination}
              onClick={() => {
                setShowPanel(true);
                dispatch(setActiveField("destination"));
              }}
            />
          </form>
        </div>

        <div className="search-result-panel" ref={resultPanelRef}>
          <SearchLocationPanel vehiclePanel={onClickShowVehiclePanel} />
        </div>
      </div>

      <div className="vehicle-panel" ref={vehiclePanelRef}>
        <center className="mt-2 mb-4">
          <div
            className="panel-close"
            onClick={() => setShowVehiclePanel(false)}
          ></div>
        </center>

        <div className="choose-vehicle">
          <h4>Choose a vehicle</h4>
          <ChooseVehicle showDesPanle={handleConfirmRidePanel} />
        </div>
      </div>

      <div
        className="confirm-ride position-absolute bottom-0"
        ref={confirmRideRef}
      >
        <ConfirmRide
          closePanel={() => setShowConfirmRidePanel(false)}
          handlePanels={handleFindDriverPanel}
        />
      </div>

      <div
        className="find-driver position-absolute bottom-0"
        ref={findDriverRef}
      >
        <FindDriver closePanel={() => setShowFindDriverPanel(false)} />
      </div>

      <div
        className="driver-info position-absolute bottom-0 w-100"
        ref={driverInfoRef}
      >
        <Driverinfo
          closePanel={() => setDriverInfoPanel(false)}
          ride={acceptedRide}
        />
      </div>
    </div>
  );
};

export default DashBoard;
