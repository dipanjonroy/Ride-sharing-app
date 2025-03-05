import { Link } from "react-router-dom";
import "../Css/Home.css";

export default function Home() {
  return (
    <div>
      <div className="bg-primary vh-100 d-flex flex-column justify-content-between main">
        <img className="ms-4 mt-4 logo" src="https://www.smartsheet.com/sites/default/files/2022-02/Uber_logo_2018_4.svg" alt="Uber Logo" />
        <div className="bg-white w-100 px-4 py-4">
          <h2 className="fw-bold display-6 text-dark">Get started with Uber</h2>
          <Link className="bg-dark border-0 text-white w-100 py-2 rounded mt-3 d-inline-block text-center text-decoration-none main-btn" to="/login">Continue</Link>
        </div>
      </div>
    </div>
  );
}
