import PinDropIcon from "@mui/icons-material/PinDrop";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { getAcceptedRide } from "../features/APICall/rideSlice";

function PassengerDetails({ closePanel, handlePanel, ride }) {
  const dispatch = useDispatch();

  const acceptRide = () => {
    dispatch(getAcceptedRide({rideId: ride?._id}));
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
              <h3>{ride?.user.firstname + " " + ride?.user.lastname}</h3>
              <p>ApplePay</p>
            </div>
          </div>

          <div className="captain-earning text-end">
            <h3>${ride?.fare}</h3>
            <p>2.2 km</p>
          </div>
        </div>
      </div>

      <div className="border-top mt-3 px-3">
        <div className="d-flex align-items-center gap-3 py-3">
          <PinDropIcon />
          <div className="passenger-location">
            <h4>562/11-A</h4>
            <p>{ride?.pickup}</p>
          </div>
        </div>

        <div className="d-flex align-items-center gap-3 py-3 border-top">
          <MyLocationIcon />
          <div className="passenger-location">
            <h4>562/11-A</h4>
            <p>{ride?.destination}</p>
          </div>
        </div>
      </div>

      <div className="passenger-des p-3 border-top mt-2">
        <div className="description">
          <h5>Description</h5>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente
            eum, officiis ipsam nulla distinctio aut perspiciatis fugit vitae
            autem ducimus natus culpa adipisci. Pariatur voluptates debitis quo
            tempore fugiat. Minus.
          </p>
        </div>

        <div className="payment-details border-top pt-3">
          <h5>trip fire</h5>

          <div className="d-flex justify-content-between mt-3">
            <div className="payment-info">
              <h4>Apple pay</h4>
              <h4>Discount</h4>
              <h4>Paid amount</h4>
            </div>

            <div className="payment-info text-end">
              <h4>${ride?.fare}</h4>
              <h4>$10.00</h4>
              <h4>${ride?.fare - 10}</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="text-end px-3 mt-4">
        <button className="pop-up-button rounded" onClick={closePanel}>
          Cancel
        </button>
        <button
          className="accept-btn pop-up-button rounded ms-3"
          onClick={()=>{handlePanel();acceptRide()}}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

export default PassengerDetails;
