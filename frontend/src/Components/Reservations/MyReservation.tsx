import React, { useEffect, useState } from "react";
import "../../Style/ReservationStyle/MyReservation.css"; // Stylesheet for styling the reservation list
import { FiEdit, FiX } from "react-icons/fi"; // Icons for edit and cancel actions
import MCFR from "./MCFR"; // Modal component for editing reservations
import Reservation from "./MyReservation"; // Reservation object interface import
import { confirmAlert } from "react-confirm-alert"; // Alert confirmation dialog
import "react-confirm-alert/src/react-confirm-alert.css"; // Stylesheet for the alert confirmation dialog
import axios from "axios";

// Defines the shape of a reservation object
export interface Reservation {
  name: any;
  id: number;
  location: string;
  date: string;
  startTime: string;
  endTime: string;
}

// Main component for displaying a list of reservations
const MyReservations: React.FC = () => {
  const user = JSON.parse(localStorage.getItem("userData") || "{}");

  // State for storing the list of reservations
  const [reservations, setReservations] = useState<Reservation[]>([]);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/reservations`,
          {
            params: {
              where: {
                user: { id: user.id },
              },
            },
            headers: { Authorization: `Bearer ${user.accessToken}` },
          }
        );

        const formattedEvents = response.data.map(
          (event: { id: string; notes: string; availablity: string }) => {
            // Dynamically create the regex pattern with the actual username
            const regex = new RegExp(`${escapeRegex(user.username)} - (.+?) at (.+?) - (.+)`);
            const match = event.notes.match(regex);
            const location = match ? match[1] : "Unknown Location";
            const startTime = match ? match[2] : "Start Time Unknown";
            const endTime = match ? match[3] : "End Time Unknown";

            return {
              id: event.id,
              title: event.notes,
              date: event.availablity.split("T")[0],
              startTime: startTime,
              endTime: endTime,
              location: location,
            };
          }
        );
        setReservations(formattedEvents);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchEvents();
  }, [user.id, user.username, user.accessToken]);  // Depend on user data to refetch when it changes

  // Helper function to escape regex special characters in a string
  function escapeRegex(string: string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
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
    console.log(reservation);

    const editedReservation = {
      ...reservation,
      startTime: convertTo24HourFormat(reservation.startTime),
      endTime: convertTo24HourFormat(reservation.endTime),
    };

    setEditingReservation(editedReservation);
    setIsModalOpen(true);
  };

  function convertTo24HourFormat(timeStr: string): string {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":");

    if (hours === "12") {
      hours = modifier === "AM" ? "00" : "12";
    } else {
      hours = modifier === "PM" ? String(parseInt(hours, 10) + 12) : hours;
    }

    return `${hours.padStart(2, "0")}:${minutes}`;
  }
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
