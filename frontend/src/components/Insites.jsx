import React from 'react';
import { Lightbulb } from 'lucide-react';





const InsightsList =({ insights }) => {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-8">
        <Lightbulb className="w-6 h-6 text-yellow-500" />
        Key Insights
      </h2>
      <div className="grid gap-4">
        {insights.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
          >
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                {index + 1}
              </span>
              <p className="text-gray-700 leading-relaxed">{item.Insight}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsightsList;