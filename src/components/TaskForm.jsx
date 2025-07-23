import React, { useState } from "react";
import axios from "axios";
import "./TaskForm.css";

const TaskForm = ({ onAdd }) => {
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/tasks", {
        description,
        status: "pending",
      });
      setDescription("");
      await onAdd();
      alert("Task added successfully!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a task..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TaskForm;
