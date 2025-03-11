import LocationOnIcon from "@mui/icons-material/LocationOn";
import "../CSS/SearchLocationPanel.css";
import { useDispatch, useSelector } from "react-redux";

function SearchLocationPanel({
  vehiclePanel,
  setPickUp,
  setDestination,
  activeField,
}) {
  // const addresses = [
  //   {
  //     place: "Bhangonpar bazar",
  //     address: "Gouramva Road, Shuvadia, Fakirhat, Bagerhat",
  //   },

  //   {
  //     place: "Khatakhali more",
  //     address: "Dhaka khulna Road, Fakirhat, Bagerhat",
  //   },

  //   {
  //     place: "Bilasita center",
  //     address: "culkathi bazar, Bagerhat sadar, Bagerhat",
  //   },

  //   {
  //     place: "bank asia",
  //     address: "shiv bari more, Khulna",
  //   },

  //   {
  //     place: "Govt M m city college",
  //     address: "modern furniture more, khulna",
  //   },

  //   {
  //     place: "mini ciniese center",
  //     address: "PTI more, khulna",
  //   },

  //   {
  //     place: "m & m restaurent & bar",
  //     address: "babu khan road, khulna",
  //   },

  //   {
  //     place: "niloy motor",
  //     address: "abu sen goli, pablur more, khulna",
  //   },
  // ];

  const { suggestion, fare } = useSelector((store) => store.map);

  const data = suggestion.mapData.data;


  const handleFieldValue = (suggestion) => {
    if (activeField === "pickup") {
      setPickUp(suggestion);
    } else if (activeField === "destination") {
      setDestination(suggestion);
    }
  };

  return (
    <div className="px-4 location-area text-center">
      <button className="btn btn-dark mb-4 w-50 rounded" onClick={vehiclePanel}>
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
