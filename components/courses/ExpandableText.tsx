"use client";
import React, { useState } from "react";
import Typography from "../common/ui/Typography";

const ExpandableText = ({ text }: { text: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="max-w-2xl">
      <p
        className={`text-gray-700 max-sm:text-base ${
          !isExpanded && "line-clamp-3"
        }`}
      >
        {text}
      </p>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-2 text-blue-600 hover:text-blue-800 focus:outline-none text-sm font-medium"
      >
        <Typography.P
          fontColor="brand"
          weight="semibold"
          className="!text-sm lg:!text-lg"
        >
          {isExpanded ? "Read less" : "Read more"}{" "}
        </Typography.P>
      </button>
    </div>
  );
};

export default ExpandableText;
