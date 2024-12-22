'use client';

import { useState } from 'react';
import { FaBook, FaCertificate, FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface CourseAccordionProps {
  objectives: string[];
  requirements: string[];
}

export function CourseAccordion({ objectives, requirements }: CourseAccordionProps) {
  const [showObjectives, setShowObjectives] = useState(false);
  const [showRequirements, setShowRequirements] = useState(false);

  return (
    <>
      <div className="mt-8">
        <button
          onClick={() => setShowObjectives(!showObjectives)}
          className="flex w-full items-center justify-between rounded-lg border p-4 text-left"
        >
          <span className="text-lg font-semibold">Learning Objectives</span>
          {showObjectives ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        {showObjectives && (
          <div className="mt-4 space-y-2">
            {objectives.map((objective, index) => (
              <div key={index} className="flex items-start">
                <FaBook className="mr-2 mt-1 text-primary" />
                <span>{objective}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8">
        <button
          onClick={() => setShowRequirements(!showRequirements)}
          className="flex w-full items-center justify-between rounded-lg border p-4 text-left"
        >
          <span className="text-lg font-semibold">Requirements</span>
          {showRequirements ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        {showRequirements && (
          <div className="mt-4 space-y-2">
            {requirements.map((requirement, index) => (
              <div key={index} className="flex items-start">
                <FaCertificate className="mr-2 mt-1 text-primary" />
                <span>{requirement}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
