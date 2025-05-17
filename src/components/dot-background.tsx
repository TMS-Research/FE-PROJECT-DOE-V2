import React from "react";

export default function DotBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-blue-50">
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex justify-between relative">
              {Array.from({ length: 20 }).map((_, colIndex) => (
                <div
                  key={colIndex}
                  className="w-1 h-1 bg-blue-200 rounded-full m-8"
                  style={{
                    opacity: Math.random() * 0.5 + 0.3,
                    transform: `scale(${Math.random() * 0.5 + 0.8})`,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
