import LocationOnIcon from "@mui/icons-material/LocationOn";
import "../CSS/SearchLocationPanel.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setDestination,
  setPickUp,
} from "../features/State management/stateSlice";
import { getFare } from "../features/APICall/mapSlice";

function SearchLocationPanel({ vehiclePanel }) {
  const { suggestion, fare } = useSelector((store) => store.map);
  const { activeField, destination, pickup } = useSelector(
    (store) => store.state
  );
  const data = suggestion.mapData.data;

  const dispatch = useDispatch();

  const handleFieldValue = (suggestion) => {
    if (activeField === "pickup") {
      dispatch(setPickUp(suggestion));
    } else if (activeField === "destination") {
      dispatch(setDestination(suggestion));
    }
  };

  return (
    <div className="px-4 location-area text-center">
      <button
        className="btn btn-dark mb-4 w-50 rounded"
        onClick={() => {
          vehiclePanel();
          dispatch(getFare({ destination, pickup }));
        }}
      >
        Find trip
      </button>
      <div className="overflow-auto h-100">
        {data.map((address, idx) => (
          <div
            key={idx}
            className="location-panel d-flex align-items-center gap-4"
            onClick={() => handleFieldValue(address.description)}
          >
            <div className="location-icon">
              <LocationOnIcon />
            </div>
            <div className="location">
              <h4>{address.description}</h4>
              {/* <p>{address}</p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchLocationPanel;
