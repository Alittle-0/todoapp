import React, { useEffect, useReducer } from "react";
import axios from "axios";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import { taskReducer, initialState } from "../reducers/taskReducer";
import "./TaskList.css";

const TaskList = () => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const fetchTasks = async () => {
    dispatch({ type: "FETCH_TASKS_START" });
    try {
      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001";
      const response = await axios.get(`${apiUrl}/api/tasks`);
      dispatch({ type: "FETCH_TASKS_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "FETCH_TASKS_ERROR", payload: error.message });
    }
  };

  const addTask = async (description) => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001";
      const response = await axios.post(`${apiUrl}/api/tasks`, {
        description,
        status: "pending",
      });
      dispatch({ type: "ADD_TASK_SUCCESS", payload: response.data });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const toggleTask = async (task) => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001";
      const newStatus = task.status === "completed" ? "pending" : "completed";
      const response = await axios.put(`${apiUrl}/api/tasks/${task._id}`, {
        ...task,
        status: newStatus,
      });
      dispatch({ type: "TOGGLE_TASK_SUCCESS", payload: response.data });
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  const removeTask = async (taskId) => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001";
      const task = state.tasks.find((task) => task._id === taskId);
      if (task.status === "pending") {
        alert("Task is pending, cannot be deleted");
        return;
      }
      await axios.delete(`${apiUrl}/api/tasks/${taskId}`);
      dispatch({ type: "REMOVE_TASK_SUCCESS", payload: taskId });
    } catch (error) {
      console.error("Error removing task:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="task-list-container">
      <h2 className="task-list-title">📝 To-Do List (useReducer)</h2>
      <TaskForm onAdd={addTask} />
      <ul className="task-list">
        {state.tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onToggle={toggleTask}
            onRemove={removeTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
