import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SpeedIcon from "@mui/icons-material/Speed";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { useSelector } from "react-redux";

function CaptainDetails() {
  const { profile } = useSelector((store) => store.captain);

  const captainProfile = profile.response.profile;

  return (
    <div className="captain-summery bg-body w-100 p-3">
      <center>
        <div className="close-panel"></div>
      </center>

      <div className="captain-earn-summery d-flex justify-content-between align-items-center my-3">
        <div className="captain-profile d-flex align-items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww"
            alt=""
          />

          <div className="captain-name">
            <h3>
              {captainProfile.fullname.firstname +
                " " +
                captainProfile.fullname.lastname}
            </h3>
            <p>Basic level</p>
          </div>
        </div>

        <div className="captain-earning text-end">
          <h3>$325.00</h3>
          <p>Earned</p>
        </div>
      </div>

      <div className="captain-ride-info d-flex justify-content-evenly align-items-center py-4 rounded-3">
        <div className="ride-info text-center">
          <AccessTimeIcon />
          <h3 className="m-0">10.2</h3>
          <p className="m-0">hours online</p>
        </div>

        <div className="ride-info text-center">
          <SpeedIcon />
          <h3 className="m-0">30 km</h3>
          <p className="m-0">total distance</p>
        </div>

        <div className="ride-info text-center">
          <EventNoteIcon />
          <h3 className="m-0">20</h3>
          <p className="m-0">total jobs</p>
        </div>
      </div>
    </div>
  );
}

export default CaptainDetails;
