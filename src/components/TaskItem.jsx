import React from "react";
import axios from "axios";
import "./TaskItem.css";

const TaskItem = ({ task, onUpdate }) => {
  const markComplete = async () => {
    try {
      await axios.put(`http://localhost:3001/api/tasks/${task._id}`, {
        ...task,
        status: "completed",
      });
      await onUpdate();
      alert("Task marked as completed!");
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/tasks/${task._id}`);
      await onUpdate();
      alert("Task deleted successfully!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <li className="task-item">
      <span
        className={`task-description ${
          task.status === "completed" ? "completed" : ""
        }`}
      >
        {task.description} ({task.status})
      </span>
      <div className="task-buttons">
        <button className="task-button complete-button" onClick={markComplete}>
          ✔
        </button>
        <button className="task-button delete-button" onClick={deleteTask}>
          🗑
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
