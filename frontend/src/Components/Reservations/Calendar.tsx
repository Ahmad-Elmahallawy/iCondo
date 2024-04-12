import "../../Style/ReservationStyle/CalendarStyle.css";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
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
  }, []);


  const handleDateClick = (arg: any) => {
    alert(arg.dateStr);
  };

  const handleEventCreation = async (
    newEvent: Omit<CalendarEvent, "title">
  ) => {
    const eventTitle = `${newEvent.name} - ${newEvent.facilityName} at ${newEvent.time}`;
    const fullEvent = { ...newEvent, title: eventTitle };
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
