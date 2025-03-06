import LocationOnIcon from "@mui/icons-material/LocationOn";
import "../CSS/SearchLocationPanel.css";

function SearchLocationPanel() {
  return (
    <div>
      <div className="location-panel px-4 d-flex align-items-center gap-4">
        <div className="location-icon">
          <LocationOnIcon />
        </div>
        <div className="location">
          <h4>bhangonpar bazar</h4>
          <p>Gouramva Road, Shuvadia, Fakirhat, Bagerhat</p>
        </div>
      </div>
    </div>
  );
}

export default SearchLocationPanel;
