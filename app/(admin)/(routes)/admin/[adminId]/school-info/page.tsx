"use client"
import React, { useState } from 'react';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const subjects = ['Math', 'Science', 'English', 'History', 'Art'];

const page = () => {
  const [schedule, setSchedule] = useState([]);

  const generateSchedule = () => {
    const updatedSchedule = days.map((day) => {
      const timeSlots = [];
      let startTime = 8;

      for (let i = 0; i < 4; i++) {
        const endTime = startTime + 2;
        timeSlots.push({
          day,
          time: `${startTime}:00 AM - ${endTime}:00 PM`,
          subject: subjects[Math.floor(Math.random() * subjects.length)],
        });
        startTime = endTime;
      }

      return timeSlots;
    });

    setSchedule(updatedSchedule.flat());
  };

  return (
    <div className="container mx-auto mt-8">
      <button
        onClick={generateSchedule}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Generate Schedule
      </button>
      <table className="table-auto mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2">Day</th>
            <th className="px-4 py-2">Time</th>
            <th className="px-4 py-2">Subject</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((slot, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{slot.day}</td>
              <td className="border px-4 py-2">{slot.time}</td>
              <td className="border px-4 py-2">{slot.subject}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default page;