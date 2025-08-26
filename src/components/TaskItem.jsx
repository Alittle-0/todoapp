import React from "react";
import "./TaskItem.css";

const TaskItem = ({ task, onToggle, onRemove }) => {
  return (
    <li className="task-item">
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.status === "completed"}
          onChange={() => onToggle(task)}
          className="task-checkbox"
        />
        <span
          className={`task-description ${
            task.status === "completed" ? "completed" : ""
          }`}
        >
          {task.description}
        </span>
      </div>
      <div className="task-buttons">
        <button
          className="task-button delete-button"
          onClick={() => onRemove(task._id)}
          title="Remove task"
        >
          🗑
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
