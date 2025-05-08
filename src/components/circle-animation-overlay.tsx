import { useEffect, useState } from "react";

export default function CircleAnimationOverlay() {
  const [circles, setCircles] = useState<{id: number, color: string, delay: number, size: number, position: {top: string, left: string}}[]>([]);

  useEffect(() => {
    const circleColors = [
      'bg-indigo-500', 'bg-purple-500', 'bg-blue-500',
      'bg-teal-500', 'bg-green-500', 'bg-pink-500',
      'bg-violet-500', 'bg-cyan-500'
    ];

    const newCircles = Array.from({length: 8}, (_, i) => ({
      id: i,
      color: circleColors[i],
      delay: i * 0.2,
      size: 40 + Math.random() * 20, // Different sizes between 40-60px
      position: {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`
      }
    }));

    setCircles(newCircles);

    // Hide circles after animation completes
    const timer = setTimeout(() => {
      // This is now handled by the CSS animation ending
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-50">
        {circles.map((circle) => (
          <div
            key={circle.id}
            className={`absolute rounded-full ${circle.color} circle-expand`}
            style={{
              width: `${circle.size}px`,
              height: `${circle.size}px`,
              top: circle.position.top,
              left: circle.position.left,
              animationDelay: `${circle.delay}s`,
              opacity: 0.5
            }}
          ></div>
        ))}
      </div>
  )
}
