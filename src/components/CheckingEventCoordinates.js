import { useCallback, useEffect, useRef, useState } from "react";

const CheckingEventCoordinates = () => {
  const boxRef = useRef({});
  const [boxPosition, setBoxPosition] = useState({});

  const determineNewPosition = useCallback(() => {
    const maxX = window.innerWidth - 400;
    const maxY = window.innerHeight - 200;

    return {
      x: Math.floor(Math.random() * maxX),
      y: Math.floor(Math.random() * maxY),
    };
  }, []);

  useEffect(() => {
    const position = determineNewPosition();
    setBoxPosition(position);
  }, [determineNewPosition]);

  const handleDragStart = (event) => {
    const rect = boxRef.current.getBoundingClientRect();
    const startOffsetX = event.clientX - rect.left;
    const startOffsetY = event.clientY - rect.top;
    console.log("startOffsetX = ", startOffsetX);

    const handMouseMove = (e) => {
      const newX = e.clientX - startOffsetX;
      const newY = e.clientY - startOffsetY;

      boxRef.current.style.left = `${newX}px`;
      boxRef.current.style.top = `${newY}px`;
    };

    const handMouseUp = () => {
      document.removeEventListener("mousemove", handMouseMove);
      document.removeEventListener("mouseup", handMouseUp);

      const finalRect = boxRef.current.getBoundingClientRect();
      const newPosition = { x: finalRect.left, y: finalRect.top };
      setBoxPosition(newPosition);
    };

    document.addEventListener("mousemove", handMouseMove);
    document.addEventListener("mouseup", handMouseUp);
  };

  return (
    <div
      ref={boxRef}
      style={{ left: boxPosition.x, top: boxPosition.y }}
      className="coordinates-box"
      onMouseDown={(e) => handleDragStart(e)}
    ></div>
  );
};

export default CheckingEventCoordinates;
