import "../../Style/ReservationStyle/CalendarStyle.css";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from "@fullcalendar/timegrid";

// Documentation for the following calendar: https://fullcalendar.io/docs/react
export default function Calendar() {
  const handleDateClick = (arg: any) => {
    alert(arg.dateStr);
  };
  function renderEventContent(eventInfo: any) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }

  function handleEventClick(clickInfo: any) {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
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
        events={[
          { title: "event 1", date: "2024-04-01" },
          { title: "event 2", date: "2024-04-02" },
        ]}
        dateClick={handleDateClick} // handle day clicks
        eventContent={renderEventContent}
        themeSystem="standard"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        eventClick={handleEventClick}
      />
    </div>
  );
}
function createEventId() {
  throw new Error("Function not implemented.");
}
