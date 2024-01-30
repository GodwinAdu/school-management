// src/components/IDCard.tsx
import React from 'react';

const IDCard: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-primary to-secondary p-8 rounded-md shadow-md">
      {/* Front Side */}
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Student ID Card</h1>
          <p>Student Name: John Doe</p>
          <p>Student ID: 123456</p>
          {/* Add more student details */}
        </div>
        <div>
          {/* School Logo */}
          <img src="/school-logo.png" alt="School Logo" className="w-16 h-16 rounded-full" />
        </div>
      </div>

      {/* Back Side */}
      <div className="mt-4">
        {/* School Details */}
        <h2 className="text-lg font-bold mb-2">School Details</h2>
        <p>School Name: ABC School</p>
        <p>Address: 123 Main Street, City</p>
        {/* Add more school details */}
      </div>

      {/* SVG Icons */}
      <div className="flex justify-between mt-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="w-8 h-8 text-gray-700"
          viewBox="0 0 24 24"
        >
          {/* Insert your SVG path here */}
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="w-8 h-8 text-gray-700"
          viewBox="0 0 24 24"
        >
          {/* Insert your SVG path here */}
        </svg>
      </div>
    </div>
  );
};

export default IDCard;
