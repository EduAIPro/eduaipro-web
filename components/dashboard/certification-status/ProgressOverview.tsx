import React from "react";

const ProgressOverview: React.FC = () => {
  const progress = 75;

  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <h2 className="text-lg font-semibold text-gray-700">Progress Overview</h2>
      <div className="mt-4 flex items-center space-x-4">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-xl font-bold text-blue-600">{progress}%</span>
        </div>
        <div>
          <p className="text-gray-600">Current Progress</p>
          <p className="text-gray-800 font-medium">Final Exam: Pending</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressOverview;
