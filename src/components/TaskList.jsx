import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import "./TaskList.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = () => {
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001";
    axios
      .get(`${apiUrl}/api/tasks`)
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="task-list-container">
      <h2 className="task-list-title">📝 To-Do List</h2>
      <TaskForm onAdd={fetchTasks} />
      <ul className="task-list">
        {tasks.map((task) => (
          <TaskItem key={task._id} task={task} onUpdate={fetchTasks} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
