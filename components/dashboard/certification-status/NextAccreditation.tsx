import React from "react";

const NextAccreditation: React.FC = () => {
  const nextCycleDate = "March 2027"; // Replace with actual data

  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <h2 className="text-lg font-semibold text-gray-700">
        Next Accreditation Cycle
      </h2>
      <p className="mt-2 text-gray-600">
        Your next refresher course is scheduled for{" "}
        <span className="font-medium text-gray-800">{nextCycleDate}</span>.
      </p>
    </div>
  );
};

export default NextAccreditation;
