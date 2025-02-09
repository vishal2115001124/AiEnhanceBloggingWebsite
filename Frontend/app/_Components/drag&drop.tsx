import React, { useState } from "react";

export default function DragDropList(){
  const [items, setItems] = useState([
    { id: 1, name: "Kristina Zasiadko", img: "https://via.placeholder.com/50" },
    { id: 2, name: "Gabriel Wilson", img: "https://via.placeholder.com/50" },
    { id: 3, name: "Ronelle Cesicon", img: "https://via.placeholder.com/50" },
    { id: 4, name: "James Khosravi", img: "https://via.placeholder.com/50" },
    { id: 5, name: "Annika Hayden", img: "https://via.placeholder.com/50" },
    { id: 6, name: "Donald Horton", img: "https://via.placeholder.com/50" },
  ]);

  const [draggingIndex, setDraggingIndex] = useState(null);

  const handleDragStart = (index) => {
    setDraggingIndex(index);
  };

  const handleDragOver = (event, index) => {
    event.preventDefault();
    if (draggingIndex === index) return;

    const updatedItems = [...items];
    const [draggedItem] = updatedItems.splice(draggingIndex, 1); // Remove the dragging item
    updatedItems.splice(index, 0, draggedItem); // Insert it at the new position

    setDraggingIndex(index); // Update dragging index
    setItems(updatedItems); // Update state
  };

  const handleDragEnd = () => {
    setDraggingIndex(null); // Reset dragging index
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-600">
      <ul className="w-96 bg-white p-6 rounded-lg shadow-lg">
        {items.map((item, index) => (
          <li
            key={item.id}
            className={`flex items-center justify-between p-4 mb-2 border rounded cursor-move ${
              draggingIndex === index ? "opacity-50" : "opacity-100"
            }`}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
          >
            <div className="flex items-center">
              <img
                src={item.img}
                alt={item.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <span className="text-lg font-medium">{item.name}</span>
            </div>
            <i className="uil uil-draggabledots text-gray-500 text-xl"></i>
          </li>
        ))}
      </ul>
    </div>
  );
};

