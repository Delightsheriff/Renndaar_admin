// pages/SeekerDetails.jsx
import Component from "@/features/GiverDetails/GiverDetails";
import { useParams } from "react-router-dom";

function GiverDetails() {
  const { id } = useParams();

  return (
    <div>
      <h2>Seeker Details</h2>
      <p>Viewing details for seeker with ID: {id}</p>
      {/* Add more details and data fetching logic here */}
      <Component />
    </div>
  );
}

export default GiverDetails;
