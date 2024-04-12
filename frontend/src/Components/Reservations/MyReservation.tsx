import React, { useEffect, useState } from "react";
import "../../Style/ReservationStyle/MyReservation.css";
import { FiEdit, FiX } from "react-icons/fi";
import MCFR from "./MCFR";
import Reservation from "./MyReservation";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import axios from "axios";

export interface Reservation {
  name: any;
  id: number;
  location: string;
  date: string;
  startTime: string;
  endTime: string;
}

const MyReservations: React.FC = () => {
  const user = JSON.parse(localStorage.getItem("userData") || "{}");
  const [availableFacilities, setAvailableFacilities] = useState<
    { name: string; id: string }[]
  >([]);

  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/properties/${user.propertyID}/commonFacilities`,
          {
            headers: { Authorization: `Bearer ${user.accessToken}` },
          }
        );
        console.log(response);
        const formattedFacilities = response.data.map(
          (facility: { facilityType: string; id: string }) => ({
            ...facility,
            facilityType: formatFacilityName(facility.facilityType),
          })
        );
        setAvailableFacilities(
          formattedFacilities.map(
            (facility: { id: string; facilityType: string }) => ({
              name: facility.facilityType,
              id: facility.id,
            })
          )
        );
      } catch (error) {
        console.error("Error fetching facilities:", error);
      }
    };

    fetchFacilities();
  }, [user.accessToken]);
  const formatFacilityName = (name: string) => {
    return name.replace(/_/g, " ").replace(/\b(\w)/g, (s) => s.toUpperCase());
  };

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
            const regex = new RegExp(
              `${escapeRegex(user.username)} - (.+?) at (.+?) - (.+)`
            );
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
        console.log(formattedEvents);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchEvents();
  }, [user.id, user.username, user.accessToken]);

  function escapeRegex(string: string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReservation, setEditingReservation] =
    useState<Reservation | null>(null);

  const handleReservationUpdate = (updatedReservation: Reservation) => {
    setReservations((prevReservations) =>
      prevReservations.map((res) =>
        res.id === updatedReservation.id ? updatedReservation : res
      )
    );
    setIsModalOpen(false);
  };
  const handleEdit = (reservation: Reservation) => {
    const editedReservation = {
      ...reservation,
      startTime: reservation.startTime,
      endTime: reservation.endTime,
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
  function formatTimeTo12Hour(timeStr: string): string {
    let [hours, minutes] = timeStr.split(":");
    const hour = parseInt(hours, 10);
    const isPM = hour >= 12;
    const adjustedHour = hour % 12 || 12;
    const modifier = isPM ? "PM" : "AM";

    return `${adjustedHour}:${minutes} ${modifier}`;
  }

  const confirmCancellation = async (id: number) => {
    // Confirm from the user if they really want to delete
    confirmAlert({
        title: "Confirm to cancel",
        message: "Are you sure you want to cancel this reservation?",
        buttons: [
            {
                label: "Yes",
                onClick: async () => {
                    try {
                        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/reservations/${id}`, {
                            headers: { Authorization: `Bearer ${user.accessToken}` },
                        });
                        console.log("Deletion successful", response.data);
                        // Update state to reflect the deletion
                        setReservations(reservations.filter((reservation) => reservation.id !== id));
                    } catch (error) {
                        console.error("Failed to delete reservation", error);
                    }
                }
            },
            {
                label: "No",
            },
        ],
    });
};

  const cancelReservation = (id: number) => {
    setReservations(
      reservations.filter((reservation) => reservation.id !== id)
    );
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
      {isModalOpen && editingReservation && (
        <MCFR
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          reservation={editingReservation}
          availableFacilities={availableFacilities}
          onReservationUpdate={handleReservationUpdate}
        />
      )}
    </div>
  );
};

export default MyReservations;
