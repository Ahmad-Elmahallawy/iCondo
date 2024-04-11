import React, { useState } from "react";
import "../../Style/ReservationStyle/MyReservation.css"; // Stylesheet for styling the reservation list
import { FiEdit, FiX } from "react-icons/fi"; // Icons for edit and cancel actions
import MCFR from "./MCFR"; // Modal component for editing reservations
import Reservation from "./MyReservation"; // Reservation object interface import
import { confirmAlert } from "react-confirm-alert"; // Alert confirmation dialog
import "react-confirm-alert/src/react-confirm-alert.css"; // Stylesheet for the alert confirmation dialog

// Defines the shape of a reservation object
export interface Reservation {
  id: number;
  location: string;
  date: string;
  startTime: string;
  endTime: string;
}

// Main component for displaying a list of reservations
const MyReservations: React.FC = () => {
  // State for storing the list of reservations
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

  // State for controlling the visibility of the edit modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for the reservation currently being edited
  const [editingReservation, setEditingReservation] =
    useState<Reservation | null>(null);

  // Updates a reservation and closes the modal
  const handleReservationUpdate = (updatedReservation: Reservation) => {
    setReservations((prevReservations) =>
      prevReservations.map((res) =>
        res.id === updatedReservation.id ? updatedReservation : res
      )
    );
    setIsModalOpen(false);
  };

  // Opens the edit modal and sets the current reservation for editing
  const handleEdit = (reservation: Reservation) => {
    setEditingReservation(reservation);
    setIsModalOpen(true);
  };

  // Confirms the cancellation of a reservation
  const confirmCancellation = (id: number) => {
    confirmAlert({
      title: "Confirm to cancel",
      message: "Are you sure you want to cancel this reservation?",
      buttons: [
        {
          label: "Yes",
          onClick: () => cancelReservation(id),
        },
        {
          label: "No",
        },
      ],
    });
  };

  // Removes a reservation from the list
  const cancelReservation = (id: number) => {
    setReservations(
      reservations.filter((reservation) => reservation.id !== id)
    );
  };

  // Closes the edit modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Renders the list of reservations with edit and cancel actions
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
                  onClick={() => confirmCancellation(reservation.id)}
                >
                  <FiX />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* MCFR Modal Component */}
      {/* Conditional rendering of the edit modal */}
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

// Export the MyReservation component to be used in other parts of the application
export default MyReservations;
