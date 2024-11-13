import React, { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";

const TaskList = () => {
  const { tasks, addTask, handleEdit, handleDelete } = useContext(TaskContext);
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskText, setEditingTaskText] = useState("");

  const handleAddTask = () => {
    addTask({ todo: newTask, completed: false });
    setNewTask("");
  };

  const startEditingTask = (task) => {
    setEditingTaskId(task.id);
    setEditingTaskText(task.todo);
  };

  const submitEditTask = (task) => {
    handleEdit({
      id: editingTaskId,
      todo: editingTaskText,
      completed: task.completed,
    });

    setEditingTaskId(null);
    setEditingTaskText("");
  };

  return (
    <div>
      <h2>Task Management from tasklist</h2>
      <div className="container">
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Task title"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li className="test" key={task.id} tasks={tasks}>
            {editingTaskId === task.id ? (
              <>
                <input
                  value={editingTaskText}
                  onChange={(e) => setEditingTaskText(e.target.value)}
                />
                <button onClick={() => submitEditTask(task)}>Save</button>
              </>
            ) : (
              <div className="container">
                {task.todo} - {task.completed ? "Completed" : "Incomplete"}
                <div className="edit">
                  <button onClick={() => startEditingTask(task)}>Edit</button>
                  <button onClick={() => handleDelete(task.id)}>Delete</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
