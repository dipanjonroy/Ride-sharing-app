import LocationOnIcon from "@mui/icons-material/LocationOn";
import "../CSS/SearchLocationPanel.css";

function SearchLocationPanel({vehiclePanel}) {
  const addresses = [
    {
      place: "Bhangonpar bazar",
      address: "Gouramva Road, Shuvadia, Fakirhat, Bagerhat",
    },

    {
      place: "Khatakhali more",
      address: "Dhaka khulna Road, Fakirhat, Bagerhat",
    },

    {
      place: "Bilasita center",
      address: "culkathi bazar, Bagerhat sadar, Bagerhat",
    },

    {
      place: "bank asia",
      address: "shiv bari more, Khulna",
    },

    {
      place: "Govt M m city college",
      address: "modern furniture more, khulna",
    },

    {
      place: "mini ciniese center",
      address: "PTI more, khulna",
    },

    {
      place: "m & m restaurent & bar",
      address: "babu khan road, khulna",
    },

    {
      place: "niloy motor",
      address: "abu sen goli, pablur more, khulna",
    },
  ];

  return (
    <div className="px-4 overflow-auto location-area">
      {addresses.map((address, idx) => (
        <div key={idx} className="location-panel d-flex align-items-center gap-4" onClick={vehiclePanel}>
          <div className="location-icon">
            <LocationOnIcon />
          </div>
          <div className="location">
            <h4>{address.place}</h4>
            <p>{address.address}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchLocationPanel;
