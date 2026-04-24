import React, { useMemo, useState } from "react";
import DashboardPage from "../../components/layout/DashboardLayout";

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const academicEvents = [
    {
      id: 1,
      date: "2026-05-04",
      title: "Semester Opening",
      type: "semester",
    },
    {
      id: 2,
      date: "2026-05-12",
      title: "Course Registration Deadline",
      type: "deadline",
    },
    {
      id: 3,
      date: "2026-05-18",
      title: "Faculty Meeting",
      type: "meeting",
    },
    {
      id: 4,
      date: "2026-05-25",
      title: "Mid Semester Exams Begin",
      type: "exam",
    },
    {
      id: 5,
      date: "2026-06-10",
      title: "Research Conference",
      type: "event",
    },
    {
      id: 6,
      date: "2026-06-22",
      title: "End Semester Exams",
      type: "exam",
    },
  ];

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const goPrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const goNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const days = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

    const cells = [];

    for (let i = 0; i < firstDay; i++) {
      cells.push(null);
    }

    for (let d = 1; d <= totalDays; d++) {
      cells.push(d);
    }

    return cells;
  }, [currentMonth, currentYear]);

  const getDateString = (day) => {
    const mm = String(currentMonth + 1).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
    return `${currentYear}-${mm}-${dd}`;
  };

  const getEventsByDay = (day) => {
    const date = getDateString(day);
    return academicEvents.filter((event) => event.date === date);
  };

  const badgeStyles = {
    exam: "bg-red-500/20 text-red-300",
    deadline: "bg-yellow-500/20 text-yellow-300",
    meeting: "bg-cyan-500/20 text-cyan-300",
    semester: "bg-green-500/20 text-green-300",
    event: "bg-purple-500/20 text-purple-300",
  };

  const upcoming = academicEvents
    .filter((event) => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 6);

  return (
    <DashboardPage
      title="Academic Calendar"
      subtitle="Manage semester dates, exams, deadlines, and faculty events"
      stats={[
        { label: "Total Events", value: academicEvents.length },
        { label: "Exam Dates", value: "2" },
        { label: "Deadlines", value: "1" },
        { label: "Meetings", value: "1" },
      ]}
    >
      {/* TOP BAR */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h3 className="text-white font-semibold text-lg">
            {monthNames[currentMonth]} {currentYear}
          </h3>
          <p className="text-white/50 text-sm">
            Institutional planning and scheduling
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={goPrevMonth}
            className="px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition"
          >
            Previous
          </button>

          <button
            onClick={goNextMonth}
            className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 transition"
          >
            Next
          </button>
        </div>
      </div>

      {/* CALENDAR */}
      <div className="grid grid-cols-7 gap-2 mb-8">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-semibold text-cyan-300 py-2"
          >
            {day}
          </div>
        ))}

        {days.map((day, index) => {
          if (!day) {
            return (
              <div
                key={index}
                className="h-28 rounded-2xl bg-white/[0.02]"
              ></div>
            );
          }

          const events = getEventsByDay(day);

          return (
            <div
              key={index}
              className="min-h-[110px] rounded-2xl border border-white/10 bg-white/5 p-2 hover:bg-white/10 transition"
            >
              <div className="text-sm font-semibold text-white mb-2">
                {day}
              </div>

              <div className="space-y-1">
                {events.slice(0, 2).map((event) => (
                  <div
                    key={event.id}
                    className={`text-[10px] px-2 py-1 rounded-lg truncate ${
                      badgeStyles[event.type]
                    }`}
                  >
                    {event.title}
                  </div>
                ))}

                {events.length > 2 && (
                  <div className="text-[10px] text-white/50">
                    +{events.length - 2} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* UPCOMING EVENTS */}
      <div>
        <h3 className="text-white font-semibold mb-4">Upcoming Events</h3>

        <div className="space-y-3">
          {upcoming.map((event) => (
            <div
              key={event.id}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 p-4 rounded-2xl border border-white/10 bg-white/5"
            >
              <div>
                <p className="text-white font-medium">{event.title}</p>
                <p className="text-white/50 text-sm">{event.date}</p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs w-fit ${
                  badgeStyles[event.type]
                }`}
              >
                {event.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </DashboardPage>
  );
};

export default CalendarPage;