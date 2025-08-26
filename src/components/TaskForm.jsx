import React, { useState } from "react";
import "./TaskForm.css";

const TaskForm = ({ onAdd }) => {
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (description.trim()) {
      await onAdd(description.trim());
      setDescription("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Add a task..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="task-input"
        required
      />
      <button type="submit" className="add-button">
        Add
      </button>
    </form>
  );
};

export default TaskForm;
