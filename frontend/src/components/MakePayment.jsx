import PaymentIcon from "@mui/icons-material/Payment";
import PinDropIcon from "@mui/icons-material/PinDrop";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import gsap from "gsap";

function MakePayment({ ride }) {
  const [expandPanel, setExpandPanel] = useState(false);
  // const rideInfoRef = useRef();

  // useGSAP(()=>{
  //   if(expandPanel){
  //     gsap.to(rideInfoRef.current, {
  //       opacity:"1",
  //       visibility:"visible"
  //     })
  //   } else {
  //     gsap.to(rideInfoRef.current, {
  //       opacity:"0",
  //       visibility:"hidden"
  //     })
  //   }
  // },[expandPanel])

  return (
    <div className="w-100 px-3">
      <center>
        <div
          className="panel-close my-3"
          onClick={() => setExpandPanel(!expandPanel)}
        ></div>
      </center>
      <div className="d-flex justify-content-between w-100 mt-3">
        <div className="payment-car">
          <img
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png"
            alt=""
          />
        </div>

        <div className="drive-details text-dark">
          <h4>Dipanjon</h4>
          <h3>WR1234</h3>
        </div>
      </div>

      {expandPanel && (
        <div>
          <div className="d-flex align-items-center gap-4 border-bottom">
            <PinDropIcon />
            <div className="d-location-text border-0">
              <h4 className="m-0 text-uppercase">562/11-A</h4>
              <p className="m-0 text-capitalize text-muted">
                Vhangomnpar bazar
              </p>
            </div>
          </div>

          <div className="d-flex align-items-center gap-4">
            <PaymentIcon />
            <div className="d-location-text border-bottom-0 pb-0">
              <h4 className="m-0 text-uppercase">$1000</h4>
              <p className="m-0 text-capitalize text-muted">cash cash</p>
            </div>
          </div>
        </div>
      )}

      <button className="payment-btn w-100 rounded mt-3 mb-3">
        Make a Payment
      </button>
    </div>
  );
}

export default MakePayment;
