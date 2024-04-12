import React, { useEffect, useState } from "react";
import "../../Style/ReservationStyle/CalendarStyle.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import ReservationModal from "./ReservationModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface CalendarEvent {
  title: string;
  name: string;
  unitNumber: string;
  facilityName: string;
  facilityId: string;
  time: string;
  date: string;
}

export default function Calendar() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const user = JSON.parse(localStorage.getItem("userData") || "{}");
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/reservations`, // URL
          {
            params: {
              // Any query parameters go here, if needed
              where: {
                user: { id: user.id },
              },  
            },
            headers: { Authorization: `Bearer ${user.accessToken}` },
          }
        );
        // Assuming the API returns an array of events
        const formattedEvents = response.data.map(
          (event: { notes: any; availablity: any; date: string }) => ({
            title: event.notes,
            date: event.availablity.split("T")[0], // Splitting the datetime and taking the date part
          })
        );
        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching reservations:", error);
        // Handle error scenario
      }
    };

    fetchEvents();
  }, []); // Empty dependency array ensures this runs once on component mount
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const user = JSON.parse(localStorage.getItem("userData") || "{}");
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/reservations`, // URL
          {
            params: {
              // Any query parameters go here, if needed
              where: {
                user: { id: user.id },
              },  
            },
            headers: { Authorization: `Bearer ${user.accessToken}` },
          }
        );
        // Assuming the API returns an array of events
        const formattedEvents = response.data.map(
          (event: { notes: any; availablity: any; date: string }) => ({
            title: event.notes,
            date: event.availablity.split("T")[0], // Splitting the datetime and taking the date part
          })
        );
        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching reservations:", error);
        // Handle error scenario
      }
    };

    fetchEvents();
  }, []); // Empty dependency array ensures this runs once on component mount
  const handleDateClick = (arg: any) => {
    setSelectedDate(arg.dateStr);
    setDialogOpen(true);
  };

  const handleEventCreation = async (
    newEvent: Omit<CalendarEvent, "title">
  ) => {
    const eventTitle = `${newEvent.name} - ${newEvent.facilityName} at ${newEvent.time}`;
    const fullEvent = { ...newEvent, title: eventTitle };
    console.log(newEvent);
    console.log(newEvent);
    
    setEvents([...events, fullEvent]);
    setDialogOpen(false);

    // Format the date and time for the API request
    const datetime = newEvent.date + "T" + newEvent.time;

    const requestBody = {
      notes: eventTitle,
      availablity: datetime,
      user: {
        id: user.id,
      },
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/reservations`,
        requestBody,
        {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        }
      );
      console.log("Reservation created successfully", response.data);
      // Handle further logic after successful response, if needed
    } catch (error) {
      console.error("Error creating reservation:", error);
      // Handle error scenario
    }
  };

  const navigate = useNavigate();

  const navigateToMyReservations = () => {
    navigate("/MyReservation");
  };

  function renderEventContent(eventInfo: any) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }


  return (
    <div className="calendar-container">
      <div className="calendar-heading">
        <h2>Common Facilities Calendar</h2>
        <button
          className="my-reservations-btn"
          onClick={navigateToMyReservations}
        >
          My Reservations
        </button>
        <button
          className="my-reservations-btn"
          onClick={navigateToMyReservations}
        >
          My Reservations
        </button>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        initialView="dayGridMonth"
        events={events.map((event) => ({
          title: event.title,
          date: event.date,
        }))}
        dateClick={handleDateClick}
        events={events.map((event) => ({
          title: event.title,
          date: event.date,
        }))}
        dateClick={handleDateClick}
        eventContent={renderEventContent}
        themeSystem="standard"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
      />
      <ReservationModal
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleEventCreation}
        defaultDate={selectedDate}
      />
      <ReservationModal
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleEventCreation}
        defaultDate={selectedDate}
      />
    </div>
  );
}