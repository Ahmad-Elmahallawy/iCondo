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
  startTime: string;
  endTime: string;
}

const MyReservations: React.FC = () => {
  // Sample data array for reservations
  const [reservations, setReservations] = useState<Reservation[]>([
    // Array of reservation objects
    {
      id: 1,
      location: "Sky Lounge",
      date: "2024-04-24",
      startTime: "20:00",
      endTime: "21:00",
    },
    {
      id: 2,
      location: "Sky Fitness",
      date: "2024-04-04",
      startTime: "10:00",
      endTime: "11:00",
    },
    {
      id: 3,
      location: "Sky Lounge",
      date: "2024-04-26",
      startTime: "20:00",
      endTime: "21:00",
    },
  ]);

  // State to control the visibility of the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State to keep track of the reservation being edited
  const [editingReservation, setEditingReservation] =
    useState<Reservation | null>(null);

  // Function to handle reservation updates
  const handleReservationUpdate = (updatedReservation: Reservation) => {
    setReservations((prevReservations) =>
      prevReservations.map((res) =>
        res.id === updatedReservation.id ? updatedReservation : res
      )
    );
    setIsModalOpen(false);
  };

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
                {reservation.date} at {reservation.startTime} {" - "}
                {reservation.endTime}
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
          onClose={() => setIsModalOpen(false)}
          reservation={editingReservation}
          availableFacilities={["Sky Lounge", "Sky Fitness", "Other Lounge"]}
          onReservationUpdate={handleReservationUpdate}
        />
      )}
    </div>
  );
};

export default MyReservations;
