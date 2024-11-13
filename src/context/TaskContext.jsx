import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const TaskContext = createContext();

const DUMMY_API_URL = "https://dummyjson.com/todos";

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);

  // Fetch tasks on initial load
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${DUMMY_API_URL}`);

        setTasks(response.data.todos);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const addTask = async (task) => {
    try {
      const response = await axios.post("https://dummyjson.com/todos/add", {
        todo: task.todo,
        completed: task.completed,
        userId: 1,
      });

      const newTask = {
        ...response.data,
        localOnly: true, // Mark task as client-only
      };

      setTasks((prevTasks) => [newTask, ...prevTasks]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleEdit = async (updatedTask) => {
    try {
      if (updatedTask.localOnly) {
        // Local update for client-only tasks
        console.log("Updating local task:", updatedTask);
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === updatedTask.id ? { ...task, ...updatedTask } : task
          )
        );
        return;
      }

      console.log("Updating task on server with ID:", updatedTask.id);

      const response = await axios.put(
        `https://dummyjson.com/todos/${updatedTask.id}`,
        {
          todo: updatedTask.todo,
          completed: updatedTask.completed,
        }
      );

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? { ...task, ...response.data } : task
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const taskToDelete = tasks.find((task) => task.id === taskId);
      if (taskToDelete.localOnly) {
        // Remove locally if task is client-only
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      } else {
        // Delete on API for server tasks
        await axios.delete(`https://dummyjson.com/todos/${taskId}`);
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const startEditing = (task) => {
    setTaskToEdit(task);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        handleEdit,
        handleDelete,
        taskToEdit,
        startEditing,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
