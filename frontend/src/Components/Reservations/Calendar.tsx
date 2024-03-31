import React, { useState } from 'react';
import "../../Style/ReservationStyle/CalendarStyle.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import ReservationModal from "./ReservationModal";

interface CalendarEvent {
  title: string;
  name: string;
  unitNumber: string;
  facility: string;
  time: string;
  date: string;
}

export default function Calendar() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const handleDateClick = (arg: any) => {
    setSelectedDate(arg.dateStr);
    setDialogOpen(true);
  };

  const handleEventCreation = (newEvent: Omit<CalendarEvent, 'title'>) => {
    const eventTitle = `${newEvent.name} - ${newEvent.facility} at ${newEvent.time}`;
    const fullEvent = { ...newEvent, title: eventTitle };
    setEvents([...events, fullEvent]);
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
        events={events.map(event => ({ title: event.title, date: event.date }))}
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
    </div>
  );
}
