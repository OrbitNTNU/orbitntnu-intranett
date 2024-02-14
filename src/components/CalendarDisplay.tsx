import type { Event as MyEvent } from "@/interfaces/Event";;
import { Calendar, momentLocalizer } from 'react-big-calendar';
import type { Formats } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment-timezone';
import { setContrast } from './Colors';
import { useState, useEffect } from 'react';

export const hashString = (str: string) => {
    let hash = 0;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to 32bit integer
    }

    return hash;
};

interface ParsedEvent {
    id: number;
    title: string;
    start: Date;
    end: Date;
    allDay: boolean;
    details: MyEvent;
}

function parseEventItems(eventItems: MyEvent[], indexes: Record<string, number>): ParsedEvent[] {
    const events: ParsedEvent[] = [];
  
    eventItems.map((eventItem) => {
      // Update the year to 2024 for start and end properties
      const startYear2024 = new Date(eventItem.startTime);
      startYear2024.setFullYear(2024);
  
      const endYear2024 = new Date(eventItem.endTime);
      endYear2024.setFullYear(2024);
  
      const parsedEvent = {
        id: indexes[eventItem.type] ?? 0,
        title: eventItem.name,
        start: startYear2024,
        end: endYear2024,
        allDay: false,
        details: eventItem
      };
  
      events.push(parsedEvent);
    });
  
    return events;
  }

interface CalendarDisplayProps {
    indexes: Record<string, number>;
    courseColors: Record<string, string>; // Replace with your actual type
    eventItems: MyEvent[];
}

const CalendarDisplay: React.FC<CalendarDisplayProps> = ({
    indexes,
    courseColors,
    eventItems,
}) => {

    const [parsedEvents, setParsedEvents] = useState<ParsedEvent[]>([]);

    useEffect(() => {
        // Assuming you have some logic to asynchronously load parsed events
        // Replace the following placeholder code with your actual data loading logic
        const loadParsedEvents = () => {
          // Simulate loading parsed events
          const events = parseEventItems(eventItems, indexes);
          setParsedEvents(events);
        };
    
        void loadParsedEvents();
      }, [eventItems, indexes]);

    const timezone = moment.tz.guess();
    moment.tz.setDefault(timezone);

    const localizer = momentLocalizer(moment);

    const today = new Date();
    const defaultDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8, 15);
    const timeZoneOffset = new Date().toLocaleString("en-US", { timeZoneName: "short", timeZone: timezone }) ?? '+00:00';

    const workWeekStart = new Date();
    workWeekStart.setHours(2, 0, 0, 0);
    workWeekStart.setHours(workWeekStart.getHours() - parseInt(timeZoneOffset.split(":")[0] ?? "0"));

    const workWeekEnd = new Date();
    workWeekEnd.setHours(24, 0, 0, 0);
    workWeekEnd.setHours(workWeekEnd.getHours() - parseInt(timeZoneOffset.split(":")[0] ?? "0"));

    const eventPropGetter = (event: ParsedEvent) => {
        const courseCode = event.title?.split('-')[0]?.trim();
        if (courseCode) {
            const backgroundColor = courseColors[indexes[courseCode]!];

            // Check if backgroundColor is defined before calling setContrast
            const textColor = backgroundColor ? setContrast(backgroundColor) : '';

            return {
                style: {
                    border: '1px solid white',
                    outline: `1px solid white`, // Set the outer border with the background color 
                    backgroundColor,
                    color: textColor, // Set the text color
                },
            };
        }

        return {}
    }

    const formats: Formats = {
        dateFormat: 'dd',
        // dayFormat: (date, culture, localizer) => localizer?.format(date, 'ddd', culture) ?? '',
        dayRangeHeaderFormat: ({ start, end }, culture, localizer) => {
            const formattedStart = localizer?.format(moment(start).toDate(), 'ddd MMM D', culture) ?? '';
            const formattedEnd = localizer?.format(moment(end).toDate(), 'ddd MMM D', culture) ?? '';

            return `${formattedStart} — ${formattedEnd}`;
        },
        timeGutterFormat: (date, culture, localizer) => localizer?.format(date, 'HH:mm', culture) ?? '',
        eventTimeRangeFormat: ({ start, end }, culture, localizer) =>
            `${localizer?.format(moment(start).toDate(), 'HH:mm', culture) ?? ''} — ${localizer?.format(moment(end).toDate(), 'HH:mm', culture) ?? ''}`
    };

    const handleSelectEvent = (event: ParsedEvent) => {
        // Add your logic to show more details of the selected event
        const title = event.title;
        console.log(event.start)
        const eventDetails = [title].filter(Boolean).join('\n\n');
        alert(eventDetails)
    };

    return (
        <div className='flex-column flex-row flex-shrink mt-2 mb-2 justify-center'>
            <div className="w-full h-[60vh] lg:w-[80%] lg:mx-auto">
                <style>
                    {`
          .rbc-allday-cell {
            display: none;
          }
          .rbc-time-view .rbc-header {
            border-bottom: none;
          }
        `}
                </style>
                <Calendar
                    formats={formats}
                    defaultView='work_week'
                    defaultDate={defaultDate}
                    localizer={localizer}
                    events={parsedEvents}
                    startAccessor="start"
                    endAccessor="end"
                    views={{
                        month: false,
                        week: true,
                        work_week: true,
                        day: true,
                        agenda: false,
                    }}
                    min={workWeekStart}
                    max={workWeekEnd}
                    className="bg-white text-black border border-gray-300 rounded-md p-2"
                    eventPropGetter={eventPropGetter}
                    onSelectEvent={handleSelectEvent}
                />
            </div>
        </div>
    );
};

export default CalendarDisplay;
