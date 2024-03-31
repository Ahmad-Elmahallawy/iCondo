import "../../Style/ReservationStyle/CalendarStyle.css";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from "@fullcalendar/timegrid";
import ReservationModal from "./ReservationModal";
import { useState } from "react";


interface Event {
  title: string;
  date: string;
}

// Documentation for the following calendar: https://fullcalendar.io/docs/react
export default function Calendar() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [events, setEvents] = useState<Event[]>([]);


  const handleDateClick = (arg: any) => {
    setSelectedDate(arg.dateStr);
    setDialogOpen(true);
  };

  const handleEventCreation = (newEvent: { title: string; date: string }) => {
    setEvents([...events, newEvent]);
    setDialogOpen(false);
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
        <button className="my-reservations-btn">My Reservations</button>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick} // handle day clicks
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
    </div>
  );
}
