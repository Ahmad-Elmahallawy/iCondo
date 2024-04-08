import React from "react";
import "../../Style/ReservationStyle/MyReservation.css"; // Importing the CSS for styling the component
import ReservationModal from "./ReservationModal"; // Importing a modal component, possibly used for creating/editing reservations
import { FaEdit, FaTimes } from "react-icons/fa"; // Importing specific icons from FontAwesome
import { FiEdit, FiX } from "react-icons/fi"; // Importing specific icons from Feather Icons

// TypeScript interface to type the shape of a reservation object
export interface Reservation {
  id: number;
  location: string;
  date: string;
  time: string;
}

const MyReservations: React.FC = () => {
  // Sample data array for reservations
  const reservations: Reservation[] = [
    // Array of reservation objects
    {
      id: 1,
      location: "Sky Lounge",
      date: "April 24, 2024",
      time: "20:00-21:00",
    },
    {
      id: 2,
      location: "Sky Fitness",
      date: "April 4, 2024",
      time: "10:00-11:00",
    },
    {
      id: 3,
      location: "Sky Lounge",
      date: "April 26, 2024",
      time: "20:00-21:00",
    },
  ];

  // Function to handle editing a reservation - currently logs to console
  const handleEdit = (id: number) => {
    console.log("Edit reservation with id:", id);
  };

  // Function to handle canceling a reservation - currently logs to console
  const handleCancel = (id: number) => {
    console.log("Cancel reservation with id:", id);
  };

  // The render method returns the JSX for the component
  return (
    <div className="reservations-wrapper">
      {/* Title of the reservations section */}
      <h1>My Reservations</h1>
      {/* Container for the list of reservations */}
      <div className="my-reservations">
        {/* Mapping each reservation to a display element */}
        <div className="reservations-list">
          {reservations.map((reservation) => (
            // Each reservation entry
            <div key={reservation.id} className="reservation">
              {/* Details of the reservation */}
              <p>
                Reservation booked for {reservation.location} on{" "}
                {reservation.date} at {reservation.time}
              </p>
              {/* Action buttons for editing and canceling reservations */}
              <div className="actions">
                {/* Edit button with an icon */}
                <button
                  className="edit"
                  onClick={() => handleEdit(reservation.id)}
                >
                  <FiEdit />
                </button>

                {/* Cancel button with an icon */}
                <button
                  className="cancel"
                  onClick={() => handleCancel(reservation.id)}
                >
                  <FiX />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyReservations; // Exporting the component to be used in other parts of the application
