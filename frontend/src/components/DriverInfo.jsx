import GradeIcon from "@mui/icons-material/Grade";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import "../CSS/Driverinfo.css";
import ShieldIcon from "@mui/icons-material/Shield";
import EmergencyShareIcon from "@mui/icons-material/EmergencyShare";
import CallIcon from "@mui/icons-material/Call";
import PinDropIcon from "@mui/icons-material/PinDrop";

function Driverinfo({ closePanel }) {
  return (
    <div className="py-3 w-100 bg-body driver-info-panel">
      <center>
        <div className="panel-close" onClick={closePanel}></div>
      </center>

      <div className="px-3 driver-text d-flex justify-content-between align-items-center text-dark mt-3">
        <h4>Meet at the pick point</h4>

        <div className="text-center bg-dark text-light far-away-time d-flex justify-content-center align-items-center">
          <p>2 min</p>
        </div>
      </div>

      <div className="px-3 d-flex justify-content-between mt-3 pt-3 driver-des">
        <div className="driver-images d-flex">
          <div className="profile-image">
            <img
              src="https://media.istockphoto.com/id/821437202/photo/portrait-of-young-handsome-asian-man-relaxing-at-the-park-in-bangkok-thailand.jpg?s=612x612&w=0&k=20&c=BbkYk9Y8MwlINwoNADZB9vwy3nggr-AhsKRAGT7zQbg="
              alt=""
            />
          </div>
          <div className="car-image">
            <img
              src="https://www.freeiconspng.com/uploads/car-png-21.png"
              alt=""
            />
          </div>
        </div>

        <div className="drive-details text-dark">
          <h4>santh</h4>
          <h3>ka15ak00-0</h3>
          <p>white suzuki s_presso LXI</p>
          <span>
            <GradeIcon /> 4.9
          </span>
        </div>
      </div>

      <div className="px-3 chat-area ">
        <form>
          <input type="text" placeholder="Send a message..." />
          <IconButton type="submit">
            <SendIcon />
          </IconButton>
        </form>
      </div>

      <div className="px-3 driver-badges mb-3 d-flex justify-content-around">
        <div className="driver-badge text-dark">
          <div className="badge-icon">
            <ShieldIcon />
          </div>
          <h4>Safety</h4>
        </div>

        <div className="driver-badge text-dark">
          <div className="badge-icon">
            <EmergencyShareIcon />
          </div>
          <h4>Share my trip</h4>
        </div>

        <div className="driver-badge text-dark">
          <div className="badge-icon">
            <CallIcon />
          </div>
          <h4>Call driver</h4>
        </div>
      </div>

      <div className="px-3 driver-location d-flex align-items-center gap-4">
        <PinDropIcon />
        <div className="driver-location-text">
          <h4>562/11-A</h4>
          <p>modern furniture more, khulna</p>
        </div>
      </div>
      
    </div>
  );
}

export default Driverinfo;
