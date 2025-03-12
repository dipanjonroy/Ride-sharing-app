import LogoutIcon from "@mui/icons-material/Logout";
import "../CSS/CaptainDashboard.css";
import CaptainDetails from "../components/CaptainDetails";
import CaptainPopUp from "../components/CaptainPopUp";
import { useContext, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import PassengerDetails from "../components/PassengerDetails";
import SubmitOtp from "../components/SubmitOtp";
import FinsihRide from "../components/FinshRide";
import { useDispatch, useSelector } from "react-redux";
import { socketContext } from "../context/socketContext";
import { captainProfile } from "../features/APICall/captainSlice";

function CaptainDashboard() {
   const [popUp, setPopUp] = useState(false);
  const [passengerInfo, setPassengerInfo] = useState(false);
  const [otpPanel, setOtpPanel] = useState(false);
  const [finishRidePanel, setFinishRidePanel] = useState(false);

  const notificationRef = useRef();
  const passengerInfoRef = useRef();
  const otpPageRef = useRef();
  const finishRideRef = useRef();

  const dispatch = useDispatch()

  const { profile } = useSelector((store) => store.captain);

  const captain = profile.response.profile;

  const {socket} = useContext(socketContext);

  useEffect(()=>{
    socket.emit("join", {userId: captain?._id, userType: "captain"})
  },[captain])

  const handlePassengerPanel = () => {
    setPassengerInfo(true);
    setPopUp(false);
  };

  const handleOtpPanel = () => {
    setOtpPanel(true);
    setPassengerInfo(false);
  };

  useGSAP(() => {
    if (popUp) {
      gsap.to(notificationRef.current, {
        transform: "translateY(0%)",
      });
    } else {
      gsap.to(notificationRef.current, {
        transform: "translateY(100%)",
      });
    }

    if (passengerInfo) {
      gsap.to(passengerInfoRef.current, {
        transform: "translateY(0%)",
      });
    } else {
      gsap.to(passengerInfoRef.current, {
        transform: "translateY(100%)",
      });
    }

    if (otpPanel) {
      gsap.to(otpPageRef.current, {
        transform: "translateY(0%)",
      });
    } else {
      gsap.to(otpPageRef.current, {
        transform: "translateY(100%)",
      });
    }

    if (finishRidePanel) {
      gsap.to(finishRideRef.current, {
        transform: "translateY(0%)",
      });
    } else {
      gsap.to(finishRideRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [popUp, passengerInfo, otpPanel, finishRidePanel]);

  return (
    <div className="vw-100 vh-100 position-relative overflow-hidden">
      <div className="captain-nav p-3 d-flex justify-content-between align-items-center text-dark">
        <img
          src="https://www.smartsheet.com/sites/default/files/2022-02/Uber_logo_2018_4.svg"
          alt=""
          className="brand w-25"
        />
        <button className="border-0 p-2 rounded-5 bg-body">
          <LogoutIcon />
        </button>
      </div>

      <div className="cap-map w-100 h-100">
        <img
          src="https://simonpan.com/wp-content/themes/sp_portfolio/assets/uber-challenge.jpg"
          alt=""
          className="w-100 h-100 object-fit-cover"
        />
      </div>

      <div className="captain-details position-absolute bottom-0 w-100">
        <CaptainDetails />
      </div>

      <div
        className="notification position-absolute bottom-0 w-100"
        ref={notificationRef}
      >
        <CaptainPopUp
          closePanel={() => setPopUp(false)}
          handlePanel={handlePassengerPanel}
        />
      </div>

      <div
        className="passenger-info position-absolute bottom-0 w-100"
        ref={passengerInfoRef}
      >
        <PassengerDetails
          closePanel={() => setPassengerInfo(false)}
          handlePanel={handleOtpPanel}
        />
      </div>

      <div
        className="otp-panel position-absolute bottom-0 w-100"
        ref={otpPageRef}
      >
        <SubmitOtp closePanel={() => setOtpPanel(false)} />
      </div>

      <div
        className="finish-ride position-absolute bottom-0 w-100"
        ref={finishRideRef}
      >
        <FinsihRide closePanel={() => setFinishRidePanel(false)} />
      </div>
    </div>
  );
}

export default CaptainDashboard;
