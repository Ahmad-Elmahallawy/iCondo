import React, { useState } from "react";
import "../../Style/ReservationStyle/MyReservation.css"; // Importing the CSS for styling the component
import { FiEdit, FiX } from "react-icons/fi"; // Importing specific icons from Feather Icons
import MCFR from "./MCFR"; // Import the modal component
import Reservation from "./MyReservation";

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

  const availableFacilities = ["Sky Lounge", "Sky Fitness", "Other Lounge"]; // and so on...
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [editingReservation, setEditingReservation] =
    useState<Reservation | null>(null); // State to hold the currently editing reservation

  // Function to handle editing a reservation - opens the modal and sets the current reservation
  const handleEdit = (reservation: Reservation) => {
    setEditingReservation(reservation);
    setIsModalOpen(true);
  };

  // Function to handle canceling a reservation - currently logs to console
  const handleCancel = (id: number) => {
    console.log("Cancel reservation with id:", id);
    //implement cancellation logic here
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // The render method returns the JSX for the component
  return (
    <div className="reservations-wrapper">
      <h1>My Reservations</h1>
      <div className="my-reservations">
        <div className="reservations-list">
          {reservations.map((reservation) => (
            <div key={reservation.id} className="reservation">
              <p>
                Reservation booked for {reservation.location} on{" "}
                {reservation.date} at {reservation.time}
              </p>
              <div className="actions">
                <button
                  className="edit"
                  onClick={() => handleEdit(reservation)}
                >
                  <FiEdit />
                </button>
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
      {/* MCFR Modal Component */}
      {isModalOpen && editingReservation && (
        <MCFR
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          reservation={editingReservation}
          availableFacilities={availableFacilities} // Pass the array to the MCFR component as a prop
        />
      )}
    </div>
  );
};

export default MyReservations;
