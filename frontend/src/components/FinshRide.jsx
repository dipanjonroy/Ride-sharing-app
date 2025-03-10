import LogoutIcon from "@mui/icons-material/Logout";
function FinsihRide({closePanel}) {
  return (
    <div className="vh-100 bg-body position-relative">
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

      <div className="complete-ride position-fixed bottom-0 w-100 px-4 py-5 d-flex justify-content-between align-items-center">
        <h3>4 km away!</h3>
        <button onClick={closePanel}>Finish Ride</button>
      </div>
    </div>
  );
}

export default FinsihRide;
